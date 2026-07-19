"""
야간 리포트 크론 에이전트 — 비용 상한(하드 리밋)이 있는 무인 파이프라인.

매일 새벽에 지표를 집계해 요약 리포트를 만들고 슬랙 등으로 보낸다.
8.4의 프로덕션 4대 고려사항을 모두 담은 참조 구현이다:

  · 재시도    — SDK 기본 재시도(max_retries) 사용
  · 타임아웃  — 요청별 timeout
  · 격리      — 섹션별 try/except (하나 실패해도 나머지 계속)
  · 비용 상한 — 누적 토큰 추적 + 상한 초과 시 중단 (7.3의 "하드 리밋")

실행 전:
    pip install anthropic
    export ANTHROPIC_API_KEY="..."
    # 크론 예: 0 6 * * * /usr/bin/python3 /path/nightly-report.py
"""

import logging
import sys

import anthropic

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s"
)
log = logging.getLogger("nightly-report")

# 요청별 타임아웃 + 재시도는 클라이언트 수준에서 설정한다.
client = anthropic.Anthropic(timeout=120.0, max_retries=3)

# --- 비용 상한 (하드 리밋) -------------------------------------------------
# 이 배치가 하룻밤에 쓸 수 있는 출력 토큰 상한. 버그로 폭주해도 여기서 멈춘다.
MAX_OUTPUT_TOKENS_PER_RUN = 50_000
_used_output_tokens = 0


class BudgetExceeded(RuntimeError):
    """누적 사용량이 상한을 넘었을 때."""


def ask(prompt: str, *, model: str, max_tokens: int) -> str:
    """상한을 확인하며 모델을 호출하고, 사용량을 누적한다."""
    global _used_output_tokens
    if _used_output_tokens >= MAX_OUTPUT_TOKENS_PER_RUN:
        raise BudgetExceeded(
            f"출력 토큰 상한 초과: {_used_output_tokens}/{MAX_OUTPUT_TOKENS_PER_RUN}"
        )

    resp = client.messages.create(
        model=model,
        max_tokens=max_tokens,
        messages=[{"role": "user", "content": prompt}],
    )
    _used_output_tokens += resp.usage.output_tokens
    log.info(
        "토큰 사용: +%d (누적 %d/%d)",
        resp.usage.output_tokens,
        _used_output_tokens,
        MAX_OUTPUT_TOKENS_PER_RUN,
    )
    return next(b.text for b in resp.content if b.type == "text")


# --- 리포트 섹션 -----------------------------------------------------------
SECTIONS = [
    ("매출 요약", "매출", "claude-haiku-4-5", 300),      # 단순 요약 → 빠른 모델
    ("이상 징후 분석", "이상치", "claude-opus-4-8", 1500),  # 판단 필요 → 상위 모델
    ("재고 경고", "재고", "claude-haiku-4-5", 300),
]


def build_report() -> str:
    """섹션별로 격리 실행한다. 하나가 실패해도 나머지는 계속 만든다."""
    parts = []
    for title, metric_key, model, max_tokens in SECTIONS:
        try:
            data = load_metrics(metric_key)  # 사내 데이터 웨어하우스 조회
            body = ask(
                f"다음 {title} 데이터를 3줄로 요약하고 특이사항만 짚어줘.\n"
                f"수치를 지어내지 말고 주어진 데이터만 쓴다.\n\n{data}",
                model=model,
                max_tokens=max_tokens,
            )
            parts.append(f"## {title}\n{body}")
        except BudgetExceeded as e:
            log.error("예산 소진으로 중단: %s", e)
            parts.append(f"## {title}\n⚠️ 예산 상한 도달로 생성하지 못했습니다.")
            break  # 상한을 넘었으면 남은 섹션도 시도하지 않는다
        except Exception as e:  # 격리: 한 섹션 실패가 전체를 죽이지 않게
            log.exception("섹션 실패: %s", title)
            parts.append(f"## {title}\n⚠️ 생성 실패: {e}")
    return "\n\n".join(parts)


def main() -> int:
    report = build_report()
    deliver(report)  # 슬랙·메일 등으로 발송

    # 무인 하네스는 관측과 세트다(8.4). 실패가 있으면 사람을 부른다.
    if "⚠️" in report:
        notify_oncall("야간 리포트에 실패 섹션이 있습니다. 로그를 확인하세요.")
        return 1
    log.info("완료. 총 출력 토큰 %d", _used_output_tokens)
    return 0


# --- 사내 시스템 연동 자리(예시 스텁) --------------------------------------
def load_metrics(key: str) -> str:
    return f"[{key} 지표 데이터]"


def deliver(report: str) -> None:
    log.info("리포트 발송:\n%s", report)


def notify_oncall(message: str) -> None:
    log.warning("ONCALL 알림: %s", message)


if __name__ == "__main__":
    sys.exit(main())

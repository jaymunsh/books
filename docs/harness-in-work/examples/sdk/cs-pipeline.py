"""
MarketFlow CS 문의 자동 분류 파이프라인.

밤새 쌓인 고객 문의를 새벽에 자동 분류해 담당 팀으로 배분한다.
cron이나 CI에서 이 스크립트를 실행하면, 아침에 출근한 CS팀은 이미
분류·배분된 문의를 받는다.

하네스 관점의 핵심 판단:
  - 단순 분류는 빠르고 저렴한 모델(Haiku)로 충분하다.
  - 복잡한 응답 초안은 Opus로 (여기서는 분류만 다룬다).
  - 무인 파이프라인이므로 건별 격리와 실패 로깅이 필수다(Part 7·8.4).

실행 전:
    pip install anthropic
    export ANTHROPIC_API_KEY="..."
"""

import logging

import anthropic

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("cs-pipeline")

client = anthropic.Anthropic()
CATEGORIES = ["환불", "배송", "상품문의", "기타"]


def classify(inquiry_text: str) -> str:
    """문의 한 건을 카테고리로 분류한다."""
    resp = client.messages.create(
        model="claude-haiku-4-5",  # 분류는 빠르고 싼 모델로
        max_tokens=16,
        system=(
            f"고객 문의를 다음 중 하나로만 분류한다: {', '.join(CATEGORIES)}. "
            f"한 단어만 답한다."
        ),
        messages=[{"role": "user", "content": inquiry_text}],
    )
    label = next(b.text for b in resp.content if b.type == "text").strip()
    # 모델이 목록 밖 답을 내면 안전하게 '기타'로.
    return label if label in CATEGORIES else "기타"


def run_pipeline(inquiries) -> None:
    """문의 목록을 분류·배분한다. 건별로 격리해 하나가 실패해도 계속 돈다."""
    ok, failed = 0, 0
    for inquiry in inquiries:
        try:
            category = classify(inquiry["text"])
            route_to_team(inquiry, category)  # 담당 팀으로 배분(사내 시스템)
            ok += 1
        except Exception as e:  # 한 건의 실패가 배치 전체를 죽이지 않게
            failed += 1
            log.error("분류 실패 id=%s: %s", inquiry.get("id"), e)
    log.info("완료: 성공 %d, 실패 %d", ok, failed)
    # 실패가 있으면 알림을 보낸다(Part 7.5). 무인 하네스는 관측과 세트.


# --- 아래는 사내 시스템 연동 자리(예시 스텁) ---
def load_overnight_inquiries():
    return [
        {"id": 1, "text": "어제 주문한 상품 환불하고 싶어요"},
        {"id": 2, "text": "배송이 언제 오나요?"},
        {"id": 3, "text": "이 신발 방수 되나요?"},
    ]


def route_to_team(inquiry, category):
    log.info("문의 %s -> %s팀", inquiry["id"], category)


if __name__ == "__main__":
    run_pipeline(load_overnight_inquiries())

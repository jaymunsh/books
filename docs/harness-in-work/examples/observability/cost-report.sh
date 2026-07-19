#!/usr/bin/env bash
# 비용·사용량 추적 리포트
#
# 7.2의 audit-log.sh 가 남긴 JSONL 을 집계해 "무엇이 실제로 쓰이는가"를 본다.
# 크론에 걸어 주간 리포트로 돌리거나, 필요할 때 수동으로 실행한다.
#
#   ./cost-report.sh            # 최근 7일
#   ./cost-report.sh 30         # 최근 30일
#
# 전제: .claude/logs/audit.jsonl 에 {"ts","tool","file"} 형식으로 기록되어 있을 것.

set -uo pipefail

DAYS="${1:-7}"
LOG="${CLAUDE_PROJECT_DIR:-.}/.claude/logs/audit.jsonl"

if [ ! -f "$LOG" ]; then
  echo "감사 로그가 없습니다: $LOG" >&2
  echo "7.2의 audit-log.sh 를 PostToolUse Hook 으로 먼저 등록하세요." >&2
  exit 1
fi

# 최근 N일 컷오프 (macOS/Linux 양쪽 지원)
if date -v-1d >/dev/null 2>&1; then
  SINCE=$(date -v-"${DAYS}"d '+%Y-%m-%d')      # BSD/macOS
else
  SINCE=$(date -d "${DAYS} days ago" '+%Y-%m-%d')  # GNU/Linux
fi

RECENT=$(awk -v s="$SINCE" -F'"' '{for(i=1;i<=NF;i++) if($i=="ts"){if($(i+2)>=s) print; break}}' "$LOG")
TOTAL=$(echo "$RECENT" | grep -c . || true)

echo "=============================================="
echo " 하네스 사용 리포트 — 최근 ${DAYS}일 (since ${SINCE})"
echo "=============================================="
echo
echo "총 도구 호출: ${TOTAL}건"
echo
echo "── 도구별 사용 빈도 ──────────────────────────"
echo "$RECENT" | jq -r '.tool' 2>/dev/null | sort | uniq -c | sort -rn | head -15
echo
echo "── 가장 많이 편집된 파일 top 10 ──────────────"
echo "$RECENT" | jq -r 'select(.file != "" and .file != null) | .file' 2>/dev/null \
  | sort | uniq -c | sort -rn | head -10
echo
echo "── 일자별 활동량 ─────────────────────────────"
echo "$RECENT" | jq -r '.ts[0:10]' 2>/dev/null | sort | uniq -c
echo
echo "=============================================="
echo "이 리포트로 답할 질문 (7.5):"
echo "  · 어떤 도구·커맨드가 실제로 쓰이나 → 안 쓰이는 것은 폐기 후보 (10.7)"
echo "  · 활동이 급증한 날이 있나 → 무한 루프·폭주 신호 (사건 #4)"
echo "  · 특정 파일에 편집이 몰리나 → 그 영역에 하네스 보강이 필요"
echo
echo "※ 정확한 토큰·과금액은 제공사 콘솔의 사용량 대시보드에서 확인하세요."
echo "   이 스크립트는 '무엇을 얼마나 했는가'(행위량)를 봅니다."

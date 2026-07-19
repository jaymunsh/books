#!/usr/bin/env bash
# PreToolUse Hook (matcher: Bash)
# 실행하려는 명령을 검사해 파괴적 패턴이면 차단한다.
#
# 규약:
#   - Hook은 stdin으로 JSON을 받는다. .tool_input.command 에 실행할 명령이 있다.
#   - exit 2 로 종료하면 도구 실행이 막히고, stderr 메시지가 모델에 전달된다.
#   - exit 0 은 통과.
#
# 설치: .claude/settings.json 의 hooks.PreToolUse 에 등록 (settings.json 예시 참고)

set -euo pipefail

input=$(cat)
cmd=$(echo "$input" | jq -r '.tool_input.command // ""')

# 차단할 패턴 (팀 상황에 맞게 확장)
DANGEROUS='rm -rf /|rm -rf ~|rm -rf \*|git push --force|git push -f|DROP TABLE|TRUNCATE|:(){ :|:& };:'

if echo "$cmd" | grep -Eq "$DANGEROUS"; then
  echo "🚫 차단됨: 파괴적 명령으로 판단됩니다 → $cmd" >&2
  echo "정말 필요하면 사람이 직접 실행하세요." >&2
  exit 2
fi

# 프로덕션 환경 접근 경고성 차단
if echo "$cmd" | grep -Eq 'ENV=production|--prod|prod-db'; then
  echo "🚫 차단됨: 프로덕션 대상 명령은 승인 게이트를 거쳐야 합니다 → $cmd" >&2
  exit 2
fi

exit 0

#!/usr/bin/env bash
# Stop Hook — 응답을 마치려 할 때 테스트를 강제 실행한다.
# 테스트가 실패하면 응답 종료를 막고(exit 2), 이유를 모델에 돌려보내 스스로 고치게 한다.
#
# 규약:
#   - Stop Hook은 응답이 끝나기 직전 실행된다.
#   - exit 2 로 종료하면 모델이 계속 작업하도록 되돌린다. stderr가 이유로 전달된다.
#   - exit 0 은 정상 종료 허용.
#
# 설치: .claude/settings.json 의 hooks.Stop 에 등록
#   "Stop": [{ "hooks": [{ "type": "command",
#              "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/verify-on-stop.sh" }] }]
#
# 주의: 매 응답마다 도는 것을 피하려면, 소스가 바뀐 세션에서만 돌도록 조건을 좁히거나
#       빠른 테스트 서브셋만 실행하도록 조정한다(6.1의 "빠른 신호" 원칙).

set -uo pipefail

# 변경된 소스가 없으면 굳이 테스트하지 않는다(빠른 신호 유지).
if git diff --quiet --diff-filter=ACM -- '*.ts' '*.tsx' '*.js' 2>/dev/null; then
  exit 0
fi

if ! npm test --silent >/tmp/mf-test.out 2>&1; then
  echo "완료할 수 없습니다: 테스트가 실패했습니다. 아래 출력을 보고 고친 뒤 다시 시도하세요." >&2
  tail -n 20 /tmp/mf-test.out >&2
  exit 2
fi

exit 0

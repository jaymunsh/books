#!/usr/bin/env bash
# PreToolUse Hook (matcher: Edit|Write)
# 멀티테넌트 SaaS에서 tenant_id 조건이 빠진 쿼리를 커밋 전에 잡는다.
#
# 배경: 테넌트 격리가 뚫리면 고객사 A가 B의 데이터를 봅니다. 가장 치명적인 사고라
#       "지침"이 아니라 "장치"로 막습니다.
#
# 설치: .claude/settings.json 의 hooks.PreToolUse 에 matcher "Edit|Write" 로 등록

set -uo pipefail

input=$(cat)
file=$(echo "$input" | jq -r '.tool_input.file_path // ""')
content=$(echo "$input" | jq -r '.tool_input.content // .tool_input.new_string // ""')

# repository 계층 파일만 검사
case "$file" in
  *[Rr]epository*|*[Dd]ao*) ;;
  *) exit 0 ;;
esac

# AdminRepository는 전역 조회가 허용된 예외
case "$file" in
  *AdminRepository*) exit 0 ;;
esac

# SELECT/UPDATE/DELETE 가 있는데 tenant_id 가 없으면 차단
if echo "$content" | grep -Eiq '\b(select|update|delete)\b' && \
   ! echo "$content" | grep -q 'tenant_id'; then
  echo "🚫 차단: tenant_id 조건이 없는 쿼리가 감지되었습니다 → $file" >&2
  echo "" >&2
  echo "멀티테넌트 격리 위반은 고객사 간 데이터 유출로 이어집니다." >&2
  echo "- 모든 쿼리에 tenant_id 조건을 추가하세요." >&2
  echo "- 의도적인 전역 조회라면 AdminRepository 에 작성하세요(별도 승인 필요)." >&2
  exit 2
fi

exit 0

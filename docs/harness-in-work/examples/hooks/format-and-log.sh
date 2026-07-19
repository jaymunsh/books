#!/usr/bin/env bash
# PostToolUse Hook (matcher: Edit|Write)
# 파일이 편집/생성된 직후 (1) 포맷터를 돌리고 (2) 감사 로그를 남긴다.
#
# 규약:
#   - stdin 으로 JSON을 받는다. .tool_input.file_path 에 편집된 파일 경로가 있다.
#   - 이 Hook은 결과를 막지 않는다(로깅·정리 목적). 항상 exit 0.
#
# 설치: .claude/settings.json 의 hooks.PostToolUse 에 등록

set -uo pipefail

input=$(cat)
file=$(echo "$input" | jq -r '.tool_input.file_path // ""')
log_dir="${CLAUDE_PROJECT_DIR:-.}/.claude/logs"
mkdir -p "$log_dir"

# (1) 확장자별 포맷 (실패해도 흐름을 막지 않는다)
case "$file" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css) npx --no-install prettier --write "$file" 2>/dev/null || true ;;
  *.py) python -m black -q "$file" 2>/dev/null || true ;;
esac

# (2) 감사 로그 — 언제 어떤 파일이 바뀌었는지 (관측 하네스와 연결, Part 7)
ts=$(date '+%Y-%m-%d %H:%M:%S')
echo "$ts  EDIT  $file" >> "$log_dir/edits.log"

exit 0

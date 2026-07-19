#!/usr/bin/env bash
# PostToolUse Hook (matcher 비워두면 모든 도구에 적용)
# 모든 도구 호출을 집계 가능한 JSONL 형식으로 남긴다.
#
# 설치: .claude/settings.json 의 hooks.PostToolUse 에 matcher 없이 등록
#   "PostToolUse": [{ "hooks": [{ "type": "command",
#                     "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/audit-log.sh" }] }]

set -uo pipefail

input=$(cat)
tool=$(echo "$input" | jq -r '.tool_name // "?"')
file=$(echo "$input" | jq -r '.tool_input.file_path // ""')
ts=$(date '+%Y-%m-%dT%H:%M:%S%z')

log_dir="${CLAUDE_PROJECT_DIR:-.}/.claude/logs"
mkdir -p "$log_dir"

# 한 줄에 JSON 하나(JSONL) — 나중에 jq 로 집계하기 쉽다.
echo "{\"ts\":\"$ts\",\"tool\":\"$tool\",\"file\":\"$file\"}" >> "$log_dir/audit.jsonl"
exit 0

# --- 나중에 이렇게 집계한다 ---
# 가장 많이 쓴 도구 top 10:
#   jq -r .tool .claude/logs/audit.jsonl | sort | uniq -c | sort -rn | head
# 오늘 Bash 호출 수:
#   grep "$(date +%Y-%m-%d)" .claude/logs/audit.jsonl | grep -c '"tool":"Bash"'

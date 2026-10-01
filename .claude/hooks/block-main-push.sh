#!/bin/bash
# PreToolUse(Bash): enforce "commit and push to preview only, never main".
cmd=$(jq -r '.tool_input.command // ""')
branch=$(git -C "$CLAUDE_PROJECT_DIR" branch --show-current 2>/dev/null)

block() { echo "Blocked: $1. Work goes to 'preview' only; the user merges to main by hand." >&2; exit 2; }

if echo "$cmd" | grep -qE '(^|[;&|[:space:]])git[[:space:]]+push'; then
  echo "$cmd" | grep -qE '(^|[[:space:]:/+])(main|master)([[:space:]]|$)' && block "push targets main"
  echo "$cmd" | grep -qE -- '--force|--force-with-lease|[[:space:]]-f([[:space:]]|$)' && block "force push"
  [ "$branch" = "main" ] || [ "$branch" = "master" ] && block "current branch is $branch"
fi

if echo "$cmd" | grep -qE '(^|[;&|[:space:]])git[[:space:]]+(commit|merge|rebase|cherry-pick)'; then
  [ "$branch" = "main" ] || [ "$branch" = "master" ] && block "current branch is $branch"
fi
exit 0

#!/bin/bash
# PostToolUse(Edit|Write): lint the edited TS/TSX file; report problems back to Claude.
export PATH="/opt/homebrew/bin:$PATH"
file=$(jq -r '.tool_input.file_path // ""')
case "$file" in
  "$CLAUDE_PROJECT_DIR"/src/*.ts|"$CLAUDE_PROJECT_DIR"/src/*.tsx|"$CLAUDE_PROJECT_DIR"/src/**/*.ts|"$CLAUDE_PROJECT_DIR"/src/**/*.tsx) ;;
  *) exit 0 ;;
esac
[ -d "$CLAUDE_PROJECT_DIR/node_modules" ] || exit 0
cd "$CLAUDE_PROJECT_DIR" || exit 0
out=$(npx --no-install eslint "$file" 2>&1) || { echo "$out" >&2; exit 2; }
exit 0

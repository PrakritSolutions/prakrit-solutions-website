#!/bin/zsh
# Usage: ./render.sh <name>  (renders status + group PNGs for series/<name>.html)
cd "$(dirname "$0")/series" || exit 1
C="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
n=$1
"$C" --headless=new --hide-scrollbars --virtual-time-budget=6000 --window-size=1080,1920 --screenshot="$n-status-1080x1920.png" "file://$PWD/$n.html#story" >/dev/null 2>&1
"$C" --headless=new --hide-scrollbars --virtual-time-budget=6000 --window-size=1080,1350 --screenshot="$n-group-1080x1350.png" "file://$PWD/$n.html#post" >/dev/null 2>&1

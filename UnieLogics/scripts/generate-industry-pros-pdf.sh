#!/usr/bin/env bash
# Regenerate public/industry-pros.pdf from the live /industry-pros page.
# Prereq: `npm run dev` running on port 5173, OR `npm run build && npm run preview`.
# Renders /industry-pros?print=1 to a landscape PDF and writes it to public/.

set -euo pipefail

# Resolve Chrome on common install paths (linux/mac/win-bash).
CHROME=""
for candidate in \
  "${CHROME_BIN:-}" \
  "/c/Program Files/Google/Chrome/Application/chrome.exe" \
  "/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "$(command -v google-chrome 2>/dev/null || true)" \
  "$(command -v google-chrome-stable 2>/dev/null || true)" \
  "$(command -v chromium 2>/dev/null || true)" \
  "$(command -v chrome 2>/dev/null || true)"
do
  if [[ -n "$candidate" && -x "$candidate" ]]; then
    CHROME="$candidate"
    break
  fi
done

if [[ -z "$CHROME" ]]; then
  echo "Chrome not found. Set CHROME_BIN to the chrome.exe path and retry." >&2
  exit 1
fi

OUT="$(dirname "$0")/../public/industry-pros.pdf"
mkdir -p "$(dirname "$OUT")"

echo "Rendering /industry-pros?print=1 via headless Chrome..."
"$CHROME" \
  --headless \
  --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf-no-header \
  --print-to-pdf="$OUT" \
  "http://localhost:5173/industry-pros?print=1"

if [[ -s "$OUT" ]]; then
  echo "OK: $OUT"
else
  echo "FAILED — no output produced. Is \`npm run dev\` running on port 5173?" >&2
  exit 1
fi

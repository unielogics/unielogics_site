@echo off
REM Regenerate public/industry-pros.pdf from the live /industry-pros page.
REM Prereq: `npm run dev` running on port 5173, OR `npm run build && npm run preview`.
REM Renders /industry-pros?print=1 to a landscape PDF and commits to public/.

setlocal

REM Try standard Chrome install paths
set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" (
  echo Chrome not found at the standard install paths.
  echo Edit this script and point CHROME at chrome.exe on your machine.
  exit /b 1
)

REM Output path is relative to the package root (one level up from scripts\).
set "OUT=%~dp0..\public\industry-pros.pdf"

echo Rendering /industry-pros?print=1 via headless Chrome...
"%CHROME%" ^
  --headless ^
  --disable-gpu ^
  --no-pdf-header-footer ^
  --print-to-pdf-no-header ^
  --print-to-pdf="%OUT%" ^
  "http://localhost:5173/industry-pros?print=1"

if exist "%OUT%" (
  echo OK: %OUT%
) else (
  echo FAILED — no output produced. Is `npm run dev` running on port 5173?
  exit /b 1
)

endlocal

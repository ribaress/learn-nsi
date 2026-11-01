@echo off
setlocal
cd /d "%~dp0"
set "ATELIER_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not exist "%ATELIER_NODE%" set "ATELIER_NODE=node"
"%ATELIER_NODE%" scripts\start.mjs
if errorlevel 1 pause

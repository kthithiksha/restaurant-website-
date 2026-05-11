@echo off
echo Starting Tasty Bites Professional Website...
cd /d "%~dp0"
start http://localhost:5173
npm.cmd run dev
pause

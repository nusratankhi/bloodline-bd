@echo off
title BloodLine Local Dev Server
cd /d "%~dp0"
echo Starting BloodLine National Blood Network...
echo Opening http://localhost:3000 in your browser...
start http://localhost:3000
npm run dev
pause

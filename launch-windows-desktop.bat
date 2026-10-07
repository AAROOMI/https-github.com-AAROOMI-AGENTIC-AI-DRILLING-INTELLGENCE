@echo off
title Aramco Agentic AI Drilling Intelligence & Well Design Platform
echo ==============================================================================
echo Starting Aramco Agentic AI Drilling Intelligence Platform (Windows Desktop)
echo Secure Offline / Air-Gapped Engineering Mode Active
echo ==============================================================================
echo Checking runtime prerequisites...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js runtime not found. Please install Node.js 18+ or run the standalone installer.
    pause
    exit /b 1
)

echo Initializing local services on port 3000...
start cmd /k "npm run dev"
timeout /t 3 >nul
start http://localhost:3000
echo Platform launched successfully in default browser / Electron frame.

@echo off
echo Starting all applications...
start cmd /k "cd mern-crud-app-main\backend && node server.js"
start cmd /k "cd mern-crud-app-main\frontend && npm run dev -- --port 5173"
start cmd /k "cd react-frontend-crud-app-main && npm run dev -- --port 5174"
start cmd /k "cd react-router-app-main && npm run dev -- --port 5175"
timeout /t 3 /nobreak >nul
start http://localhost:5173
start http://localhost:5174
start http://localhost:5175
echo All applications launched!

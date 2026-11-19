import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const apps = [
  {
    name: "MERN Backend (API)",
    dir: path.join(__dirname, "mern-crud-app-main", "backend"),
    cmd: "node",
    args: ["server.js"],
    color: "\x1b[36m", // Cyan
  },
  {
    name: "MERN Frontend",
    dir: path.join(__dirname, "mern-crud-app-main", "frontend"),
    cmd: process.platform === "win32" ? "npm.cmd" : "npm",
    args: ["run", "dev", "--", "--port", "5173", "--host"],
    color: "\x1b[32m", // Green
  },
  {
    name: "Expense Tracker",
    dir: path.join(__dirname, "react-frontend-crud-app-main"),
    cmd: process.platform === "win32" ? "npm.cmd" : "npm",
    args: ["run", "dev", "--", "--port", "5174", "--host"],
    color: "\x1b[33m", // Yellow
  },
  {
    name: "React Router App",
    dir: path.join(__dirname, "react-router-app-main"),
    cmd: process.platform === "win32" ? "npm.cmd" : "npm",
    args: ["run", "dev", "--", "--port", "5175", "--host"],
    color: "\x1b[35m", // Magenta
  },
];

console.log("\x1b[1mStarting all 4 workspace applications...\x1b[0m\n");

apps.forEach((app) => {
  const child = spawn(app.cmd, app.args, {
    cwd: app.dir,
    shell: true,
    stdio: "pipe",
  });

  child.stdout.on("data", (data) => {
    process.stdout.write(`${app.color}[${app.name}]\x1b[0m ${data}`);
  });

  child.stderr.on("data", (data) => {
    process.stderr.write(`${app.color}[${app.name}]\x1b[31m ${data}\x1b[0m`);
  });

  child.on("close", (code) => {
    console.log(`${app.color}[${app.name}]\x1b[0m exited with code ${code}`);
  });
});

const { execSync } = require("child_process");

const ports = process.argv.slice(2).map((value) => Number(value)).filter(Boolean);

if (ports.length === 0) {
  process.exit(0);
}

function run(command) {
  return execSync(command, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
}

function getWindowsPids(port) {
  const output = run(`netstat -ano -p tcp | findstr :${port}`);
  return [...output.matchAll(/\s+LISTENING\s+(\d+)\s*$/gm)].map((match) => match[1]);
}

function getUnixPids(port) {
  const output = run(`lsof -ti tcp:${port}`);
  return output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function killPid(pid) {
  if (process.platform === "win32") {
    execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
    return;
  }

  execSync(`kill -9 ${pid}`, { stdio: "ignore" });
}

for (const port of ports) {
  try {
    const pids = process.platform === "win32" ? getWindowsPids(port) : getUnixPids(port);

    if (pids.length === 0) {
      continue;
    }

    for (const pid of [...new Set(pids)]) {
      killPid(pid);
      console.log(`Freed port ${port} by stopping PID ${pid}`);
    }
  } catch (error) {
    const status = typeof error.status === "number" ? error.status : 1;

    if (status !== 1) {
      throw error;
    }
  }
}

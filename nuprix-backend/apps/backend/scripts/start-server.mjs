import { existsSync, copyFileSync, lstatSync, symlinkSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { spawn } from "node:child_process"

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const backendDirectory = path.resolve(scriptDirectory, "..")
const workspaceDirectory = path.resolve(backendDirectory, "../..")
const serverDirectory = path.join(backendDirectory, ".medusa", "server")

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const executable =
      process.platform === "win32" && command === "npm" ? "npm.cmd" : command
    const child = spawn(executable, args, {
      cwd: options.cwd,
      env: options.env ?? process.env,
      stdio: "inherit",
      shell: false,
    })

    child.on("error", reject)
    child.on("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`Process exited from signal ${signal}`))
        return
      }
      if (code !== 0) {
        reject(new Error(`Command exited with code ${code}`))
        return
      }
      resolve()
    })
  })
}

async function ensureServerBuild() {
  const serverPackage = path.join(serverDirectory, "package.json")
  if (!existsSync(serverPackage)) {
    console.log("Built Medusa server not found; running npm run build...")
    await run("npm", ["run", "build"], { cwd: backendDirectory })
  }
}

function linkWorkspaceModules() {
  const workspaceNodeModules = path.join(workspaceDirectory, "node_modules")
  const serverNodeModules = path.join(serverDirectory, "node_modules")

  if (existsSync(serverNodeModules) || lstatSync(serverNodeModules, { throwIfNoEntry: false })) {
    return
  }
  if (!existsSync(workspaceNodeModules)) {
    throw new Error(
      "Workspace node_modules directory not found. Run npm install at nuprix-backend first."
    )
  }

  symlinkSync(
    workspaceNodeModules,
    serverNodeModules,
    process.platform === "win32" ? "junction" : "dir"
  )
}

async function main() {
  process.chdir(backendDirectory)
  await ensureServerBuild()

  const sourceEnv = path.join(backendDirectory, ".env")
  if (existsSync(sourceEnv)) {
    copyFileSync(sourceEnv, path.join(serverDirectory, ".env"))
  }

  linkWorkspaceModules()

  const medusaCli = path.join(
    serverDirectory,
    "node_modules",
    "@medusajs",
    "cli",
    "cli.js"
  )
  if (!existsSync(medusaCli)) {
    throw new Error(`Medusa CLI not found at ${medusaCli}`)
  }

  await run(
    process.execPath,
    [medusaCli, "start", "--port", "9000"],
    { cwd: serverDirectory }
  )
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})

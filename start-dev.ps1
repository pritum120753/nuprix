$ErrorActionPreference = "Stop"

$RootDirectory = $PSScriptRoot
$BackendDirectory = Join-Path $RootDirectory "nuprix-backend\apps\backend"
$StorefrontDirectory = Join-Path $RootDirectory "nuprix-backend\apps\storefront"

function Stop-StalePortProcesses {
  param([int[]]$Ports)

  foreach ($port in $Ports) {
    $connections = Get-NetTCPConnection -State Listen -LocalPort $port -ErrorAction SilentlyContinue
    foreach ($connection in $connections) {
      $process = Get-Process -Id $connection.OwningProcess -ErrorAction SilentlyContinue
      if ($process -and $process.ProcessName -match "^(node|npm)$") {
        Stop-Process -Id $process.Id -Force
        Write-Host "Stopped stale $($process.ProcessName) process PID $($process.Id) from port $port"
      }
    }
  }

  Start-Sleep -Milliseconds 500
}

Stop-StalePortProcesses -Ports @(9000, 3000)

Start-Process -FilePath "powershell.exe" -ArgumentList @(
  "-NoExit"
  "-Command"
  "Set-Location -LiteralPath '$BackendDirectory'; npm run dev:api"
) -WindowStyle Normal

Start-Process -FilePath "powershell.exe" -ArgumentList @(
  "-NoExit"
  "-Command"
  "Set-Location -LiteralPath '$StorefrontDirectory'; npm run dev"
) -WindowStyle Normal

Write-Host ""
Write-Host "Nuprix development servers are starting:"
Write-Host "Storefront: http://localhost:3000"
Write-Host "Backend:    http://localhost:9000"
Write-Host "Medusa Admin: http://localhost:9000/app"

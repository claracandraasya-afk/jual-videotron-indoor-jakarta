$ErrorActionPreference = 'Continue'
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$root = (Get-Location).Path
$u = ([uri](Resolve-Path '.\index.html').Path).AbsoluteUri

$shots = @(
  @{ n = '_tmp_hero_desktop.png'; s = '1440,900' },
  @{ n = '_tmp_hero_tablet.png';  s = '834,1000' },
  @{ n = '_tmp_hero_mobile.png';  s = '390,844' }
)

$rep = @()
foreach ($s in $shots) {
  $d = Join-Path $root $s.n
  if (Test-Path $d) { Remove-Item $d -Force }
  & $chrome '--headless=new' '--disable-gpu' '--hide-scrollbars' '--force-device-scale-factor=1' ('--window-size=' + $s.s) '--virtual-time-budget=8000' ('--screenshot=' + $d) $u 2>&1 | Out-Null
  $rep += "$($s.n) size=$($s.s) bytes=$((Get-Item $d -ErrorAction SilentlyContinue).Length)"
}

# Ukur lebar render hero + ada/tidak scrollbar horizontal via DevTools-less dump
$rep | Set-Content -Encoding UTF8 (Join-Path $root '_tmp_hero.txt')
$rep | Write-Output

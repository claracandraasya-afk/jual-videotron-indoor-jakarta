$ErrorActionPreference = 'Continue'
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$root = (Get-Location).Path
$page = ([uri](Resolve-Path '.\produk-hikvision.html')).AbsoluteUri

$targets = @(
  @{ name = '_tmp_shot_ultra.png';     size = '1440,1000'; frag = '#ultra-series' },
  @{ name = '_tmp_shot_solidplus.png'; size = '1440,1000'; frag = '#solid-plus-series' },
  @{ name = '_tmp_shot_solid.png';     size = '1440,1000'; frag = '#solid-series' },
  @{ name = '_tmp_shot_mobile.png';    size = '390,1320';  frag = '#ultra-series' }
)

$report = @()
foreach ($t in $targets) {
  $dst = Join-Path $root $t.name
  if (Test-Path $dst) { Remove-Item $dst -Force }
  $cargs = @(
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    ('--window-size=' + $t.size),
    '--virtual-time-budget=9000',
    ('--screenshot=' + $dst),
    ($page + $t.frag)
  )
  $out = & $chrome @cargs 2>&1 | Out-String
  $len = (Get-Item $dst -ErrorAction SilentlyContinue).Length
  $report += "shot=$($t.name) bytes=$len frag=$($t.frag) out=$($out.Trim())"
}

# DOM hasil render untuk memastikan tidak ada .spec-pill tersisa
$dom = & $chrome '--headless=new' '--disable-gpu' '--virtual-time-budget=8000' '--dump-dom' ($page + '#ultra-series') 2>&1 | Out-String
$dom | Set-Content -Encoding UTF8 (Join-Path $root '_tmp_shot_dom.txt')
$report += "dom_chars=$($dom.Length)"
$report += "dom_spec_row=$(([regex]::Matches($dom, 'spec-row')).Count)"
$report += "dom_spec_pill=$(([regex]::Matches($dom, 'spec-pill')).Count)"
$report += "dom_product_card=$(([regex]::Matches($dom, 'class=\"product-card')).Count)"
$report += "dom_cards_shown=$(([regex]::Matches($dom, 'product-card show')).Count)"

$report | Set-Content -Encoding UTF8 (Join-Path $root '_tmp_shot.txt')
$report | ForEach-Object { Write-Output $_ }

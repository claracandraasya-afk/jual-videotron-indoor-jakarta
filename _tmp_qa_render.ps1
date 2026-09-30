$ErrorActionPreference = 'Continue'
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$u = ([uri](Resolve-Path '.\produk-hikvision.html')).AbsoluteUri
$root = (Get-Location).Path
$dst1 = Join-Path $root '_tmp_qa_desktop.png'
$dst2 = Join-Path $root '_tmp_qa_mobile.png'

$a1 = @('--headless=new','--disable-gpu','--hide-scrollbars','--force-device-scale-factor=1','--window-size=1440,4200','--virtual-time-budget=8000',('--screenshot=' + $dst1),$u)
$a2 = @('--headless=new','--disable-gpu','--hide-scrollbars','--force-device-scale-factor=1','--window-size=390,3400','--virtual-time-budget=8000',('--screenshot=' + $dst2),$u)

$o1 = & $chrome @a1 2>&1 | Out-String
$o2 = & $chrome @a2 2>&1 | Out-String
$dom = & $chrome '--headless=new' '--disable-gpu' '--virtual-time-budget=6000' '--dump-dom' $u 2>&1 | Out-String

$report = @()
$report += "url=$u"
$report += "chrome_out_1=$o1"
$report += "chrome_out_2=$o2"
$report += "desktop_size=$((Get-Item $dst1 -ErrorAction SilentlyContinue).Length)"
$report += "mobile_size=$((Get-Item $dst2 -ErrorAction SilentlyContinue).Length)"
$report += "dom_chars=$($dom.Length)"
$report += "dom_has_reveal_attr=$($dom -match 'data-reveal=')"
$report += "dom_has_year_filled=$($dom -match '<span data-year=""></span>' -or $dom -match 'data-year>20')"
$report += "dom_has_modal_hidden=$($dom -match 'id=\"product-modal\" hidden')"
$dom | Set-Content -Encoding UTF8 (Join-Path $root '_tmp_qa_dom.txt')
$report | Set-Content -Encoding UTF8 (Join-Path $root '_tmp_qa_render.txt')

@echo off
set "CHROME=C:\Program Files\Google\Chrome\Application\chrome.exe"
set "ROOT=%~dp0"
set "URL=file:///%ROOT:\=/%produk-hikvision.html"
"%CHROME%" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=1440,3800 --virtual-time-budget=9000 --screenshot="%ROOT%_tmp_qa_desktop.png" "%URL%"
"%CHROME%" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=390,3000 --virtual-time-budget=9000 --screenshot="%ROOT%_tmp_qa_mobile.png" "%URL%"
"%CHROME%" --headless=new --disable-gpu --virtual-time-budget=7000 --dump-dom "%URL%" > "%ROOT%_tmp_qa_dom.txt" 2>&1
> "%ROOT%_tmp_qa_render.txt" echo URL=%URL%
>> "%ROOT%_tmp_qa_render.txt" dir /b "%ROOT%_tmp_qa_*.png" "%ROOT%_tmp_qa_dom.txt"

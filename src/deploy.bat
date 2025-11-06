@echo off
chcp 65001 >nul
cls

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🚀 Workigom Deployment Script (Windows)
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM Adım 1: Dependencies kontrolü
echo 📦 Adım 1: Dependencies kontrol ediliyor...
if not exist "node_modules\" (
    echo ⚠️  node_modules bulunamadı. npm install çalıştırılıyor...
    call npm install
    if errorlevel 1 (
        echo ❌ npm install başarısız!
        pause
        exit /b 1
    )
) else (
    echo ✅ node_modules mevcut
)
echo.

REM Adım 2: Build
echo 🔨 Adım 2: Production build oluşturuluyor...
call npm run build
if errorlevel 1 (
    echo ❌ Build başarısız!
    pause
    exit /b 1
)
echo ✅ Build başarılı!
echo.

REM Adım 3: Build boyutunu göster
echo 📊 Adım 3: Build analizi...
if exist "dist\" (
    echo ✅ dist klasörü oluşturuldu
) else (
    echo ❌ dist klasörü bulunamadı!
    pause
    exit /b 1
)
echo.

REM Adım 4: Deployment seçenekleri
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🎯 Build tamamlandı! Şimdi ne yapmak istersiniz?
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 1) 🌐 Netlify'a Deploy Et (dist klasörünü aç)
echo 2) 🚀 Render.com için GitHub'a Push Et
echo 3) 📦 dist.zip Oluştur (FTP yüklemesi için)
echo 4) 🧪 Local Preview (dist klasörünü test et)
echo 5) 📂 dist Klasörünü Aç
echo 6) ❌ Çıkış
echo.

set /p choice="Seçiminiz (1-6): "

if "%choice%"=="1" goto netlify
if "%choice%"=="2" goto github
if "%choice%"=="3" goto zip
if "%choice%"=="4" goto preview
if "%choice%"=="5" goto openfolder
if "%choice%"=="6" goto exit
goto invalid

:netlify
echo.
echo 📂 dist klasörü açılıyor...
start dist
echo.
echo ℹ️  Şimdi https://app.netlify.com/drop adresine gidin
echo    ve dist klasörünü tarayıcıya sürükleyin!
echo.
goto end

:github
echo.
set /p commit_msg="Git commit mesajı: "
if "%commit_msg%"=="" set commit_msg=Deploy to production

echo 📤 Git'e pushing...
git add .
git commit -m "%commit_msg%"
git push origin main

if errorlevel 0 (
    echo.
    echo ✅ GitHub'a push başarılı!
    echo.
    echo Şimdi Render.com'da:
    echo 1. https://render.com adresine gidin
    echo 2. 'New +' ^> 'Static Site' seçin
    echo 3. Repository'nizi seçin
    echo 4. Deploy edin!
) else (
    echo ❌ Git push başarısız!
)
echo.
goto end

:zip
echo.
echo 📦 dist.zip oluşturuluyor...

REM PowerShell ile zip oluştur
powershell -Command "Compress-Archive -Path dist\* -DestinationPath dist.zip -Force"

if exist "dist.zip" (
    echo ✅ dist.zip oluşturuldu
    echo.
    echo Bu dosyayı FTP ile web hosting'e yükleyebilirsiniz:
    echo 1. FileZilla ile hosting'e bağlanın
    echo 2. public_html klasörüne gidin
    echo 3. dist.zip'i yükleyin
    echo 4. cPanel'de extract edin
) else (
    echo ❌ ZIP oluşturulamadı!
)
echo.
goto end

:preview
echo.
echo 🧪 Local preview başlatılıyor...
echo ℹ️  Browser'da http://localhost:4173 açılacak
echo ℹ️  Durdurmak için Ctrl+C
echo.
call npm run preview
goto end

:openfolder
echo.
echo 📂 dist klasörü açılıyor...
start dist
echo.
goto end

:invalid
echo.
echo ❌ Geçersiz seçim!
echo.
goto end

:exit
echo.
echo 👋 Görüşürüz!
exit /b 0

:end
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✅ İşlem tamamlandı!
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 📖 Detaylı rehber için: WEB_HOSTING_REHBERI.md
echo.
pause

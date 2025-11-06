@echo off
REM Workigom GitHub Push Script (Windows)
REM Bu dosyayı çalıştırmadan önce GitHub'da repository oluşturun!

echo.
echo ========================================
echo   Workigom GitHub'a Yukleniyor...
echo ========================================
echo.

REM Kullanıcı adını sor
set /p USERNAME="GitHub kullanici adiniz: "

if "%USERNAME%"=="" (
    echo.
    echo ❌ Kullanici adi bos olamaz!
    pause
    exit /b 1
)

echo.
echo 📦 Git repository baslatiliyor...
git init

echo.
echo 📁 Dosyalar ekleniyor...
git add .

echo.
echo 💾 Commit olusturuluyor...
git commit -m "🎉 Workigom - Is pazari ve dayanisma platformu"

echo.
echo 🌿 Ana branch olusturuluyor...
git branch -M main

echo.
echo 🔗 GitHub repository baglaniyor...
git remote add origin https://github.com/%USERNAME%/workigom.git

echo.
echo ⬆️  GitHub'a yukleniyor...
git push -u origin main

echo.
echo ========================================
echo   ✅ Tamamlandi!
echo ========================================
echo.
echo 🎉 Workigom artik GitHub'da!
echo 📍 Repository URL: https://github.com/%USERNAME%/workigom
echo.
echo 📚 Sonraki adimlar icin GITHUB_BAGLANTI_KOLAY.md dosyasina bakin
echo.
pause

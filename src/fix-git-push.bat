@echo off
REM Git Push Fix Script (Windows)
REM Remote'ta degisiklik var, once pull yapalim

echo.
echo ========================================
echo   GIT PUSH FIX
echo ========================================
echo.

echo 📥 ADIM 1: Remote degisiklikleri al (git pull)
echo ----------------------------------------
echo.

echo ⬇️  GitHub'dan degisiklikleri indiriyorum...
git pull origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ⚠️  Conflict var! Manuel cozmeniz gerekebilir.
    echo.
    echo 📋 Conflict cozme:
    echo   1. Conflict'li dosyalari ac
    echo   2. ^<^<^<^<^<^<^< HEAD ve ^>^>^>^>^>^>^> isaretlerini temizle
    echo   3. Dogru kodu birak
    echo   4. git add .
    echo   5. git commit -m "fix: merge conflicts"
    echo   6. Bu scripti tekrar calistir
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Pull basarili!
echo.

echo.
echo 📤 ADIM 2: Degisiklikleri GitHub'a gonder (git push)
echo ----------------------------------------
echo.

echo 📁 Local degisiklikleri ekliyorum...
git add .

echo.
echo 💾 Commit mesaji:
set /p COMMIT_MSG="Commit mesaji (bos birakirsaniz otomatik): "

if "%COMMIT_MSG%"=="" (
    set COMMIT_MSG=feat: Supabase backend integration and deployment
)

echo.
echo 💾 Commit olusturuluyor: "%COMMIT_MSG%"
git commit -m "%COMMIT_MSG%"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ⬆️  GitHub'a yukleniyor...
    git push origin main
    
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ========================================
        echo   ✅ BASARILI!
        echo ========================================
        echo.
        echo 🎉 GitHub'a basariyla yuklendi!
        echo.
        echo 🔄 SIMDI RENDER REDEPLOY YAPIN:
        echo    1. Render Dashboard: https://dashboard.render.com/web/srv-d3u4tgppn3f5ibrl
        echo    2. Manual Deploy ^> Deploy latest commit
        echo    3. Logs'da "Database connected successfully" arayin
        echo.
    ) else (
        echo.
        echo ❌ Push basarisiz!
        echo Hata yukarida goruluyor.
        echo.
    )
) else (
    echo.
    echo ℹ️  Commit edilecek degisiklik yok (zaten guncel)
    echo.
    echo ⬆️  GitHub'a yukleniyor...
    git push origin main
    
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ========================================
        echo   ✅ BASARILI!
        echo ========================================
        echo.
        echo 🎉 GitHub guncel!
        echo.
        echo 🔄 SIMDI RENDER REDEPLOY YAPIN:
        echo    1. Render Dashboard: https://dashboard.render.com/web/srv-d3u4tgppn3f5ibrl
        echo    2. Manual Deploy ^> Deploy latest commit
        echo    3. Logs'da "Database connected successfully" arayin
        echo.
    ) else (
        echo.
        echo ❌ Push basarisiz!
        echo Hata yukarida goruluyor.
        echo.
    )
)

pause

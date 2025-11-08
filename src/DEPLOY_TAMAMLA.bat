@echo off
REM Workigom Full Deploy Script (Windows)
REM Git push + Render deploy talimatları

echo.
echo ========================================
echo   WORKIGOM FULL DEPLOY
echo ========================================
echo.

echo 🎯 ADIM 1/3: GIT PUSH
echo ----------------------------------------
echo.

echo 📁 Dosyalar ekleniyor...
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

echo.
echo ⬇️  Once remote degisiklikleri aliyorum (git pull)...
git pull origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ⚠️  Git pull basarisiz! Conflict olabilir.
    echo 📋 Conflict varsa:
    echo   1. Dosyalari ac ve conflict'i coz
    echo   2. git add .
    echo   3. git commit -m "fix: merge conflicts"
    echo   4. Bu scripti tekrar calistir
    pause
    exit /b 1
)

echo.
echo ⬆️  GitHub'a yukleniyor...
git push origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Git push basarisiz! Devam etmeden once sorunu cozun.
    echo.
    echo 🔧 Hizli cozum:
    echo    fix-git-push.bat calistirin
    pause
    exit /b 1
)

echo.
echo ✅ Git push basarili!
echo.

echo.
echo 🎯 ADIM 2/3: RENDER BACKEND DEPLOY
echo ----------------------------------------
echo.
echo 🌐 Render Dashboard acilacak...
timeout /t 2 >nul
start https://dashboard.render.com/web/srv-d3u4tgppn3f5ibrl

echo.
echo 📋 YAPIN:
echo   1. "Manual Deploy" dropdown butonuna tiklayin
echo   2. "Deploy latest commit" secenegini secin
echo   3. Deploy tamamlanana kadar bekleyin (2-3 dakika)
echo   4. Logs'da su satiri arayin:
echo      ✅ Database connected successfully
echo.
echo ⏳ Backend deploy ediliyor mu? (bekleyin...)
pause

echo.
echo 🎯 ADIM 3/3: TEST
echo ----------------------------------------
echo.
echo 🔍 Backend health check acilacak...
timeout /t 2 >nul
start https://workigom-backend.onrender.com/api/health

echo.
echo 📋 KONTROL EDIN:
echo   Beklenen:
echo   {
echo     "database": "connected",    ✅
echo     "supabase": "connected"     ✅
echo   }
echo.
echo   Hala "disconnected" goruyorsaniz:
echo   - Backend deploy tamamlanmis mi?
echo   - Logs'da "Database connected successfully" var mi?
echo.

pause

echo.
echo ========================================
echo   TAMAMLANDI!
echo ========================================
echo.
echo ✅ Git push yapildi
echo ✅ Render deploy basladi
echo ✅ Health check kontrol edildi
echo.
echo 📚 Sonraki adimlar:
echo   - Frontend'i test et: https://workigom-frontend1.onrender.com
echo   - Kayit ol / Giris yap test et
echo.
echo 📖 Detayli rehberler:
echo   - ACIL_REDEPLOY_GEREKLI.md
echo   - HEMEN_REDEPLOY.md
echo.

pause

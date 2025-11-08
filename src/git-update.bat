@echo off
REM Workigom Git Update Script (Windows)
REM Değişiklikleri GitHub'a push et

echo.
echo ========================================
echo   Git Update - Push to GitHub
echo ========================================
echo.

echo 📁 Dosyalar ekleniyor...
git add .

echo.
echo 💾 Commit mesaji:
set /p COMMIT_MSG="Commit mesaji (bos birakirsaniz otomatik): "

if "%COMMIT_MSG%"=="" (
    set COMMIT_MSG=feat: Supabase backend integration
)

echo.
echo 💾 Commit olusturuluyor: "%COMMIT_MSG%"
git commit -m "%COMMIT_MSG%"

echo.
echo ⬆️  GitHub'a yukleniyor...
git push origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================
    echo   ✅ Basarili!
    echo ========================================
    echo.
    echo 🎉 Degisiklikler GitHub'a yuklendi!
    echo.
    echo 🔄 Simdi Render.com'da redeploy yapin:
    echo    1. Render Dashboard'a git
    echo    2. workigom-backend sec
    echo    3. Manual Deploy ^> Deploy latest commit
    echo.
) else (
    echo ========================================
    echo   ❌ Hata!
    echo ========================================
    echo.
    echo Hata olustu. Detaylar yukarida.
    echo.
)

pause

@echo off
REM Workigom GitHub Yukleme Script (Windows)
REM Repository: https://github.com/volkanakbulut73/workingom1

echo.
echo ========================================
echo   Workigom GitHub'a Yukleniyor...
echo ========================================
echo.
echo Repository: https://github.com/volkanakbulut73/workingom1
echo.

echo 📦 Git repository baslatiliyor...
git init
if errorlevel 1 goto error

echo.
echo 📁 Dosyalar ekleniyor...
git add .
if errorlevel 1 goto error

echo.
echo 💾 Commit olusturuluyor...
git commit -m "🎉 Workigom - Is pazari ve dayanisma platformu"
if errorlevel 1 goto error

echo.
echo 🌿 Ana branch olusturuluyor...
git branch -M main
if errorlevel 1 goto error

echo.
echo 🔗 GitHub repository baglaniyor...
git remote add origin https://github.com/volkanakbulut73/workingom1.git
if errorlevel 1 (
    echo Remote zaten var, devam ediliyor...
    git remote set-url origin https://github.com/volkanakbulut73/workingom1.git
)

echo.
echo ⬆️  GitHub'a yukleniyor...
git push -u origin main
if errorlevel 1 goto error

echo.
echo ========================================
echo   ✅ TAMAMLANDI!
echo ========================================
echo.
echo 🎉 Workigom basariyla GitHub'a yuklendi!
echo.
echo 📍 Repository URL:
echo    https://github.com/volkanakbulut73/workingom1
echo.
echo 🌐 Sonraki adim: Netlify'a deploy edin!
echo    npm run build
echo    dist/ klasorunu https://app.netlify.com/drop'a surukleyin
echo.
echo 📚 Detayli rehberler icin:
echo    - HIZLI_CANLI_YAYIN.md
echo    - DEPLOYMENT_CHECKLIST.md
echo    - SUPABASE_HIZLI_BASLATMA.md
echo.
pause
exit /b 0

:error
echo.
echo ========================================
echo   ❌ HATA OLUSTU!
echo ========================================
echo.
echo Lutfen GITHUB_YUKLE.md dosyasindaki sorun giderme bolumune bakin
echo.
pause
exit /b 1

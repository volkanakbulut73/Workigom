@echo off
REM Workigom - Tum Dosyalari GitHub'a Yukle

echo.
echo ==========================================
echo   Tum Dosyalar GitHub'a Yukleniyor...
echo ==========================================
echo.

REM Tum dosyalari ekle
echo 📁 Tum dosyalar ekleniyor...
git add -A

REM Durum kontrol
echo.
echo 📊 Git durumu:
git status --short
echo.

REM Commit
echo 💾 Commit olusturuluyor...
git commit -m "✨ Tum proje dosyalari eklendi"

REM Push
echo.
echo ⬆️  GitHub'a yukleniyor (force)...
git push origin main --force

echo.
echo ==========================================
echo   ✅ TAMAMLANDI!
echo ==========================================
echo.
echo 🎉 Tum dosyalar GitHub'a yuklendi!
echo.
echo 📍 Kontrol edin:
echo    https://github.com/volkanakbulut73/workingom1
echo.
echo 📊 components/, contexts/, App.tsx, package.json
echo    ve 100+ dosya gormelisiniz!
echo.
pause

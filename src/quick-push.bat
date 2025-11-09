@echo off
echo ========================================
echo   HIZLI GIT PUSH - ENV CHECK TEST
echo ========================================
echo.

echo [1/3] Dosyalar ekleniyor...
git add .
if errorlevel 1 (
    echo.
    echo HATA: Git add basarisiz!
    pause
    exit /b 1
)
echo ✓ Dosyalar eklendi!
echo.

echo [2/3] Commit olusturuluyor...
git commit -m "fix: Prisma silindi + ENV check endpoint eklendi + _redirects duzeltildi"
if errorlevel 1 (
    echo.
    echo UYARI: Commit yapilamadi (belki degisiklik yok?)
    echo.
)
echo ✓ Commit basarili!
echo.

echo [3/3] GitHub'a push ediliyor...
git push origin main
if errorlevel 1 (
    echo.
    echo HATA: Push basarisiz!
    echo.
    echo Olasi sebepler:
    echo - Internet baglantisi yok
    echo - GitHub authentication gerekli
    echo - Branch adi yanlis (main/master?)
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ✅ GIT PUSH BASARILI!
echo ========================================
echo.
echo SIMDI NE YAPMALI?
echo.
echo 1. Render Dashboard ac:
echo    https://dashboard.render.com/
echo.
echo 2. workigom-backend sec
echo.
echo 3. Manual Deploy ^> Deploy latest commit
echo.
echo 4. ⏳ Bekle (2-3 dakika)
echo.
echo 5. Test et:
echo    https://workigom-backend.onrender.com/api/_env-check
echo.
echo    Beklenen:
echo    {
echo      "ok": true,
echo      "checks": {
echo        "HAS_DATABASE_URL": false  ✓ FALSE OLMALI!
echo      }
echo    }
echo.
echo 6. Eger DATABASE_URL: false ise:
echo    → MUKEMMEL! Prisma hatasi kayboldu! ✓
echo    → /api/health test et
echo.
echo 7. Eger DATABASE_URL: true ise:
echo    → Render'da DATABASE_URL'i sil
echo    → Backend redeploy
echo.
echo DETAYLI REHBER: HEMEN_TEST_ET.md
echo.

pause

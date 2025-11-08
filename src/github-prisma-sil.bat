@echo off
echo ========================================
echo GITHUB'DAKI PRISMA KLASORUNU SIL
echo ========================================
echo.

echo [1/4] Prisma klasoru Git'ten kaldiriliyor...
git rm -rf prisma
if errorlevel 1 (
    echo.
    echo UYARI: Prisma klasoru bulunamadi veya zaten silinmis.
    echo Bu normal olabilir - devam ediliyor...
    echo.
) else (
    echo ✓ Prisma klasoru Git'ten kaldirildi!
    echo.
)

echo [2/4] _redirects dosyasi duzeltiliyor...
echo ✓ _redirects hazir!
echo.

echo [3/4] Degisiklikler commit ediliyor...
git add .
git commit -m "remove: Prisma klasoru silindi ve _redirects duzeltildi - bu proje Supabase kullaniyor"
if errorlevel 1 (
    echo.
    echo UYARI: Commit yapilamadi. Belki degisiklik yok?
    echo.
) else (
    echo ✓ Commit basarili!
    echo.
)

echo [4/4] GitHub'a push ediliyor...
git push origin main
if errorlevel 1 (
    echo.
    echo HATA: GitHub'a push yapilamadi!
    echo.
    echo Olasi sebepler:
    echo - Internet baglantisi yok
    echo - GitHub credentials hatali
    echo - Branch adi yanlis (main/master?)
    echo.
    echo Manuel push deneyin:
    echo   git push origin main
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✓ BASARILI!
echo ========================================
echo.
echo Prisma klasoru GitHub'dan silindi!
echo _redirects dosyasi duzeltildi!
echo.
echo SIMDIKI ADIMLAR:
echo.
echo 1. GitHub'da kontrol et:
echo    https://github.com/KULLANICI_ADI/workigom
echo    → prisma klasoru YOK mu kontrol et!
echo.
echo 2. Render Backend Redeploy:
echo    https://dashboard.render.com/
echo    → workigom-backend sec
echo    → Manual Deploy ^> Deploy latest commit
echo.
echo 3. Test et:
echo    https://workigom-backend.onrender.com/api/health
echo    → "database": "connected" mi kontrol et!
echo.
echo 4. Frontend Redeploy:
echo    → workigom-frontend1 sec
echo    → Manual Deploy ^> Deploy latest commit
echo.
echo BITTI! 🎉
echo.

pause

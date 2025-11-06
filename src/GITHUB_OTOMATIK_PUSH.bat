@echo off
echo ========================================
echo   WORKIGOM - GITHUB OTOMATIK PUSH
echo ========================================
echo.

REM Git kurulu mu kontrol et
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [HATA] Git yuklu degil!
    echo Git indirmek icin: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/6] Git durumu kontrol ediliyor...
git status
echo.

echo [2/6] Uzak repository bilgisi kontrol ediliyor...
git remote -v
echo.

REM Eğer remote yoksa ekle
git remote get-url origin >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [UYARI] Remote repository bulunamadi. Ekleniyor...
    git remote add origin https://github.com/volkanakbulut73/Workigom.git
    echo [BASARILI] Remote eklendi!
    echo.
)

echo [3/6] Dosyalar Git'e ekleniyor...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo [HATA] Dosyalar eklenemedi!
    pause
    exit /b 1
)
echo [BASARILI] Tum dosyalar eklendi!
echo.

echo [4/6] Commit olusturuluyor...
git commit -m "Tam landing page + tum bolumler eklendi - Render deploy hazir"
if %ERRORLEVEL% EQU 0 (
    echo [BASARILI] Commit olusturuldu!
) else (
    echo [UYARI] Commit yapilacak degisiklik yok veya hata olustu
    echo Devam etmek icin bir tusa basin...
    pause
)
echo.

echo [5/6] GitHub'a push ediliyor...
echo Token ile kimlik dogrulamasi yapiliyor...
echo.

REM GitHub Personal Access Token ile push
git push https://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@github.com/volkanakbulut73/Workigom.git main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   BASARILI! GitHub'a yuklendi!
    echo ========================================
    echo.
    echo [6/6] Render.com otomatik deploy baslatacak...
    echo.
    echo Deploy durumunu kontrol edin:
    echo https://dashboard.render.com/
    echo.
    echo Web siteniz 2-3 dakika icinde guncellenecek:
    echo https://workigom-frontend1.onrender.com/
    echo.
) else (
    echo.
    echo ========================================
    echo   HATA! Push basarisiz!
    echo ========================================
    echo.
    echo Olasi nedenler:
    echo 1. Internet baglantisi yok
    echo 2. Token suresi dolmus
    echo 3. Repository erisim izni yok
    echo.
    echo Hatayi duzeltin ve tekrar calistirin.
    echo.
)

pause

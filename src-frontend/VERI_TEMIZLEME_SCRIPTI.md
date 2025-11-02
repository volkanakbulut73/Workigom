# Yemek Bağışı Verilerini Temizleme

## Tüm test verilerini temizlemek için browser console'da şu komutu çalıştırın:

```javascript
// Yemek bağışı verilerini temizle
localStorage.removeItem('foodDonationRequests');
localStorage.removeItem('notifications');
localStorage.removeItem('userProfiles');

// Veya sıfırla
localStorage.setItem('foodDonationRequests', '[]');
localStorage.setItem('notifications', '[]');
localStorage.setItem('userProfiles', '{}');

console.log('✅ Yemek bağışı verileri temizlendi');
```

## Sadece yemek bağışı taleplerini temizlemek için:

```javascript
localStorage.setItem('foodDonationRequests', '[]');
console.log('✅ Destek talepleri temizlendi');
```

## Sadece bildirimleri temizlemek için:

```javascript
// Tüm bildirimleri temizle
localStorage.setItem('notifications', '[]');
console.log('✅ Bildirimler temizlendi');
```

## Sadece kullanıcı istatistiklerini (Golden Heart vb.) sıfırlamak için:

```javascript
localStorage.setItem('userProfiles', '{}');
console.log('✅ Kullanıcı profilleri sıfırlandı');
```

## Not:
- Sayfayı yeniledikten sonra değişiklikler görünür
- Mock data artık otomatik yüklenmeyecek, sistem boş state ile başlayacak

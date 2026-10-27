# Bang Match çalışma kuralları

## Kaynak ve kapsam

- Asıl oyun [index.html](index.html); tek modlu Bang Match'tir.
- `İstop/index.html` ayrı klasik oyundur; açık istek olmadan değiştirme.
- Eski istop*.html ve ayrı klasik oyun bu depoya dahil değildir.
- Güncel kullanıcı talimatları eski proje tercihlerinden önceliklidir.

## Seçici okuma

1. Önce dosya listesi ve hedefli `rg -n` kullan; yalnız ilgili fonksiyonları oku.
2. Bütün HTML'yi, arşivleri veya bütün belgeleri her görevde okuma.
3. Aşağıdaki tablodan görev için gerekli belgeyi seç.
4. Bir bilginin tek sorumlu belgesi olsun; diğer belgeler bağlantı versin.
5. Yanıtta kodu tekrar yazma; sonuç, değişen dosya ve gerekli doğrulamayı kısaca bildir.

| İhtiyaç | Belge |
|---|---|
| Oyunu açma, kısa tanıtım | [README](README.md) |
| Mimari, kayıt, dosyalar ve test seçimi | [PROJECT_CONTEXT](docs/PROJECT_CONTEXT.md) |
| Seviyeler, kurallar ve özel toplar | [GAME_DESIGN](docs/GAME_DESIGN.md) |
| Açık işler ve öneriler | [ROADMAP](docs/ROADMAP.md) |
| Geçmiş ve yerel/yayın farkı | [CHANGELOG](docs/CHANGELOG.md) |
| Açıkça istenen teslim/yayın | [DEPLOYMENT](docs/DEPLOYMENT.md) |

## Kontrollü değişiklik

- Küçük, istekle sınırlı değişiklik yap; mevcut 100 seviyeyi, fiziği, ödülleri ve kayıtları koru.
- Kayıt anahtarlarını, geçiş uyumluluğunu, öğretici durumlarını ve envanteri bozma.
- Aynı mantığı tekrar üretmek yerine mevcut işlevleri kullan.
- HTML yetkili kaynaktır; giriş/menü değişirse bang-shell.js eşini de senkron tut.
- build-bang-match.cjs tek seferlik v29 geçişidir; güncel oyun üzerinde yeniden çalıştırma.
- revise/update/fix betiklerini okumadan çalıştırma; eski sürüme yönelik olabilirler.
- İlgisiz dosyaları silme veya toplu biçimlendirme yapma.
- Belgeleri yalnız ilgili bilgi değişirse güncelle; her küçük görsel ayarı kaydetme.
- Önemli geliştirme sonunda yalnız etkilenen MD belgelerini kısa ve tutarlı biçimde güncelle.
- PROJECT_CONTEXT.md yeni sohbetler için öz kaynak haritası olarak kalsın; sohbet dökümü veya uzun değişiklik günlüğüne dönüşmesin.
- Görev sonunda kısa değişiklik özeti, değişen dosyalar ve test sonuçlarını bildir; çalıştırılmayan testi açıkça belirt.
- Kod davranışı, kullanıcı isteği ve öneriyi ayır; belirsiz bilgiyi kesinleştirme.

## Doğrulama

- İlgili testi önce hedefi/varsayımları açısından incele, ardından gerekli kontrolleri çalıştır.
- Token tasarrufu için gerekli test ve güvenlik kontrollerini atlama.
- Görsel değişikliklerde dar ekran ve ilgili açık/koyu temayı kontrol et.
- Eski PNG veya PASS çıktısını yeni doğrulama sayma.
- verify-bang-preservation.cjs yalnız ilk ayrıştırmayı v29 ile karşılaştırır; genel regresyon testi değildir.
- Sadece belge görevinde bağlantıları, tutarlılığı ve kaynak kodunun değişmediğini doğrula.

## Yedek, kayıt ve teslim

- Açık istek olmadan yedek alma; mevcut arşivleri koru.
- Normal değişiklik çalışma alanındadır; GitHub/Masaüstü/Drive'a otomatik teslim etme.
- Tarayıcıda bir kopyanın açık olması o kopyayı güncelleme yetkisi değildir.
- Yayın istenirse yalnız istenen hedefi güncelle ve sonucu doğrula; ayrıntılar DEPLOYMENT.md'de.
- Dal/commit işleminden önce Git deposunu kontrol et; otomatik ana dala birleştirme yapma.

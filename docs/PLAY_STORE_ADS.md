# Bang Match — Google Play ve Reklam Planı

Durum: Planlama (2026-10-31). **Bu belge uygulanmış özellikleri temsil etmez.** Yetkili oyun: `index.html`. Mevcut tasarım: [GAME_DESIGN](GAME_DESIGN.md); mimari: [PROJECT_CONTEXT](PROJECT_CONTEXT.md); yayın: [DEPLOYMENT](DEPLOYMENT.md).

## Amaç ve koruma
- 100 seviyeyi, mevcut top çıkış fiziğini, hız düğmesini, kazanılmış ödülleri, envanteri ve kayıt geçişini koru.
- GitHub Pages sürümü ayrı kalsın. Android paketi için yerel HTML varlıkları kullanan Capacitor/WebView sarmalayıcı değerlendir; reklamları Google Mobile Ads SDK'nın **native Android** entegrasyonu ile ve güvenli JS–native köprüsü üzerinden aç. Harici canlı GitHub Pages URL'sini uygulama motoru olarak zorunlu kılma.
- Mevcut `bang_match_s` yerel kayıt şeması korunmalı. WebView depolama origin'inin farklı olabileceğini hesaba kat; eski web ilerlemesi otomatik olarak yeni APK'ya aktarılmış sayılmaz. Kaydetme/geri yükleme/restart testleri zorunlu.
- Android 2026 hedef API: 36+ (yayın tarihinde tekrar kontrol et); AAB, Play App Signing.

## Reklam yerleşimi — öneri, henüz kodlanmadı
1. **Ödüllü özel top:** oyuncu isteğiyle açılan seçim paneli; reklam tamamlandıktan ve ödül callback'i doğrulandıktan sonra mevcut `S.boosters` envanterine seçilen `volcano`, `ice` veya `electric` +1 ekle. Toplam 3 ödüllü top reklamı/gün/cihaz (tarih değişimi ve saat hilesi göz önünde bulundurulmalı); günlük limit değişebilir. Mevcut kazanım algoritmasını değiştirme.
2. **Ödüllü kurtarma:** oyuncu kaybedince isteğe bağlı; seviye başına en fazla bir kez. Başarıyla ödül verilirse top zincirlerini **aynı seviyenin standart başlangıç düzenine** yeniden kur, mevcut `score` ve `pc` (patlatılan top hedef ilerlemesi) değerlerini koru; kullanılan özel topları iade etme. İlerleme hızını seviyenin kalanında 0.5 çarpanı ile azalt. `updOne` içindeki gerçek hareket hızına uygulanan genel bir katsayı olmalı, `spawnRate` veya sabit top üretim gecikmesi getirilmemeli. Koridor use/save eşleşmesi ve multi-source topolojisi korunmalı. Kurtarma bayrağı/yavaşlatma yeni seviye veya yeniden denemede sıfırlanmalı. Hız değiştirme kontrolü varsa kullanıcı 1x/1.5x/2x tercihiyle çarpanların etkileşimini açıkça belirle (öneri: kurtarma çarpanı ek hız tercihinden bağımsız olarak çarpılır).
3. **Seyrek geçiş reklamı (interstitial):** yalnız doğal bölüm aralarında, ilk 5 başarıdan önce değil, son tam ekran reklamdan en az 5 başarılı bölüm ve 10 dakika sonra; günlük en fazla 3 gösterim. Her kayıp veya her açılışta gösterme. Bu eşikler başlangıç hipotezidir, testte gerekirse kaldır. Reward ekranının üstüne bindirme.
4. Reklam başarısız, kapatılmış veya internet yoksa ödül verme; ücretsiz yeniden dene, ilerleme ve menü erişimi çalışmaya devam etsin. Ödül callback'ini tek seferlik/idempotent uygula; ekran kapanması tek başına ödül onayı değildir.
5. Oyun sürerken banner ve zorlayıcı reklam yok.

## Uygulama fazları
1. Mevcut HTML/CSS/Canvas, kaydetme, ses, görünürlük ve touch akışını inceleyip Android köprü sınırını belirle.
2. Android proje yapısı, local asset paketleme, `targetSdk >= 36`, doğru applicationId, AAB/signing; telefon smoke test.
3. Consent/Privacy (Google UMP), AdMob app + ayrı üç ad unit, test cihazları; yalnız Google'ın test reklamlarıyla geliştirme.
4. Ödüllü top teklif UI, günlük sayaç ve doğrulanan callback ile kayıt.
5. Kayıp ekranında ödüllü kurtarma; aynı seviye rebuild, `score`/`pc` korunması ve 0.5 katsayı; fizik ve çoklu koridor regresyonları.
6. Seyrek geçiş reklamı, süre/sıklık sınırı, analytics eventleri, kill-switch.
7. İç test, kapalı test, gizlilik/data safety/store listing, nihai inceleme ve üretime gönderme.

## Google Play adımları
- https://play.google.com/console/ üzerinden 18+ geliştirici hesabı, tek seferlik US$25 kayıt ve kimlik/iletişim doğrulama.
- Oyunu oluştur (oyun, ücretsiz, hedef kitle, reklam içeriyor bilgileri), benzersiz paket kimliği tanımla. Ücretsiz dağıtımı seçme/ileride fiyat değiştirme koşullarını Play Console'da doğrula.
- Uygulama adı, kısa/tam açıklama, ikon (512x512), feature graphic (1024x500), gerçek Android ekran görüntüleri, destek iletişimi, gizlilik politikası bağlantısı.
- App content: reklam beyanı, veri güvenliği, hedef kitle/çocuk uygunluğu, içerik derecelendirmesi, uygulama erişimi ve gerekirse diğer formlar. Reklam SDK'sının veri işleme açıklamalarını dikkate al.
- Yeni kişisel hesaplarda (2023-11-13 sonrası) 12 test kullanıcısı **kesintisiz en az 14 gün** kapalı teste katılmalı; ardından üretim erişimi talebi ve değerlendirme.
- AAB'yi iç teste yükle; kapalı test sonuçlarıyla çökme, reklam ödül tekrarları, kayıt kaybı ve ekran sorunlarını düzelt. Sonra Production release oluştur, incelemeye gönder, yayın durumunu Console'dan doğrula.

## AdMob
- https://admob.google.com/ hesabı oluştur, ödeme ve vergi bilgilerini tamamla, uygulamayı kaydet, rewarded booster / rewarded revive / interstitial birimleri oluştur.
- UMP rıza durumunu gerekli pazarlarda kontrol edip izinli reklam isteği gönder; uygulama ayarlarında gereken gizlilik seçeneklerine erişim sağla.
- Android SDK test rewarded unit örneği: `ca-app-pub-3940256099942544/5224354917`; canlı reklamı kendi cihazında tıklayarak test etme. Yayından önce gerçek ad unit ID ve reklam yükleme/ödül doğrulaması.
- Üretimde gerçek reklam doluluğu, eCPM, ödül tamamlanma oranı, DAU, D1/D7 retention ve seviye kaybını ölç; çocuk hedef kitlesi seçimine göre Families reklam şartlarını ayrıca denetle.

## Test kabul kriterleri
- Reklam reddedildi/yarıda kesildi/yüklenemedi → puan, envanter ve kayıp ekranı bozulmaz.
- İki kez callback veya iki hızlı dokunma → ödül sadece bir kez verilir.
- Multi-source 100 seviyenin başlangıç yol/koridor düzeni kurtarmada korunur; hedef ilerlemesi ve skor aynı kalır, kullanılan güç iade edilmez.
- Hız yarıya iner, doğal `SP` zincir aralığı/top üretimi ve özel top süreleri bozulmaz; yavaşlatma başka seviyeye taşınmaz.
- Uygulama arka plana gidince/dönünce fizik zamanı, duraklama, reklam kapatma ve ses davranışı kontrollü.
- Telefon yeniden başlatma/uygulama kapanışı sonrasında mevcut yerel ilerleme/ödüller yüklenir.
- AdMob test reklamları, Android açık/koyu görünüm, farklı oranlı mobil ekranlar ve internet yok modu doğrulanır.

## Referanslar (2026-10-31 kontrolü)
- Play Console hesap açma: https://support.google.com/googleplay/android-developer/answer/6112435
- Yeni kişisel hesapların 12/14 test şartı: https://support.google.com/googleplay/android-developer/answer/14151465
- Hedef API: https://support.google.com/googleplay/android-developer/answer/11926878
- Play reklam politikası: https://support.google.com/googleplay/android-developer/answer/9857753
- Android rewarded reklam: https://developers.google.com/admob/android/rewarded
- UMP: https://developers.google.com/admob/android/privacy

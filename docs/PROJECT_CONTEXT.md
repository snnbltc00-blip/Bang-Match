# Teknik proje bağlamı

İnceleme: 2026-10-27. Yetkili kaynak [index.html](../index.html). Belge kodun yerine geçmez; değişken satır numaraları yerine aşağıdaki sembolleri ara.

## Yeni sohbette hızlı devam

Önce [AGENTS.md](../AGENTS.md) kurallarını uygula. Göreve göre aşağıdaki sembol/test haritasından yalnız ilgili bölümü seç; bütün belgeleri ve kaynakları yeniden okuma. Yerel/yayın farkı gerektiğinde [CHANGELOG](CHANGELOG.md), açık işler gerektiğinde [ROADMAP](ROADMAP.md) okunur. Önemli geliştirme bu haritayı veya kayıt sözleşmesini değiştirirse ilgili kısmı güncelle; ayrıntılı geçmişi burada tekrar etme.

## Dosyalar ve mimari

| Dosya | Rol |
|---|---|
| index.html | Inline CSS ve tek inline script; harici JS yok. Çizim, oyun ve kayıt birlikte. |
| [bang-shell.js](../bang-shell.js) | HTML'deki giriş/menü kodunun düzenlenebilir eşi. Ayrı script olarak yüklenmez; yalnız bunu değiştirmek oyunu değiştirmez. |
| `build-bang-match.cjs` | İlk v29 ayrıştırması; güncel derleyici değildir. Yeniden çalıştırmak eski oyun davranışını geri getirebilir. |
| `İstop/index.html` | Ayrı klasik oyun; bu belgelerin mekanik kapsamı dışında. |
| `istop-v29.html` | Dondurulmuş son birleşik sürüm. |
| Yerel eski index.html, istop-v*.html, revise/update/fix betikleri | Tarihsel kaynaklar/tek seferlik işlemler; varsayılan çalışma kaynağı değil. |
| PNG dosyaları | Belirli test anlarının çıktısı; güncel doğruluğu garanti etmez. |

Akış `requestAnimationFrame(loop) → upd(dt) → draw()`. `rs()` CSS boyutu ve cihaz piksel yoğunluğuna göre canvas'ı boyutlandırır. Pointer olayları fare/dokunmayı, wheel ve sürükleme seviye listesini yönetir.

`st` temel ekran akışını taşır: `intro → menu → levels/sp → spwin/lose`. `activeBoosterReward` seviye sonu ödül gösteriminde geçişi bekletir; `earnedBoosterKinds` yalnız geçici gösterim kuyruğudur. `paused` duraklatma, `activeBoosterInfo` açıklama sırasında güncellemeyi durdurur. `mode=2` aktif oyundur. HTML'de kalan klasik fonksiyonlar/durum dalları kullanıcıya açık ikinci mod anlamına gelmez; ilgisiz görevde temizleme.

## Sembol haritası

| İş | Aranacak semboller |
|---|---|
| Seviye verisi | `LVC`, `LEVEL_NAMES`, `LEVEL_GOALS`, `MULTI_SOURCE_LEVELS`, `BRAID_LEVELS`, `KNOT_LEVELS` |
| Geometri/kesişim | `newSpiral`, `specialPaths`, `makeObjectPath`, `makeMultiSourcePaths`, `makeBraidedPaths`, `preparePaths`, `buildCrossingMasks`, `clipUnderpasses` |
| Top üretimi | `ENHANCED_LEVELS`, `BALANCED_LEVELS`, `nextC`, `CFG.spawnRate`, koridorun `spawnCredit` alanı; dağılımlar GAME_DESIGN.md içinde. |
| Zincir/eşleşme | `updSp`, `updOne`, `spDown`, `spMove`, `spUp`, `grp`, `chk`, `popRange` |
| Kombo ve puan | `streakHit`, `startRev`, `msgPos`, `burstText`, `draw` |
| Özel toplar | `BOOSTER_INFO`, `awardLevelBooster`, `grantStarterBoosters`, `showNextBoosterInfo`, `drawBoosterInfo`, `drawLessons`, `drawVolcanoPrompt` |
| Menü/tema | `bangMenuLayout`, `bangPalette`, `drawBangMenu`, `bangPreviewPaths`, `bangLevelBackdrop`, `levelTheme`, `drawPause` |
| Kayıt | `S`, `sv2`, `saveProgress`, `resumeColor`, `lose` |

`SPS` koridorları taşır; `use(i)` koridor değişkenlerini ortak çalışma alanına yükler, `save(i)` değişiklikleri geri yazar. `PX/PY`, `Ltot`, `BR`, `SP`, `CX/CY` yol koordinatları, uzunluk, top yarıçapı, aralık ve atom merkezidir. Çoklu koridor işlemlerinde use/save eşleşmesini koru.

LVC ilk tanımdan sonra override ve üretim döngüleriyle değişir. Yalnız başlangıç dizisine bakarak nihai hedef/hız çıkarma. `v0` anlık hız değildir; `updOne` süre, ilerleme, tempo ve flowBoost gibi çarpanları birleştirir.

Menü arka planı kayıtlı seviye geometrisini bağımsız üretir; gerçek tur veya kaydedilmiş top konumları değildir. Kayıt yoksa 1. seviye kullanılır. Boyut/seviye/tema bazlı önbellek, düşük çözünürlüklü ara canvas, DPR uyumlu bulanıklık ve filter desteği olmayan tarayıcılar için çoklu çizim alternatifi vardır.

## Kayıt sözleşmesi

| Anahtar / alan | İçerik |
|---|---|
| `bang_match_s` | JSON S; `snd` ses, `b2` rekor, ilerleme ve envanter. |
| `S.progress.color` | `{score, level, completed}`. Zincirin anlık konumları kaydedilmez. |
| `S.boosters` | `volcano`, `ice`, `electric` adetleri. |
| `S.iceProgress`, `S.electricProgress`, `S.winChain` | Ödül sayaçları; zincirde count ve lastLevel. |
| `S.starterBoostersGranted`, `S.boosterSeen`, `S.learn` | Tek seferlik hediye, açıklamalar ve öğreticiler. |
| `bang_match_dk` | Tema. |
| `bang_match_legacy_best` | Korunan eski klasik rekor kodu; ana menü rekoru S.b2'dir. |

Yeni kayıt yoksa `istop_s` ve `istop_dk` değerlerinden geçiş yapılabilir. Bu uyumluluğu koru; eski özellikleri aktif ürün sayma. S içinde tarihsel kullanılmayan alanlar bulunabilir.

Kayıt patlatma, geçiş, kayıp, menüye dönüş, pagehide/visibilitychange akışlarında yapılır. Devam et, seviyeyi kayıtlı skorla yeniden kurar. localStorage hataları yakalanır; kayıt başarısızlığı kullanıcıya garantili bildirilmez. Kayıt origin/tarayıcıya bağlıdır; yerel dosya ve Pages aynı kayıt alanı varsayılmaz. Bulut kayıt, hesap veya sunucu senkronizasyonu uygulanmış olarak doğrulanmadı.

## Test rehberi ve sınırlar

Bu depo seçilmiş Bang Match kaynaklarını içerir; asıl yerel çalışma alanındaki tarihsel betikler ve klasik oyun dahil değildir. Testler npm üzerinden Playwright kullanır. Kurulum README içinde; CI henüz kurulmadı. Referans tablosundaki bağlantısız tarihsel araçlar yalnız özgün yerel çalışma alanındadır.

Kökte `node DOSYA.cjs` ile ilgili testi çalıştır; önce hedefini ve varsayımlarını incele. Bazı betikler PNG üretir: sadece Markdown görevinde bunları çalıştırma.

| Test | Amaç / sınır |
|---|---|
| [verify-bang-reward-notice.cjs](../verify-bang-reward-notice.cjs) | Tekli/çoklu ödül, çift tıklama, ödülsüz/kayıp/son seviye akışı, yeniden yükleme ve mobil/tema görselleri. |
| [verify-bang-boosters.cjs](../verify-bang-boosters.cjs) | İlk hediye, modal sırası/durması, ödüller, yeniden yükleme ve kayıt geçişi. |
| [verify-bang-spawn-rate.cjs](../verify-bang-spawn-rate.cjs) | Beş seviyede çıkış/hareket oranları, 95 seviyede eski üretim karşılaştırması, koridor sayacı ve buz/geri çekilme. |
| [verify-bang-selected-balance.cjs](../verify-bang-selected-balance.cjs) | Başlangıç/sürekli grup dağılımı, gökkuşağı eşikleri ve grup koruması. |
| [verify-bang-four-collision.cjs](../verify-bang-four-collision.cjs) | Otomatik tam dört patlatma; elle seçimin korunması. |
| [verify-bang-saved-backdrop.cjs](../verify-bang-saved-backdrop.cjs) | 100 geometri eşliği, oyun durumunun korunması, kayıt ve tema kontrastı. |
| [verify-bang-menu-focus.cjs](../verify-bang-menu-focus.cjs) | Düğmeler, devam et ve menünün oyun durumuna etkisi. |
| [verify-bang-combo-placement.cjs](../verify-bang-combo-placement.cjs) | 100 seviyede ekran/HUD sınırları; her koridorla sıfır çakışmayı kanıtlamaz. |
| [verify-bang-candy.cjs](../verify-bang-candy.cjs) | Menü/giriş/duraklatma; güncel beklentileri kontrol et. |
| `verify-bang-messages.cjs` | Eski üst/alt ve 20 px boşluk beklentisi; güncel 16 px yerleşimle uyumsuz olabilir. |
| `verify-bang-preservation.cjs` | İlk v29 ayrıştırması; sonraki kasıtlı değişiklikleri hata sayabilir. |

Gerçek telefon FPS'i, bütün tarayıcılarda görsel eşitlik ve 100 seviyenin insan oyuncuyla dengesi doğrulanmış değil. Eski İstop bot sonuçları güncel Bang Match kazanma olasılığı değildir. Son özel-top yazı kontrolü geçici tarayıcı denemesiyle de yapıldı; tamamı kalıcı test dosyasında bulunmuyor.

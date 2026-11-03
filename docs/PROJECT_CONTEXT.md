# Teknik proje bağlamı

İnceleme: 2026-10-27. Yetkili kaynak [index.html](../index.html). Belge kodun yerine geçmez; değişken satır numaraları yerine aşağıdaki sembolleri ara.

## Yeni sohbette hızlı devam

Önce [AGENTS.md](../AGENTS.md) kurallarını uygula. Göreve göre aşağıdaki sembol/test haritasından yalnız ilgili bölümü seç; bütün belgeleri ve kaynakları yeniden okuma. Yerel/yayın farkı gerektiğinde [CHANGELOG](CHANGELOG.md), açık işler gerektiğinde [ROADMAP](ROADMAP.md) okunur. Önemli geliştirme bu haritayı veya kayıt sözleşmesini değiştirirse ilgili kısmı güncelle; ayrıntılı geçmişi burada tekrar etme.

## Dosyalar ve mimari

| Dosya | Rol |
|---|---|
| index.html | Inline CSS ve tek inline script; harici JS yok. Çizim, oyun ve kayıt birlikte. |
| [bang-shell.js](../bang-shell.js) | HTML'deki giriş/menü kodunun düzenlenebilir eşi. Ayrı script olarak yüklenmez; yalnız bunu değiştirmek oyunu değiştirmez. |
| [bang-i18n.js](../bang-i18n.js) | HTML başındaki merkezi dil sözlüğünün eşi; ayrı yüklenmez. Yetkili HTML ile aynı tutulur. |
| `build-bang-match.cjs` | İlk v29 ayrıştırması; güncel derleyici değildir. Yeniden çalıştırmak eski oyun davranışını geri getirebilir. |
| `İstop/index.html` | Ayrı klasik oyun; bu belgelerin mekanik kapsamı dışında. |
| `istop-v29.html` | Dondurulmuş son birleşik sürüm. |
| Kök index.html, istop-v*.html, revise/update/fix betikleri | Tarihsel kaynaklar/tek seferlik işlemler; varsayılan çalışma kaynağı değil. |
| PNG dosyaları | Belirli test anlarının çıktısı; güncel doğruluğu garanti etmez. |

Akış `requestAnimationFrame(loop) → upd(dt) → draw()`. `rs()` CSS boyutu ve cihaz piksel yoğunluğuna göre canvas'ı boyutlandırır. Pointer olayları fare/dokunmayı, wheel ve sürükleme seviye listesini yönetir.

`bangIntroVideo`, HTML içine data URI olarak gömülü, sessiz ve playsinline 3 saniyelik MP4 oynatır. `playBangIntro()` oynatmayı başlatır; `finishBangIntro()` yalnız gerçek `ended` durumunda menüye geçer. Dokunma atlamaz; sekme gizlenince video durur, geri gelince devam eder. Ayrı medya dosyası gerekmez.

`st` temel ekran akışını taşır: `intro → menu → levels/sp → spwin/lose`. `activeBoosterReward` seviye sonu ödül gösteriminde geçişi bekletir; `earnedBoosterKinds` yalnız geçici gösterim kuyruğudur. `paused` duraklatma, `activeBoosterInfo` açıklama sırasında güncellemeyi durdurur. `mode=2` aktif oyundur. HTML'de kalan klasik fonksiyonlar/durum dalları kullanıcıya açık ikinci mod anlamına gelmez; ilgisiz görevde temizleme.

## Sembol haritası

| İş | Aranacak semboller |
|---|---|
| Seviye verisi | `LVC`, `LEVEL_NAMES`, `LEVEL_GOALS`, `MULTI_SOURCE_LEVELS`, `BRAID_LEVELS`, `KNOT_LEVELS` |
| Geometri/kesişim | `newSpiral`, `specialPaths`, `makeObjectPath`, `makeMultiSourcePaths`, `makeBraidedPaths`, `preparePaths`, `buildCrossingMasks`, `clipUnderpasses` |
| Top çıkış aralığı | `updOne`, `SP` ve zincir kuyruğu; standart ekleme ile kalan `ENTRY_SPAWN_LEVELS` kapsamı GAME_DESIGN.md içinde. |
| Zincir/eşleşme | `updSp`, `updOne`, `spDown`, `spMove`, `spUp`, `grp`, `chk`, `popRange` |
| Kombo ve puan | `streakHit`, `startRev`, `msgPos`, `burstText`, `draw` |
| Özel toplar | `BOOSTER_INFO`, `awardLevelBooster`, `grantStarterBoosters`, `showNextBoosterInfo`, `drawBoosterInfo`, `drawLessons`, `drawVolcanoPrompt` |
| Menü/tema | `bangMenuLayout`, `bangPalette`, `drawBangMenu`, `bangPreviewPaths`, `bangLevelBackdrop`, `levelTheme`, `drawPause` |
| Dil/ayarlar | `tr`, `LANG_EN`, `LANG_DYNAMIC`, `setGameLanguage`, `bangSettings`, `bangSettingsProgress`, `drawBangSettings` |
| Kayıt | `S`, `sv2`, `saveProgress`, `resumeColor`, `lose` |

`SPS` koridorları taşır; `use(i)` koridor değişkenlerini ortak çalışma alanına yükler, `save(i)` değişiklikleri geri yazar. `PX/PY`, `Ltot`, `BR`, `SP`, `CX/CY` yol koordinatları, uzunluk, top yarıçapı, aralık ve atom merkezidir. Çoklu koridor işlemlerinde use/save eşleşmesini koru.

LVC ilk tanımdan sonra override ve üretim döngüleriyle değişir. Yalnız başlangıç dizisine bakarak nihai hedef/hız çıkarma. `v0` anlık hız değildir; `updOne` süre, ilerleme, tempo ve flowBoost gibi çarpanları birleştirir.

Menü arka planı kayıtlı seviye geometrisini bağımsız üretir; gerçek tur veya kaydedilmiş top konumları değildir. Kayıt yoksa 1. seviye kullanılır. Boyut/seviye/tema bazlı önbellek, düşük çözünürlüklü ara canvas, DPR uyumlu bulanıklık ve filter desteği olmayan tarayıcılar için çoklu çizim alternatifi vardır.

## Kayıt sözleşmesi

| Anahtar / alan | İçerik |
|---|---|
| `bang_match_s` | JSON S; `snd` ses, `b2` rekor, ilerleme ve envanter. |
| `S.progress.color` | `{score, level, completed}`. Zincirin anlık konumları kaydedilmez. |
| `S.progress.colorAccess` | `{highest, completed}`. Kalıcı en yüksek açık seviye (1–100) ve bütün seviyeleri bitirme durumu; son oynanan seviyeden bağımsızdır. |
| `S.boosters` | `volcano`, `ice`, `electric` adetleri. |
| `S.iceProgress`, `S.electricProgress`, `S.winChain` | Ödül sayaçları; zincirde count ve lastLevel. |
| `S.starterBoostersGranted`, `S.boosterSeen`, `S.learn` | Tek seferlik hediye, açıklamalar ve öğreticiler. |
| `bang_match_dk` | Tema. |
| `bang_match_lang` | `tr` / `en`; yoksa veya tanınmıyorsa Türkçe. S kaydından bağımsızdır. |
| `bang_match_legacy_best` | Korunan eski klasik rekor kodu; ana menü rekoru S.b2'dir. |

Yeni kayıt yoksa `istop_s` ve `istop_dk` değerlerinden geçiş yapılabilir. Bu uyumluluğu koru; eski özellikleri aktif ürün sayma. S içinde tarihsel kullanılmayan alanlar bulunabilir.

Kayıt patlatma, geçiş, kayıp, menüye dönüş, pagehide/visibilitychange akışlarında yapılır. Devam et, en yüksek açık seviyeyi kayıtlı skorla yeniden kurar; bütün seviyeler bitmişse 1'i sıfır skorla başlatır. localStorage hataları yakalanır; kayıt başarısızlığı kullanıcıya garantili bildirilmez. Kayıt origin/tarayıcıya bağlıdır; yerel dosya ve Pages aynı kayıt alanı varsayılmaz. Bulut kayıt, hesap veya sunucu senkronizasyonu uygulanmış olarak doğrulanmadı.

`colorAccess` olmayan eski kayıtta geçerli `color.level` (1–100 tamsayı) erişim sınırı olarak bir kez alınır. `level=100` ve `completed=true` bütün seviyelerin tamamlandığını taşır. Eksik/bozuk erişim veya geçersiz eski seviye 1'e düşer. Eski formatın üzerine yazılmış geçmiş en yüksek seviyesi geri çıkarılamaz; yalnız kayıtta kalan seviye korunabilir. Alan mevcutsa son oynanan seviyeden tekrar türetilmez. `levelUp()` gerçek hedef kontrolünden sonra erişimi tek seviye artırır; `saveProgress()` erişimi değiştirmez. `canPlayLevel()` hem `levelsDown()` hem `newSpiral()` girişini korur. Yerel kayıt elle değiştirmeye karşı bir sunucu doğrulaması değildir.

## Dil ve ayarlar yapısı

Türkçe kaynak metinler çeviri anahtarıdır; `LANG_EN` İngilizce karşılıklarını, `LANG_DYNAMIC` sayı ve özel top adı içeren şablonları yönetir. `tr()` yalnız sunumda çalışır; dahili seviye/özel top kimlikleri ve oyun verisi çevrilmez. `T`, `bangText`, `plain`, `neon` ortak çizim işlevleri metni seçili dilde üretir; satır bölme ve ölçme öncesinde de çeviri yapılır. İngilizce sonuçlar sınırlı bir önbellekte tutulur. Bulunmayan anahtar kaynak metni gösterir. Mevcut sürümde ayrı bir reklam ekranı/entegrasyonu bulunmaz; yeni bir ödül/reklam metni eklenirse aynı sözlüğe dahil edilmelidir.

Yeni sabit metin için `LANG_EN` listesine `Türkçe|English` satırı ekle; dinamik metinde sayıları veya oyun kimliklerini değiştirmeyen tam eşleşmeli `LANG_DYNAMIC` şablonu kullan. HTML'deki `Presentation dictionary` ile `End presentation dictionary` arasını `bang-i18n.js` ile eş tut. Menü değişikliklerinde `bang-shell.js` eşini de güncelle. `verify-bang-language.cjs` iki eşliği kontrol eder. Uzun metinlere ilgili kutunun genişliğini `T` işlevinin son `mw` parametresi olarak geçir; yeni metni dar ekranda kontrol et.

`setGameLanguage()` tercihi ve HTML `lang` niteliğini günceller; oyun döngüsünün sonraki çizimi aktif ekrandaki metinleri yeniler. Kayıt engellenirse geçerli oturumda dil değişimi çalışmaya devam eder. `bangSettings` yalnız geçici sunum durumudur; kesilen geçiş yeni hedefe mevcut konumdan devam eder. Menü davranışının kullanıcıya dönük açıklaması [GAME_DESIGN](GAME_DESIGN.md#arayüz) içindedir.

## Test rehberi ve sınırlar

Testler `npm install` sonrasında Playwright ile çalıştırılır. İsteğe bağlı BROWSER_CHANNEL kullanılabilir.

Kökte `node DOSYA.cjs` ile ilgili testi çalıştır; önce hedefini ve varsayımlarını incele. Bazı betikler PNG üretir: sadece Markdown görevinde bunları çalıştırma.

| Test | Amaç / sınır |
|---|---|
| [verify-bang-unlocks.cjs](../verify-bang-unlocks.cjs) | Yeni/eski/bozuk kayıt, kilitli kart ve doğrudan giriş, gerçek sürükleme ve üç tanıtım, tek seferlik hediyeler, tekrar/kayıp/yenileme, 100. seviye ve dar TR/EN açık/koyu kartlar. |
| [verify-bang-language.cjs](../verify-bang-language.cjs) | Sözlük/menü eşliği, 100 seviye adı, aktif ekran çevirileri, dokunma/seri aç-kapat, görünmez hitbox, dil/tema/ses kaydı ve veri koruması; iki dilde 100 seviyenin aynı rastgele girdilerle eşliği; dar açık/koyu ekranlar. |
| [verify-bang-ui.cjs](../verify-bang-ui.cjs) | 3 saniyelik video/atlama engeli/menü geçişi, yeni ayarlar üzerinden tema/ses, kayıt geçişi ve üç ekran boyutu; görseller geçici klasöre yazılır. |
| [verify-bang-reward-notice.cjs](../verify-bang-reward-notice.cjs) | Gerçek ödül, çoklu kutucuk, çift tıklama, ödülsüz/kayıp/son seviye akışı ve yeniden yükleme; dar ekran ve tema görselleri. |
| [verify-bang-boosters.cjs](../verify-bang-boosters.cjs) | İlk hediye, modal sırası/durması, ödüller, yeniden yükleme ve kayıt geçişi. |
| [verify-bang-entry-start.cjs](../verify-bang-entry-start.cjs) | Yedi seviyede standart başlangıç dizilimi, gerçek upd+draw akışında aralıklar; dar açık/koyu görünüm. |
| [verify-bang-entry-spawn.cjs](../verify-bang-entry-spawn.cjs) | Korunan altı seviyede d=0 giriş konumu, mobil 320/390 px; diğer 94 seviyede standart yerleştirme eşliği. |
| [verify-bang-thirteen-groups.cjs](../verify-bang-thirteen-groups.cjs) | Seçili 13 seviyede grup oranları, skor gökkuşağı artışı/korumaları, çoklu koridor, 120 saniye üretim ve diğer 87 seviye eşliği. |
| [verify-bang-late-flow.cjs](../verify-bang-late-flow.cjs) | 50–100 genel çarpanı, sabit istisnalar, çoklu koridorlar ve 25/26/53; 100 seviye başlangıç/yapılandırma ve gerçek ilerleme regresyonu. |
| [verify-bang-flow-balance.cjs](../verify-bang-flow-balance.cjs) | Standart üretim/aralık, 25/53 toplam hız ve tempo, buz/duraklatma/geri çekilme; --capture/--compare ile değişiklik öncesi çalışma ölçümlerine karşı 93 seviye regresyonu. Eski verify-bang-spawn-rate.cjs bu teste yönlenir. |
| [verify-bang-four-collision.cjs](../verify-bang-four-collision.cjs) | Otomatik tam dört patlatma; elle seçimin korunması. |
| [verify-bang-saved-backdrop.cjs](../verify-bang-saved-backdrop.cjs) | 100 geometri eşliği, oyun durumunun korunması, kayıt ve tema kontrastı. |
| [verify-bang-menu-focus.cjs](../verify-bang-menu-focus.cjs) | Düğmeler, devam et ve menünün oyun durumuna etkisi. |
| [verify-bang-combo-placement.cjs](../verify-bang-combo-placement.cjs) | 100 seviyede ekran/HUD sınırları; her koridorla sıfır çakışmayı kanıtlamaz. |
| [verify-bang-candy.cjs](../verify-bang-candy.cjs) | Menü/giriş/duraklatma; güncel beklentileri kontrol et. |
| [verify-bang-messages.cjs](../verify-bang-messages.cjs) | Eski üst/alt ve 20 px boşluk beklentisi; güncel 16 px yerleşimle uyumsuz olabilir. |
| [verify-bang-preservation.cjs](../verify-bang-preservation.cjs) | İlk v29 ayrıştırması; sonraki kasıtlı değişiklikleri hata sayabilir. |

Gerçek telefon FPS'i, bütün tarayıcılarda görsel eşitlik ve 100 seviyenin insan oyuncuyla dengesi doğrulanmış değil. Eski İstop bot sonuçları güncel Bang Match kazanma olasılığı değildir. Son özel-top yazı kontrolü geçici tarayıcı denemesiyle de yapıldı; tamamı kalıcı test dosyasında bulunmuyor.

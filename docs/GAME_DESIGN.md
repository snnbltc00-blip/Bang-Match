# Mevcut oyun tasarımı

Kaynak: [index.html](../index.html), 2026-10-27 incelemesi. Gelecek fikirler [ROADMAP](ROADMAP.md) içinde ayrılır.

## Kurallar

- Tek kullanıcı modu: Bang Match. Eski mod seçimi gösterilmez.
- Beş normal renkte toplar koridorlarda atomlara ilerler. Aynı koridorda bitişik, aynı renkte en az dört topu sürükleyip bırakınca patlatırsın; elle dört üzeri seçim mümkündür.
- Patlatılan aralığın iki yanında aynı renk birleşince otomatik eşleşme tam dört top kaldırır. Aynı birleşmenin artıkları yeniden otomatik patlatılmaz (`chk`).
- Seviye hedefi `pc >= CFG.goal` patlatılan top adedidir; puan hedefi değildir. Kazanınca 1000 puan eklenir ve sonraki seviyeye geçilir.
- Terminal koridorun ön topu `Ltot` sınırına ulaşırsa kayıp olur; yeniden deneme/menü seçenekleri vardır.
- Normal grup puanı `round(10 × n × (n−2) × çarpan)`; gökkuşağı grubunda ek 1,5 çarpanı vardır. Özel etkilerin puanları ayrı hesaplanır.

## Kombo ve gökkuşağı

`streakHit`, ardışık patlatmalar arasında 3,2 saniyelik oyun zamanını kullanır. İkincide HIZLI x2, üçüncüde Üçlü Kombo gösterilir. `startRev` etkin koridorun ön topunu koridor yarısına çeker; yarıyı geçmemişse geri çekmez. Bütün koridorların birlikte gerilediği varsayılmamalıdır.

Gökkuşağına dokunmak komşu grupları patlatır. `rainbowSplash` diğer koridorlarda ekranda yakın olanlardan koridor başına en fazla dört topu etkiler. Kurtarıcı gökkuşağı dağılımı seviye ayarına bağlıdır; her seviyede aynı değildir.

## Kazanılabilen özel toplar

Üst ortada soldan sağa sıra aşağıdaki gibidir; haklar birikir ve yerel kayda yazılır.

| Top | Etki | Kazanım |
|---|---|---|
| Volkanik Top | Seçim sırasında ilerleme %20 hızına düşer. Dokunulan normal rengin bütün koridorlardaki topları patlar. Vazgeç iptal eder; hak renk seçilince tüketilir. | Sırayla artan üç seviyeyi peş peşe kazanma; kayıp zinciri sıfırlar. |
| Buz Topu | 5 saniye dondurur; eşleştirme yapılabilir. Tekrar kullanım süre ekler. | Her 5 seviye kazanımında bir. |
| Şimşek Topu | 10 saniye tekli/ikili grup temizleme yardımı; tekrar kullanım süre ekler. | Her 10 seviye kazanımında bir. |

İlk 1. seviye başlangıcında her birinden bir hak verilir; aynı kayıt için tekrar verilmez. Açıklamalar sırayla kutuda gösterilir, oyun güncellemesi durur. İlk açıklama Anladım, hak yokken simgeye dokunulan açıklama Devam et düğmesi kullanır. İlk kullanım açıklamaları gerektiğinde sonraki oyun başlangıcında sıraya alınır. İlk sürükleme öğreticisi bitmeden özel top kullanımına kısıt vardır.

Bilgilendirme açıkken sürükleme öğreticisi ve geçici puan/kombo yazıları gizlenir. Öğretici paneli ve oyun toast'ı simgelerin altındadır. Volkanik seçimde belirgin BİR RENK SEÇ paneli ve altında Vazgeç vardır.

Başarılı seviye sonunda envanteri gerçekten artan özel toplar için, 2,8 saniyelik bitiş animasyonundan sonra ortada “🎉 Bir özel top kazandın!” kutucuğu görünür. Mevcut top görseli ve adı kullanılır; kısa büyüme ve hafif parlama animasyonu vardır. Birden fazla ödül sırayla gösterilir. “Devam Et” son kutucukta sonraki seviyeyi (100. seviyede seviye listesini) açar; kutucuk açıkken otomatik geçiş durur. Açılıştaki 0,3 saniyelik giriş koruması seri tıklamanın sonraki kutucuğu atlamasını önler. Bildirim ödül vermez; mevcut ödül sistemi ve envanter artışı kullanılır. Ödülsüz başarı ve kayıp akışı değişmez. Sayfa kapatılır/yenilenirse kazanılmış ödül ve sonraki seviye kaydı korunur; bildirim tekrar oynatılmaz.

## Seviyeler

Çalışma zamanında doğrulanan sayı **100**; 1. seviye hedefi 200. Kesin hedef/hızların tek kaynağı nihai LVC verisidir; burada 100 satırlık tekrar tablo tutulmaz. Teknik arama haritası [PROJECT_CONTEXT](PROJECT_CONTEXT.md) içindedir.

- Spiral, sekiz, geometrik rota, nesne ve halat/düğüm geometrileri vardır; örneğin kahve fincanı, kalp, anahtar, masa lambası, telefon.
- İki/üç çıkışlı işaretlenen seviyeler: 2, 3, 7, 10, 12, 14, 16, 19, 22, 26, 30, 34, 38, 43, 47, 60, 70, 80, 90, 95, 100.
- Halat düzenleri: 7, 16, 22, 26, 34, 38, 43, 47, 60, 70, 80, 90, 95, 100. Alt yol kesişim maskesiyle çizilir.
- 5 ve 9 eski Y dallanması olarak belgelenmez; mevcut yapı tek kaynaklıdır.
- Hız süre, ilerleme, tempo ve seviye çarpanlarıyla değişir. Patlatılan her 25 top hız formülüne %5'lik basamak ekler; bu tek başına toplam hız değildir.
- 16 ve 34 için flowBoost ×0,5; 25–49 tek kaynaklılar için ×1,5; 50–100 tek kaynaklılar için ×1,5 uygulanır; sabit FAST_FLOW_LEVELS listesi [54,55,66,73,75,79,88,90,96,97] için genel çarpan ×2 olarak tutulur. Mevcut tek-kaynak koşulu korunur: 90 çoklu koridorlu olduğundan bu genel çarpanı almaz; Bu genel değişiklik 60/70/80/90/95/100 hızlarına uygulanmaz. 70/80/90/95 için aşağıdaki son yavaşlatma ayrıca geçerlidir. Sonradan uygulanan 25=1, 26=0,3 ve 53=1,2 nihai flowBoost ayarları korunur. Böylece 35 seviyenin toplam hızı aynı süre/puan/tempo koşullarında %25 azalır. Bu işlemlerden sonra 26. seviyenin flowBoost değerine ×0,3 uygulanır; üç koridorda da önceki ×0,4 ayarına göre hız çarpanı %25 azalır. Hedef hız formülüne de girdiğinden eski hedefle aynı patlatma sayısındaki hız oranı değişebilir.
- 2026-10-30 hedef güncellemesi: 2→300, 19→200, 22→250, 26→300, 27→350, 29→250, 30→200, 31→200, 35→250, 36→250, 39→300, 40→300, 41→300, 42→300, 43→250, 44→300, 45→250, 46→350, 49→300, 50→200, 51→300, 52→200, 53→250. Nihai değerler LEVEL_GOALS üzerinden uygulanır. 2026-10-31: 14. seviyenin hedefi 380’den 200 topa, 46. seviyenin hedefi 350’den 250 topa, 49. seviyenin hedefi 300’den 200 topa indirildi.
- Seviye kartları küçük kareler, genişliğe göre 4–7 sütun, kaydırma ve devam et içerir. Zor kartlar ayrı renk değildir; x2/x3 etiketi yoktur.

## Arayüz

### Kalıcı seviye erişimi

Yeni kayıtta yalnız 1. seviye açıktır. Gerçek hedef tamamlandığında yalnız sonraki seviye açılır; yeniden oynama, kayıp ve menüye dönüş en yüksek erişimi geriletmez. Kartlarda tamamlanmış seviyeler yeşil onay, en yüksek açık seviye mevcut aktif vurgu, kilitliler soluk görünüm ve sağ üstte küçük kilit simgesi taşır. Kilitli kartlarda da Türkçe/İngilizce adlar ve hedefler görünür; uzun adlar iki satır ve genişlik sınırıyla kart içine sığdırılır. Kilitli karta dokunmak etkisizdir; seviye başlatma girişinde de erişim denetlenir. Kart boyutları ve kaydırma korunur.

Oyuna Başla ve Devam Et, en yüksek açık ve henüz tamamlanmamış seviyeyi açar. Son oynanan bölüm ayrı saklanır. 100 tamamlanınca bütün seviyeler açık kalır; ana menüden başlatma önceki davranış gibi 1'e döner. İlk sürükleme öğreticisi, üç özel top tanıtımı ve başlangıç hediyesi mevcut kayıt bayraklarını kullanır, tamamlanan öğretici ve hediye yeniden verilmez. Kayıt alanı ve eski kayıt sınırları [PROJECT_CONTEXT](PROJECT_CONTEXT.md#kayıt-sözleşmesi) içindedir.

Atom temalı giriş yaklaşık dört saniye sürer, dokunarak atlanır. Menüde rekor, BANG MATCH, Eşleştir ve patlat!, Oyuna Başla ve daha küçük Seviyeler düğmesi bulunur. Arka plan son kayıtlı seviyenin bağımsız bulanık animasyonudur.

Sağ üstte varsayılan olarak yalnız ayarlar dişlisi görünür. Açıldığında soldan sağa dil, sessiz mod, karanlık mod ve dişli sıralanır. 44 px seçenekler boyut değiştirmeden dişliden sola kayar; 30 ms aralıklı gecikmelerle toplam 300 ms'de açılır, kapanırken ters sırayla sağa döner. Hızlı tekrar basış mevcut animasyon konumundan devam eder. Kapalı ve hareket halindeki seçenekler tıklanamaz; dişli her zaman kullanılabilir. Seçeneklere dokunmak menüyü kapatmaz; yalnız dişli açıp kapatır. Azaltılmış hareket tercihinde geçiş anlıktır. Ses/tema simgeleri, renkleri ve kayıtları korunur.

İngilizce ana menü sloganı “Match and BANG!” olarak kullanılır. Türkçe varsayılandır; dil düğmesi geçilecek dili gösterir (Türkçede ENG, İngilizcede TR). Dil değişimi sonraki çizimde giriş, menüler, 100 seviye adı, hedef/HUD, öğreticiler, kombo, duraklatma, başarı/kayıp ve özel top açıklama/ödül metinlerine yansır. Dil tercihi ayrı `bang_match_lang` anahtarında saklanır; ilerleme ve envanter değişmez. Teknik çeviri ekleme yöntemi [PROJECT_CONTEXT](PROJECT_CONTEXT.md#dil-ve-ayarlar-yapısı) içinde açıklanır.

Duraklatma kutusu Küçük bir mola... başlığını, devam/menü ve ses/tema kontrollerini içerir. Seviye ekranı tema ile uyumludur. Kombo yerleşimi boş merkez, koridor altı, atom üstü/altı ve alt boşlukları arar; sıkışık düzende en az çakışan aday seçilebilir. Her geometride sıfır örtüşme garanti değildir.

Puan yazıları atom merkezlerinden küçük biçimde çıkar; birden çok atomda aynı anda görünür. Tarayıcı etkileşim öncesi sesi engelleyebilir; otomatik ses her cihazda garanti değildir.

### Seçili seviyelerde grup ve yardım dengesi (2026-10-30)

32, 33, 36, 40, 42, 45, 46, 49, 50 ve 53: başlangıç ve sürekli üretimde her yeni renk grubu %55 olasılıkla 4–7, %45 olasılıkla 2–3 toptur. Grup dağılımı: 2 ve 3 top ayrı ayrı %22,5; 4 top %25; 5 top %20; 6 top %7,5; 7 top %2,5. Üretimde 8 topluk grup yoktur; oyun sırasında grupların birleşmesi daha uzun diziler oluşturabilir. Oran grup sayısına aittir; başlangıcın son grubu kuyrukta tamamlanabilir.

Bu seviyeler girişte gökkuşağı yerine assistRainbow kullanır. 14 ve 25’in skor eşiği, ön/giriş aday seçimi ve koridor başına iki gökkuşağı sınırı korunur. Yolun %60/%80/%90 ilerlemesinde yardım aralığı 22/14/8 saniyedir; skor eşiği daha erken yardım sağlayabilir. Yeni gökkuşağı mevcut olanlardan en az dört top aralığı uzaktadır. Dört topluk gruplar korunur; uzun grupların yalnız uçları dönüştürülür. Uygun aday yoksa yardım ertelenir. Eski kurtarma dalı ayrıca çalışmaz.

### Standart top çıkışı ve seçili hız dengesi (2026-10-31)

14, 39, 44, 46 ve 49 için spawnRate=0,5 ayarı ve üretim sayacı kaldırıldı. 14/39/44/46 başlangıçta standart hazır zinciri kullanır; tek top gösterip kalanını kuyruğa taşıyan ENTRY_START_LEVELS istisnası kaldırıldı. Bu beş seviye ile 25/53, standart SP zincir aralığını ve sonTop.d-SP ekleme kuralını kullanır; boş zincire ilk top d=0 konumunda eklenir. Ek bir bekleme veya toplu üretim sistemi yoktur. Standart başlangıçta koridorun ilk bölümü önceden doludur.

25 için nihai flowBoost 1,5→1 (%33,3 azalma), 53 için 2→1,2 (%40 azalma). Bu sabit çarpan, süre/puan/tempo dahil ilerleme hızının tamamına uygulanır; mevcut v0, tempo döngüsü ve hızlanma basamakları korunur. Normal top üretimi hareket ve zincir aralığına bağlıdır. Yeni bir spawnRate sistemi kullanılmaz. 26 hız ayarı değişmez.

36, 37, 40, 42, 45 ve 50 için mevcut d=0 giriş yerleştirmesi korunur. Diğer 93 seviyenin davranışı, bütün hedefler, renk grupları, gökkuşağı yardımı, yollar, özel toplar ve kayıtlar değişmez.

### 14, 25 ve 37 için yoğun eşleşme ve yardım

Bu üç seviyede başlangıç ve sürekli üretimin grup dağılımı: 2/3/4/5/6/7 top sırasıyla %5/%5/%20/%30/%25/%15. Başlangıç zincirinin son grubu kuyrukta tamamlanabilir. Diğer dengelenmiş seviyelerin dağılımı değişmez.

assistRainbow yardım beklemesi %0–60 için 22 saniye (mevcut skor eşiğiyle tetikleme), %60–80 için 16, %80–90 için 10 ve %90–100 için 6 saniyedir. Koridor başına iki gökkuşağı sınırı, dört top aralığı uzaklık, seçili topların korunması ve uzun grupların yalnız ucuna yerleştirme sürer; uygun aday yoksa yardım ertelenir. Tam dört topluk gruplar bölünmez. Bu grubun renk/yardım ayarları, 14 için standart üretime dönüşten ve 25 için yukarıdaki hız azaltımından bağımsızdır; 37 ilerleme hızı ve bütün hedefler korunur.

### 39 ve 44 grup/hız dengesi (2026-10-31)

Başlangıç ve sürekli üretimde 2/3/4/5/6/7 topluk grup oranları %11,25/%11,25/%25/%30/%20/%2,5. 4–6 toplamı %52,5’ten %75’e çıkarıldı; 7 oranı artırılmadı. Nihai flowBoost 1,5×0,8=1,2: aynı süre/puan/tempo koşullarında ilerleme hızı %20 azalır. Standart üretim, gökkuşağı yardımı ve yollar korunur.

### 2026-11-01 — seçili 36 seviye hedefi

54–100 aralığındaki istenen 36 hedef mevcut LEVEL_GOALS üzerinden güncellendi; diğer 64 hedef korundu. Nihai LVC, HUD ve kazanma eşikleri kontrol edildi. Hız ayarları ve hesaplama formülü değişmedi; hedef mevcut hız/ilerleme formülünün girdisi olduğundan aynı patlatma sayısındaki ilerleme oranı yeni hedefe göre hesaplanır. Bu hedefler güncel yayın paketine dahildir.

### 2026-11-01 — dört düğüm seviyesinde yarım hız

70/80/90/95 için diğer ayarlardan sonra flowBoost ×0,5 uygulanır (nihai değer 0,5). Üç koridorun her birinde aynı süre/puan/tempo koşullarında atoma ilerleme hızı yarıya iner. Ayar yalnız ilk yapılandırmada uygulanır; yeniden başlatmalarda birikmez. FAST_FLOW_LEVELS değişmez; 90 da yavaşlatılır. Hedefler sırasıyla 500/500/450/530; yollar, koridor sayıları, renk/yardım, fizik ve üretim kodu korunur. Üretimin harekete bağlı mevcut zamanlaması sürer. Regresyon: verify-bang-late-flow.cjs --knots.

### 2026-11-01 — dört düğüm seviyesinde uzun gruplar ve yardım

Yalnız 70/80/90/95, mevcut ENHANCED/BALANCED üretimine dahil edilir: 70/80 başlangıç ve sürekli üretiminde 2/3/4/5/6/7 top oranları %5/%5/%20/%30/%25/%15; grupların %70’i 5–7 toptur. 90/95 için oranlar %15/%15/%30/%20/%15/%5 olarak ayarlanmıştır; 5–7 toplamı %40’tır. Gökkuşağı girişte grup sırasını kesmek yerine assistRainbow ile yerleştirilir; eski kurtarma dalı ayrıca çalışmaz. Yol %45’ten sonra zamanlı yardım alır (öncesinde mevcut skor eşiği); %45–60/%60–80/%80–90/%90–100 aralıklarında 18/12/9/6 saniye bekleme vardır. Koridor başına en fazla üç gökkuşağı, en az dört top aralığı mesafe; seçili toplar ve dört topluk gruplar korunur, uzun grupların yalnız uçları kullanılır. Uygun aday yoksa yardım ertelenir. Yarım hız, hedefler ve yollar korunur.

### 2026-11-01 — seçili 13 seviyede gruplar ve skor gökkuşağı

55/57/59/60/61/64/65/68/74/75/78/79/94 için ayrı groupRainbowBoost=1,2 ayarı kullanılır. nextC başlangıç ve sürekli üretimde 2/3/4/5/6/7 normal topu sırasıyla %15/%15/%20/%25/%15/%10 olasılıkla seçer; ardışık gruplar farklı renktir. Gökkuşağı kuyruktaki grubun ortasına girmez, yeni grup sınırını bekler.

Nihai wild aralığı round(eski wild/1,2): 85→71 veya 55→46. İlk nextRb ve sonraki skor eşikleri bu aralığı kullanır. Kontrollü 20.000 patlatma sayacı testinde skorla üretim %19,6 arttı. Gerçek oynanışta uygun grup sınırı ve birikim koruması üretimi geciktirebilir; bu oran değişmeden kalan atom kurtarma yardımı dahil toplam için garanti değildir. Girişten skor gökkuşağı, koridorda zaten en az iki gökkuşağı varsa veya girişin dört SP yakınında gökkuşağı varsa ertelenir. Yeni normal grup tüketilmeden ikinci skor gökkuşağı gelmez. Çoklu koridorda daha az skor gökkuşağı almış koridor önceliklidir; sayaçlar yeni koridorla sıfırlanır, kayda eklenmez. Mevcut atom kurtarma dalı ve assistRainbow diğer seviyelerde aynı kalır.

Hedefler, hareket/üretim formülü, yollar ve özel hızlar değişmedi. verify-bang-thirteen-groups.cjs: koridor başına 10.000 sürekli grup, 2.000 başlangıç örneği, 120 saniye üretim/aralık, kurtarma ve diğer 87 seviye eşliği. Yerel güncelleme; GitHub yayını yapılmadı.

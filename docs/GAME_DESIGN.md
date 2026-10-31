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
- 16 ve 34 için flowBoost ×0,5; 25–49 tek kaynaklılar için ×1,5; 50–100 tek kaynaklılar için ×2 uygulanır. Bu işlemlerden sonra 26. seviyenin flowBoost değerine ×0,3 uygulanır; üç koridorda da önceki ×0,4 ayarına göre hız çarpanı %25 azalır. Hedef hız formülüne de girdiğinden eski hedefle aynı patlatma sayısındaki hız oranı değişebilir.
- 2026-10-30 hedef güncellemesi: 2→300, 19→200, 22→250, 26→300, 27→350, 29→250, 30→200, 31→200, 35→250, 36→250, 39→300, 40→300, 41→300, 42→300, 43→250, 44→300, 45→250, 46→350, 49→300, 50→200, 51→300, 52→200, 53→250. Nihai değerler LEVEL_GOALS üzerinden uygulanır. 2026-10-31: 14. seviyenin hedefi 380’den 200 topa, 46. seviyenin hedefi 350’den 250 topa, 49. seviyenin hedefi 300’den 200 topa indirildi.
- Seviye kartları küçük kareler, genişliğe göre 4–7 sütun, kaydırma ve devam et içerir. Zor kartlar ayrı renk değildir; x2/x3 etiketi yoktur.

## Arayüz

Atom temalı giriş yaklaşık dört saniye sürer, dokunarak atlanır. Menüde rekor, BANG MATCH, Eşleştir ve patlat!, Oyuna Başla ve daha küçük Seviyeler düğmesi; sağ üstte ay/nota kontrolleri bulunur. Arka plan son kayıtlı seviyenin bağımsız bulanık animasyonudur.

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

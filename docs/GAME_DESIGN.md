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

İlk 1. seviye başlangıcında her birinden bir hak verilir; aynı kayıt için tekrar verilmez. Açıklamalar sırayla kutuda gösterilir, oyun güncellemesi durur. İlk açıklama Anladım, hak yokken simgeye dokunulan açıklama Devam et düğmesi kullanır. Yeni kazanım açıklamaları sonraki oyun başlangıcında sıraya alınır. İlk sürükleme öğreticisi bitmeden özel top kullanımına kısıt vardır.

Bilgilendirme açıkken sürükleme öğreticisi ve geçici puan/kombo yazıları gizlenir. Öğretici paneli ve oyun toast'ı simgelerin altındadır. Volkanik seçimde belirgin BİR RENK SEÇ paneli ve altında Vazgeç vardır.

## Seviyeler

Çalışma zamanında doğrulanan sayı **100**; 1. seviye hedefi 200. Kesin hedef/hızların tek kaynağı nihai LVC verisidir; burada 100 satırlık tekrar tablo tutulmaz. Teknik arama haritası [PROJECT_CONTEXT](PROJECT_CONTEXT.md) içindedir.

- Spiral, sekiz, geometrik rota, nesne ve halat/düğüm geometrileri vardır; örneğin kahve fincanı, kalp, anahtar, masa lambası, telefon.
- İki/üç çıkışlı işaretlenen seviyeler: 2, 3, 7, 10, 12, 14, 16, 19, 22, 26, 30, 34, 38, 43, 47, 60, 70, 80, 90, 95, 100.
- Halat düzenleri: 7, 16, 22, 26, 34, 38, 43, 47, 60, 70, 80, 90, 95, 100. Alt yol kesişim maskesiyle çizilir.
- 5 ve 9 eski Y dallanması olarak belgelenmez; mevcut yapı tek kaynaklıdır.
- Hız süre, ilerleme, tempo ve seviye çarpanlarıyla değişir. Patlatılan her 25 top hız formülüne %5'lik basamak ekler; bu tek başına toplam hız değildir.
- 16 ve 34 için flowBoost ×0,5; 25–49 tek kaynaklılar için ×1,5; 50–100 tek kaynaklılar için ×2 uygulanır.
- Seviye kartları küçük kareler, genişliğe göre 4–7 sütun, kaydırma ve devam et içerir. Zor kartlar ayrı renk değildir; x2/x3 etiketi yoktur.

## Arayüz

Atom temalı giriş yaklaşık dört saniye sürer, dokunarak atlanır. Menüde rekor, BANG MATCH, Eşleştir ve patlat!, Oyuna Başla ve daha küçük Seviyeler düğmesi; sağ üstte ay/nota kontrolleri bulunur. Arka plan son kayıtlı seviyenin bağımsız bulanık animasyonudur.

Duraklatma kutusu Küçük bir mola... başlığını, devam/menü ve ses/tema kontrollerini içerir. Seviye ekranı tema ile uyumludur. Kombo yerleşimi boş merkez, koridor altı, atom üstü/altı ve alt boşlukları arar; sıkışık düzende en az çakışan aday seçilebilir. Her geometride sıfır örtüşme garanti değildir.

Puan yazıları atom merkezlerinden küçük biçimde çıkar; birden çok atomda aynı anda görünür. Tarayıcı etkileşim öncesi sesi engelleyebilir; otomatik ses her cihazda garanti değildir.

# Değişiklik kaydı

2026-10-27 tarihinde başlatıldı. Kanıtlar: mevcut kaynak, bu oturumun testleri ve doğrulanan GitHub commit/deployment sonuçları. Dosya adlarından tarih/sürüm uydurulmadı; bu kayıt tüm geçmişi kapsamaz.

## Yerel — henüz yayınlanmamış

### 2026-10-27 — özel top bilgilendirmesi

- Açıklama sırasında sürükleme öğreticisi ve geçici puan/kombo yazıları gizlendi; öğretici/toast simgelerin altına taşındı.
- Büyük, kontrastlı BİR RENK SEÇ paneli ve altında Vazgeç eklendi.
- verify-bang-boosters.cjs geçti; geçici tarayıcı kontrolü öğreticinin gizlenmesini, yönlendirmeyi ve iptal konumunu doğruladı. Gerçek telefon doğrulaması yerine geçmez.

### 2026-10-27 — dokümantasyon

- AGENTS.md kısaltıldı; README ve teknik/tasarım/yol haritası/değişiklik/teslim belgeleri oluşturuldu.
- Önceki teslim adresleri DEPLOYMENT.md'ye taşınarak korundu. Oyun kodu değiştirilmedi; GitHub'a gönderilmedi.
- 34 yerel belge/dosya bağlantısı ve AGENTS yönlendirmeleri doğrulandı; AGENTS 54 satır. 341 Markdown dışı dosyanın önce/sonra SHA256 değerleri aynı kaldı.

## Doğrulanmış GitHub yayınları — 2026-10-27

| Commit | Değişiklik |
|---|---|
| [68046f2](https://github.com/snnbltc00-blip/Bang-Match/commit/68046f2358e5f27233d6ee6ec0a2faf1d661e996) | Son doğrulanmış yayın: açık mod görünürlüğü %75, koyu mod %55; azaltılmış bulanıklık/örtü katmanı. |
| [90daca4](https://github.com/snnbltc00-blip/Bang-Match/commit/90daca4367664e824c4d5728c9e81a6bed9e84f5) | Arka plan ve düğme kontrastı; sonra 68046f2 ile yeniden ayarlandı. |
| [216ccdc](https://github.com/snnbltc00-blip/Bang-Match/commit/216ccdc701b6c6c44b6057cfbd0d5521b5164939) | Mobil bulanıklık/animasyon ve kombo yazılarının alt alanlara yerleşimi. |
| [001fd99](https://github.com/snnbltc00-blip/Bang-Match/commit/001fd992e27f2f18bb18e4d996960181f32176ff) | O tarihteki güncel oyun, menü ve kayıtlı seviye arka planının toplu yayını. |

Bu yayınların her birinde yerel/uzak index ve canlı Pages SHA256 eşleşmesi, deployment success doğrulandı. Uzak durum sonraki görevlerde yeniden kontrol edilmelidir. Adres ve teslim kuralları [DEPLOYMENT](DEPLOYMENT.md) içindedir.

## Daha eski geçmiş

Ayrıştırma, 100 seviyeye genişletme ve denge çalışmalarının izleri kaynakta bulunur; kesin sürüm tarihleri bu incelemede doğrulanmadı. Eski İstop bot raporları güncel Bang Match kazanma olasılığı/performans kanıtı değildir.

## 2026-10-27 — kaynak ve belge paketi

Güncel özel-top düzeltmesi, Markdown belgeleri, shell kaynağı ve altı ilgili test depoya eklendi. Depo yolları uyarlandı, Playwright bağımlılığı sabitlendi. Tarihsel dosyalar, kişisel teslim adresleri ve ekran görüntüleri dahil edilmedi; geliştirme dosyaları Pages yapılandırmasında hariç tutuldu. Önceki yerel/yayın notları tarihsel kayıt olarak korunur.

## 2026-10-30 — seviye dengesi ve hedefler

- 14, 25, 32, 33, 36, 37, 39, 40, 42, 44, 45, 46, 49, 50 ve 53. seviyelerde başlangıç/sürekli üretimde 4–7 topluk grup olasılığı %75; kalan gruplar 2–3 top. Koridor yardım aralıkları %60/%80/%90 ilerlemede 22/14/8 saniye; eşleşebilir gruplar ve gökkuşağı aralık/sayı sınırları korunur.
- 17 seviyenin hedefleri güncellendi; kesin liste GAME_DESIGN.md içinde. 26. seviyenin son hedefi 300, nihai flowBoost çarpanı 0,3; üç koridorda uygulanır.
- Kontroller: 100 seviye yapılandırma karşılaştırması, 17 hedef, üç koridorda hız oranları ve grup/gökkuşağı testi geçti. Eşleşme testi rastgele bir çalışmada hata verdi, sabit tohumla geçti; gerçek telefon oynanış testi yapılmadı.
- Yayın hedefi mevcut main/index.html; depo adı ve Pages adresi değiştirilmez. Bu kayıt yayın paketini tanımlar; canlı dağıtım sonucu ayrıca doğrulanır.

## 2026-10-30 — grup dağılımının yeniden dengelenmesi

- Aynı 15 seviyede 4–7 topluk grup olasılığı %55, 2–3 topluk grup olasılığı %45 oldu. 4/5/6/7 topluk gruplar sırasıyla %25/%20/%7,5/%2,5; doğrudan 8 top üretilmez. Oyun içi birleşmeler daha uzun gruplar oluşturabilir.
- %60/%80/%90 ilerlemede 22/14/8 saniyelik yardım, gökkuşağı sınırları ve eşleşebilir grup koruması değişmedi. Hedefler ve hızlar korunur.
- Sabit tohumlu testte koridor başına 10.000 grup incelendi: uzun gruplar %53,80–55,79; 7 topluk gruplar %2,18–2,77. Yardım eşikleri, dört topluk gruplar, çoklu koridor ve 100 seviyede çizim kontrolleri geçti. Test depo yollarına uyarlandı.

## 2026-10-30 — hedefler, seyrek çıkış ve üç seviyede yardım

- Önceki yerel hedef değişiklikleri yayıma dahil: 36→250, 40→300, 42→300, 45→250, 46→350, 50→200, 53→250.
- 14/39/44/46/49 için spawnRate=0,5 ve koridor başına üretim sayacı; ilerleme formülü değişmez. Kontrollü 60/120 Hz testinde üretim eski miktarın %49,1–50’si, zincir mesafesi aynı; diğer 95 seviyenin üretimi eski kodla eşleşti.
- 14/25/37 için 2–3/4/5/6/7 topluk grup oranları %10/%20/%30/%25/%15. Yardım aralıkları %0–60/%60–80/%80–90/%90–100 için 22/16/10/6 saniye; temel skor tetikleyicisi ve gökkuşağı korumaları sürer.
- Sürekli üretimde koridor başına 10.000, başlangıç üretiminde 2.000 örnek oran testleri geçti. Başlangıç grubunun kuyrukta kalan kısmı sayıldı; kısa yollarda tamamı ilk karede görünmeyebilir. Yardım/grup koruması, üretim/hareket regresyonu ve sabit tohumlu eşleşme testleri geçti. İnsan oynanış testi yapılmadı.

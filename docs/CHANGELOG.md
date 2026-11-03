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

## 2026-10-30 — seviye dengesi ve hedefler

- 14, 25, 32, 33, 36, 37, 39, 40, 42, 44, 45, 46, 49, 50 ve 53. seviyelerde başlangıç/sürekli üretimde 4–7 topluk grup olasılığı %75; kalan gruplar 2–3 top. Koridor yardım aralıkları %60/%80/%90 ilerlemede 22/14/8 saniye; eşleşebilir gruplar ve gökkuşağı aralık/sayı sınırları korunur.
- 17 seviyenin hedefleri güncellendi; kesin liste GAME_DESIGN.md içinde. 26. seviyenin son hedefi 300, nihai flowBoost çarpanı 0,3; üç koridorda uygulanır.
- Kontroller: 100 seviye yapılandırma karşılaştırması, 17 hedef, üç koridorda hız oranları ve grup/gökkuşağı testi geçti. Eşleşme testi rastgele bir çalışmada hata verdi, sabit tohumla geçti; gerçek telefon oynanış testi yapılmadı.
- Yayın hedefi mevcut main/index.html; depo adı ve Pages adresi değiştirilmez. Bu kayıt yayın paketini tanımlar; canlı dağıtım sonucu ayrıca doğrulanır.

GitHub kaynak commit'i: [80b734f](https://github.com/snnbltc00-blip/Bang-Match/commit/80b734fd77e1a0d851f40d47b0b9c75e25be4f65). Kapsam: index.html, docs/GAME_DESIGN.md, docs/CHANGELOG.md. Depodaki belge bağlantıları kökteki index.html düzenine uyarlandı.


Yayın doğrulaması: 80b734f için Pages çalışması 41110677809 success. Sabit oyun adresinin HTTP içeriği yerel index.html ile SHA256 eşleşti: 174eae0480521a98a769456acb825f21be47db1c8ef4f5022b497b5420a95584. Canlı sayfada 17 hedef, 26. seviyenin üç koridoru, flowBoost=0,3 ve çizilen 🎯 0/300 göstergesi doğrulandı.

## 2026-10-30 — grup dağılımı yeniden dengelendi

Aynı 15 seviyede uzun grup olasılığı %55, kısa grup olasılığı %45; 7 top %2,5 ve doğrudan 8 top üretimi yok. Kesin dağılım GAME_DESIGN.md içinde. Gökkuşağı eşikleri, hızlar ve hedefler korundu. Sabit tohumlu dağılım/yardım/çoklu koridor testi geçti. GitHub commit: d3fc4f76c29c362acbebfe16987e04c7b7c9b874; index.html, GAME_DESIGN.md, CHANGELOG.md ve depo yollarına uyarlanmış verify-bang-selected-balance.cjs gönderildi.

## 2026-10-30 — hedefler, seyrek çıkış ve üç seviyede yardım

- Önceki yerel hedef değişiklikleri yayıma dahil: 36→250, 40→300, 42→300, 45→250, 46→350, 50→200, 53→250.
- 14/39/44/46/49 için spawnRate=0,5 ve koridor başına üretim sayacı; ilerleme formülü değişmez. Kontrollü 60/120 Hz testinde üretim eski miktarın %49,1–50’si, zincir mesafesi aynı; diğer 95 seviyenin üretimi eski kodla eşleşti.
- 14/25/37 için 2–3/4/5/6/7 topluk grup oranları %10/%20/%30/%25/%15. Yardım aralıkları %0–60/%60–80/%80–90/%90–100 için 22/16/10/6 saniye; temel skor tetikleyicisi ve gökkuşağı korumaları sürer.
- Sürekli üretimde koridor başına 10.000, başlangıç üretiminde 2.000 örnek oran testleri geçti. Başlangıç grubunun kuyrukta kalan kısmı sayıldı; kısa yollarda tamamı ilk karede görünmeyebilir. Yardım/grup koruması, üretim/hareket regresyonu ve sabit tohumlu eşleşme testleri geçti. İnsan oynanış testi yapılmadı.

GitHub kaynak commit'i: f5759718401555733f48380ef4b34d577234472e.

## 2026-10-30 — özel top kazanma bildirimi

Başarılı seviye sonunda gerçek envanter artışından üretilen ödül kutucuğu eklendi. Kutucuklar bitiş animasyonundan sonra sırayla gösterilir; son Devam Et sonraki seviyeyi açar. Mevcut ödül sistemi ve kayıtlar korunur. Yeni ödül-geçiş testi ve mevcut özel top testi geçti; dar açık/koyu ve yatay görünüm kontrol edildi. Son paket GitHub’a gönderildi. 1. seviye hız kontrolü iptal edildi ve eklenmedi.

## 2026-10-30 — yeni topların çıkış konumu

- 14, 25, 36, 37, 39, 40, 42, 44, 45, 46, 50 ve 53. seviyelerde yeni toplar zincir kuyruğunda değil her koridorun girişinde (d=0) oluşturulur. Başlangıç dizilimi, hareket/boşluk kapatma formülü ve üretim çarpanları korunur.
- Hata, girişten uzaklaşmış kuyruk için d=sonTop.d-SP kullanılmasıydı. İlk top 80–133 yol birimi ileride oluşabiliyordu; doğum konumu üretim sayacından ayrıldı.
- Mobil 320/390 px testinde 12 seviyenin tüm koridorlarında giriş konumu doğrulandı. Diğer 88 seviyede önceki davranışla eşlik, yarım üretim oranları, grup/gökkuşağı ve ödül kutucuğu regresyonları geçti.

GitHub kaynak commit'i: f6b12ebadfb821d8366c7a030875a8d0437ea778.

## 2026-10-30 — dört seviyenin başlangıç yerleşimi düzeltmesi

14/39/44/46 seviyelerinde koridor başlangıçta ilerisine kadar dolduruluyordu; önceki doğum-konumu düzeltmesi bu hazır dizilimi kapsamıyordu. Artık ilk top girişte görünür, kalan başlangıç renkleri mevcut sq kuyruğundan normal aralıklarla çıkar. Ayrı üretim sistemi eklenmedi; renk sırası, grup dağılımı, geometri, hareket formülü ve spawnRate=0,5 korunur. Bu dört seviyenin ilk karede görünür top sayısı koridor başına birdir.

320/390 px üzerinde 12 saniyelik gerçek upd+draw akışı, başlangıç renk kuyruğu eşliği ve her doğumun d=0 olması doğrulandı. İlk kare görselleri açık/koyu temada incelendi. Giriş-konumu, üretim/hareket ve grup/gökkuşağı regresyonları geçti.

GitHub kaynak commit'i: 4909576467bc644f6fe24d0e6653d99f8b43a359.

## 2026-10-31 — standart üretime dönüş ve 25/53 temposu

- 14/39/44/46/49 yarım üretim sayacı kaldırıldı; 14/39/44/46 standart başlangıç zincirine döndü. Bu beş seviye ve 25/53 standart top ekleme/aralık düzenini kullanır.
- 25 nihai flowBoost=1, 53=1,2: aynı süre/puan/tempo koşullarında ilerleme hızları önceki sürüme göre %33,3 ve %40 azalır. Hedefler, 26 hızı, renk grupları, yardım ve geometri korunur.
- 320/390 px ve 60/120 Hz kontrollü testleri geçti: başlangıç, 120 saniyelik standart üretim/aralık karşılaştırması, bütün puan basamakları ve tempo döngüleri, buz/duraklatma/geri çekilme. Değişiklik öncesi çalışma ölçümleriyle diğer 93 seviye eşleşti. Grup/gökkuşağı, dört-top eşleşmesi ve ödül/kayıt regresyonları geçti. Gerçek telefonda insan oynanış testi yapılmadı.

## 2026-10-31 — 39/44 grup ve hız düzenlemesi

39/44 başlangıç ve sürekli üretiminde 4–6 grup oranı %75 (4:%25, 5:%30, 6:%20); 7 oranı %2,5 korunur. Nihai flowBoost ×0,8 ile toplam ilerleme hızı %20 azaltıldı. Bekleyen hedefler de dahil: 14→200, 46→250, 49→200. Grup testi: sürekli 10.000, başlangıç 2.000 örnek; gökkuşağı, standart üretim ve tempo/hız kontrolleri geçti. Gerçek telefon oynanış testi yapılmadı.


## 2026-10-31 — 50–100 genel hız dengesi

Genel tek-kaynak çarpanı 2’den 1,5’e indirildi. Sabit istisna listesi: 54,55,66,73,75,79,88,90,96,97. Çoklu koridor koşulu değişmediğinden 90 dahil 60/70/80/90/95/100 özel hızları korunur. 25/26/53 nihai ayarları aynı; 35 seviyenin ilerlemesi %25 azaldı, diğer 65 seviye aynı kaldı. 100 seviye yapılandırma/başlangıç ve koridor başına 36 süre/puan hız örneği, standart üretim, grup/gökkuşağı testleri geçti. Gerçek telefon oynanış testi yapılmadı.


## 2026-11-01 — dil, ayarlar, kalıcı erişim ve bekleyen denge güncellemeleri

- Türkçe/İngilizce merkezi çeviriler, kalıcı dil tercihi ve sola açılan ayarlar menüsü. Ses/tema korundu; İngilizce slogan: Match and BANG!
- Kalıcı sıralı seviye erişimi; eski kayıt geçişi, tekrar oynama sırasında erişimin korunması ve başlatma kontrolleri. Kilitli kartlarda iki dilde ad ve hedef, sağ üstte kilit görünür.
- Bekleyen 54–100 hedefleri, 70/80/90/95 yarım ilerleme hızı, grup/yardım düzenlemeleri, 90=450 ve 95=530 hedefleri, seçili 13 seviyenin grup/gökkuşağı dengesi dahil. Kesin değerlerin sorumlu belgesi GAME_DESIGN.md'dir.
- Seviye erişimi/öğretici/kayıt, ödül, dil ve menü testleri geçti. Dar açık/koyu görünümler kontrol edildi. Gerçek telefonda test yapılmadı.
- Kullanıcının açık isteğiyle mevcut GitHub Pages adresine yayın paketi hazırlandı; canlı doğrulama sonucu ayrıca kaydedilir.

Yayın doğrulaması: [83ec743](https://github.com/snnbltc00-blip/Bang-Match/commit/83ec743a0e83f8879492756cc30327ac0e94b436), 15 dosya yerel teslim paketiyle birebir eşleşti. Pages çalışması 41316885193 success; sabit oyun adresindeki index SHA256: `26573b9a8cb9883c77c48f31637b84d72747966dbbf9e0d567b34216455397f2`. Yayın öncesi sekiz güncel test geçti.


## 2026-11-03 — BALTX Studio giriş videosu

- Atom girişinin yerine HTML içine gömülü 3 saniyelik sessiz MP4 eklendi; dokunarak atlanmaz, bitince mevcut ana menü açılır. Menü, oyun ayarları ve kayıt sözleşmesi korundu.
- HTML/shell eşliği ve giriş testi güncellendi. Beş temel Chrome testi geçti; gerçek döngüde 320 px açık/koyu giriş ve menü görselleri kontrol edildi. Gerçek telefon testi kullanıcı doğrulaması bekliyor.
- Kullanıcı yayınlamayı onayladı; canlı yayın doğrulaması ayrıca raporlanır.

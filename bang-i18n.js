/* Presentation dictionary: Turkish source strings are stable keys. Inline mirror in index.html. */
let gameLanguage='tr';try{if(localStorage.getItem('bang_match_lang')==='en')gameLanguage='en'}catch(e){}
const LANG_EN=Object.fromEntries(`
Oyuncu|Player
REKOR|BEST
Rekor|Best
Oyuna Başla|Play
Seviyeler|Levels
Eşleştir ve patlat!|Match and BANG!
Başlamak için dokun|Tap to start
Başlamak için bir seviye seç|Choose a level to start
Devam et|Continue
Devam Et|Continue
Anladım|Got it
Küçük bir mola...|Taking a break...
▶  Devam Et|▶  Continue
⌂  Ana Menü|⌂  Main Menu
🏠  Ana Menü|🏠  Main Menu
▶  Tekrar Oyna|▶  Try Again
♫  Sessiz mod|♫  Mute
☾  Koyu mod|☾  Dark Mode
Sessiz Mod|Mute
Karanlık Mod|Dark Mode
Ayarlar|Settings
⚙️ AYARLAR|⚙️ SETTINGS
🌙  Koyu Mod|🌙  Dark Mode
🔊  Ses|🔊  Sound
🔇  Ses|🔇  Sound
Şimşek Topu|Lightning Ball
Buz Topu|Ice Ball
Volkanik Top|Volcano Ball
Simgeye dokun: 10 saniye boyunca|Tap the icon to clear single balls
tekli ve ikili top gruplarını temizler.|and pairs for 10 seconds.
Tekrar kullanmak süreyi uzatır.|Use again to extend the duration.
Her 10 seviye geçişinde 1 hak kazan.|Earn one every 10 levels completed.
Simgeye dokun: tüm koridorlardaki|Tap the icon to freeze all lanes
toplar 5 saniye donar. Bu sırada|for 5 seconds. You can still
topları seçip patlatabilirsin.|select and pop balls while frozen.
Her 5 seviye geçişinde 1 hak kazan.|Earn one every 5 levels completed.
Simgeye dokun; oyun yavaşlasın.|Tap the icon to slow the game.
Sonra renkli bir top seç. Aynı renkteki|Then choose a color to pop every
tüm toplar, bütün koridorlarda patlar.|ball of that color across all lanes.
Peş peşe 3 seviye geç: 1 hak kazan.|Win 3 levels in a row to earn one.
🎉 Bir özel top kazandın!|🎉 You earned a special ball!
üzerine tıkla.|tap its icon.
Önce dört topu sürükleyerek patlat|Drag across four balls first
BİR RENK SEÇ|CHOOSE A COLOR
Vazgeç|Cancel
En az 4 top!|At least 4 balls!
AYNI RENKTEN EN AZ 4 TOP SEÇ|MATCH AT LEAST 4 OF ONE COLOR
Parmağını topların üzerinde sürükle, bırak ve patlat!|Drag across the balls, release to pop!
🌈 GÖKKUŞAĞI TOPU|🌈 RAINBOW BALL
Dokun: komşu topları da patlat!|Tap to pop nearby balls too!
⚡ ELEKTRİK TOPU|⚡ LIGHTNING BALL
Dokun: 10 saniyelik yıldırım yardımını başlat!|Tap for 10 seconds of lightning help!
Sarmal doldu!|The path is full!
MÜKEMMEL|PERFECT
PATLAMA!|POP!
MÜKEMMEL PATLAMA!|PERFECT POP!
TÜM SEVİYELER TAMAMLANDI!|ALL LEVELS COMPLETE!
✓  100 seviye tamamlandı|✓  All 100 levels complete
Üçlü Kombo!|Triple Combo!
⚡ HIZLI x2|⚡ SPEED x2
REFLEKS CANAVARI!|AMAZING REFLEXES!
HARİKA!|AWESOME!
İNANILMAZ!|INCREDIBLE!
USTA İŞİ!|MASTERFUL!
ŞİMŞEK GİBİ!|LIGHTNING FAST!
EFSANE!|LEGENDARY!
NİŞANCI!|SHARPSHOOTER!
KUSURSUZ!|FLAWLESS!
ÇOK HIZLI!|SO FAST!
SÜPER!|SUPER!
BRAVO!|BRAVO!
GÖZ GÖRDÜ MÜ?|DID YOU SEE THAT?
DURDURULAMAZ!|UNSTOPPABLE!
PARMAKLAR YANIYOR!|ON FIRE!
KIL PAYI!|JUST IN TIME!
SON SANİYEDE!|AT THE LAST SECOND!
TERTEMİZ!|ALL CLEAR!
Yanlış top!|Wrong ball!
GÖKKUŞAĞI TOP GELDİ!|RAINBOW BALL READY!
+2 TOP · YENİ RENK|+2 BALLS · NEW COLOR
Süre doldu!|Time's up!
Pembe top kayboldu|The pink ball disappeared
SARI|YELLOW
MAVİ|BLUE
KIRMIZI|RED
YEŞİL|GREEN
MOR|PURPLE
TEK SARMAL|SINGLE SPIRAL
ÇİFT SARMAL|DOUBLE SPIRAL
8 ŞEKLİ|FIGURE EIGHT
Z YOLU|Z PATH
S KORİDORU|S LANE
ALTIGEN|HEXAGON
ELMAS|DIAMOND
YILDIZ|STAR
BASAMAKLI KORİDOR|STEPPED LANE
ÜÇGEN|TRIANGLE
U DÖNÜŞÜ|U TURN
BEŞGEN|PENTAGON
X KÖPRÜSÜ|X BRIDGE
YONCA|CLOVER
YÖRÜNGE|ORBIT
KELEBEK|BUTTERFLY
KARE|SQUARE
ÜÇ KORİDOR|THREE LANES
SERPANTİN|SERPENTINE
ÇİFT ELMAS|DOUBLE DIAMOND
ÇİFT U|DOUBLE U
ÜÇLÜ DALGA|TRIPLE WAVE
ÇİFT YAY|DOUBLE ARC
ÜÇLÜ ZİGZAG|TRIPLE ZIGZAG
İKİLİ BASAMAK|DOUBLE STEPS
ÜÇLÜ KAVİS|TRIPLE CURVE
ÇİFT DALGA|DOUBLE WAVE
ÜÇLÜ BASAMAK|TRIPLE STEPS
ÜÇLÜ YILAN|TRIPLE SNAKE
İKİLİ HALAT|DOUBLE BRAID
ÜÇLÜ HALAT|TRIPLE BRAID
KAHVE FİNCANI|COFFEE CUP
KULAKLIK|HEADPHONES
ŞİMŞEK|LIGHTNING
KALP|HEART
ANAHTAR|KEY
ROKET|ROCKET
KÂĞIT UÇAK|PAPER PLANE
ŞEMSİYE|UMBRELLA
ŞİŞE|BOTTLE
KUPA|TROPHY
MÜZİK NOTASI|MUSIC NOTE
DAĞ ZİRVESİ|MOUNTAIN PEAK
ÇAM AĞACI|PINE TREE
KALKAN|SHIELD
YELKENLİ|SAILBOAT
GİTAR|GUITAR
BALON|BALLOON
KRAL TACI|ROYAL CROWN
MIKNATIS|MAGNET
YAPRAK|LEAF
BALIK|FISH
ELMAS YÜZÜK|DIAMOND RING
MERDİVEN|LADDER
KELEBEK KANADI|BUTTERFLY WING
TREN|TRAIN
YILAN YOLU|SNAKE PATH
KALE|CASTLE
UZAY İSTASYONU|SPACE STATION
NEON FİNAL|NEON FINALE
MASA LAMBASI|DESK LAMP
TELEFON|PHONE
TELEVİZYON|TELEVISION
ÇAYDANLIK|TEAPOT
SANDALYE|CHAIR
MASA|TABLE
GÖZLÜK|GLASSES
FOTOĞRAF MAKİNESİ|CAMERA
KOL SAATİ|WRISTWATCH
ÇİFT DÜĞÜM|DOUBLE KNOT
SIRT ÇANTASI|BACKPACK
AYAKKABI|SHOE
ÜTÜ|IRON
SAÇ KURUTMA|HAIR DRYER
TARAK|COMB
MAKAS|SCISSORS
KUMANDA|REMOTE CONTROL
USB BELLEK|USB DRIVE
ELEKTRİK FİŞİ|POWER PLUG
ÜÇLÜ DÜĞÜM|TRIPLE KNOT
BOYA RULOSU|PAINT ROLLER
İNGİLİZ ANAHTARI|WRENCH
ÇEKİÇ|HAMMER
TORNAVİDA|SCREWDRIVER
ASMA KİLİT|PADLOCK
ZARF|ENVELOPE
AÇIK KİTAP|OPEN BOOK
KURŞUN KALEM|PENCIL
ALIŞVERİŞ ÇANTASI|SHOPPING BAG
ÇAPRAZ DÜĞÜM|CROSS KNOT
ÇALAR SAAT|ALARM CLOCK
VANTİLATÖR|FAN
SULAMA KABI|WATERING CAN
SÜPÜRGE|BROOM
ÇATAL|FORK
KAŞIK|SPOON
SPATULA|SPATULA
FIRIN ELDİVENİ|OVEN MITT
KAPALI ŞEMSİYE|CLOSED UMBRELLA
ARAP DÜĞÜMÜ|ARABIAN KNOT
SCOOTER|SCOOTER
OTOMOBİL|CAR
OTOBÜS|BUS
DİŞ FIRÇASI|TOOTHBRUSH
KÖR DÜĞÜM|TANGLED KNOT
OYUN KUMANDASI|GAME CONTROLLER
BİLGİSAYAR FARESİ|COMPUTER MOUSE
PARFÜM ŞİŞESİ|PERFUME BOTTLE
SATRANÇ PİYONU|CHESS PAWN
BÜYÜK DÜĞÜM|GREAT KNOT
10 dk hediye|10-minute gift
Kullanıcı adın:|Your name:
Top tasarımları yakında!|Ball designs coming soon!
🔊 Sesi açık tut|🔊 Keep sound on
▶  BAŞLA|▶  PLAY
👑 REKOR|👑 BEST
Tek sarmal|Single spiral
Çift sarmal|Double spiral
8 şekli yol|Figure-eight path
Z şekli yol|Z-shaped path
Klasik Mod|Classic Mode
KLASİK MOD|CLASSIC MODE
RENK CÜMBÜŞÜ|COLOR BURST
RENK EVRENİ|COLOR UNIVERSE
Renkleri yakala, kombini yap,|Catch colors, build combos,
en yüksek skoru elde et!|and beat your best score!
Topları eşleştir ve atomu patlat!|Match balls and blast the atom!
ANA MENÜYE GEÇMEK İÇİN DOKUN|TAP FOR THE MAIN MENU
`.trim().split('\n').map(line=>line.split('|')));
const LANG_DYNAMIC=[
 [/^(.*) kullanmak için$/,m=>'To use the '+tr(m[1])+','],
 [/^(\d+) top volkanla patladı!$/,m=>m[1]+' balls popped by the volcano!'],
 [/^(\d+) top$/,m=>m[1]+' balls'],
 [/^(\d+) top patlat(,?)$/,m=>'Pop '+m[1]+' balls'+m[2]],
 [/^(\d+)\. seviyeye geç!$/,m=>'Reach level '+m[1]+'!'],
 [/^(\d+)\. SEVİYE GEÇİLİYOR\.\.\.$/,m=>'MOVING TO LEVEL '+m[1]+'...'],
 [/^(\d+)\. SEVİYE$/,m=>'LEVEL '+m[1]],
 [/^(\d+) SEVİYE$/,m=>m[1]+' LEVELS'],
 [/^▶  Devam et · Seviye (\d+)$/,m=>'▶  Continue · Level '+m[1]],
 [/^(Seviye|Tur|Puan:|En iyi:|Rekor:|Kalan:|🎯 Hedef:|🏆 Rekor:|🏆 Klasik Mod Rekor:|🎈 Tur|DONDU) (.+)$/,m=>({'Seviye':'Level','Tur':'Round','Puan:':'Score:','En iyi:':'Best:','Rekor:':'Best:','Kalan:':'Remaining:','🎯 Hedef:':'🎯 Goal:','🏆 Rekor:':'🏆 Best:','🏆 Klasik Mod Rekor:':'🏆 Classic Best:','🎈 Tur':'🎈 Round','DONDU':'FROZEN'})[m[1]]+' '+m[2]],
 [/^KOMBO x(.+)$/,m=>'COMBO x'+m[1]],
 [/^🔥 Giriş serisi: (\d+) gün$/,m=>'🔥 Login streak: '+m[1]+' days'],
 [/^(.+) sn$/,m=>m[1]+' sec'],
 [/^(SARI|MAVİ|KIRMIZI|YEŞİL|MOR)!$/,m=>tr(m[1])+'!']
];
const languageCache=new Map();
function tr(value){const s=String(value);if(gameLanguage!=='en')return s;if(languageCache.has(s))return languageCache.get(s);let result=LANG_EN[s];if(result===undefined){result=s;for(const [pattern,format] of LANG_DYNAMIC){const m=s.match(pattern);if(m){result=format(m);break}}}if(languageCache.size>1024)languageCache.clear();languageCache.set(s,result);return result}
function setGameLanguage(lang){gameLanguage=lang==='en'?'en':'tr';document.documentElement.lang=gameLanguage;try{localStorage.setItem('bang_match_lang',gameLanguage)}catch(e){}}
document.documentElement.lang=gameLanguage;

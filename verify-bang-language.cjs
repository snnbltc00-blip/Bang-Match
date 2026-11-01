const {chromium}=require('playwright');
const assert=require('assert/strict'),fs=require('fs'),path=require('path'),os=require('os'),{pathToFileURL}=require('url');
(async()=>{
 const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
 assert.ok(html.includes(fs.readFileSync(path.join(__dirname,'bang-i18n.js'),'utf8').trim()),'dictionary mirror');
 assert.equal(html.slice(html.indexOf('/* Bang Match: presentation only.'),html.indexOf('let last=0;')),fs.readFileSync(path.join(__dirname,'bang-shell.js'),'utf8'),'shell mirror');
 const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||undefined});
 try{
  const page=await browser.newPage({viewport:{width:320,height:568},hasTouch:true});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{requestAnimationFrame=()=>0;window.testSeed=42;Math.random=()=>((window.testSeed=(Math.imul(window.testSeed,1664525)+1013904223)>>>0)/4294967296)});
  await page.goto(pathToFileURL(path.join(__dirname,'index.html')).href);
  assert.equal(await page.evaluate(()=>gameLanguage),'tr');
  await page.evaluate(()=>{st='menu';S.snd=0;draw();window.rendered=[];const original=x.fillText.bind(x);x.fillText=(s,...args)=>{rendered.push(String(s));original(s,...args)};window.tapMenu=kind=>{const r=bangMenuLayout()[kind];bangMenuDown(r.x+r.w/2,r.y+r.h/2)};});
  const animation=await page.evaluate(()=>{
   const sound=S.snd,dark=dk;tapMenu('sound');tapMenu('moon');tapMenu('language');if(sound!==S.snd||dark!==dk||gameLanguage!=='tr')throw Error('closed controls clickable');
   tapMenu('gear');t+=.04;const opening=bangSettingsProgress();if(!(opening[0]>opening[1]&&opening[1]>opening[2]))throw Error('stagger order');
   for(let i=0;i<30;i++){t+=.017;const before=bangSettingsProgress();tapMenu('gear');const after=bangSettingsProgress();if(before.some((v,k)=>Math.abs(v-after[k])>1e-10))throw Error('toggle jump');}
   if(!bangSettings.open)tapMenu('gear');t+=.31;if(bangSettingsProgress().some(v=>v!==1))throw Error('open completion');
   const l=bangMenuLayout();if(!(l.language.x+44<l.sound.x&&l.sound.x+44<l.moon.x&&l.moon.x+44<l.gear.x&&l.language.x>=0))throw Error('layout');
   tapMenu('gear');t+=.04;const closing=bangSettingsProgress();if(!(closing[2]<closing[1]&&closing[1]<closing[0]))throw Error('close stagger');t+=.31;if(bangSettingsProgress().some(v=>v!==0))throw Error('closed completion');
   tapMenu('gear');t+=.31;draw();return{opening,closing,buttonSize:l.gear.w};
  });
  // Actual touch input hits the language control and leaves settings open.
  const pos=await page.evaluate(()=>{const r=bangMenuLayout().language;return{x:r.x+22,y:r.y+22}});await page.touchscreen.tap(pos.x,pos.y);
  assert.deepEqual(await page.evaluate(()=>{rendered=[];draw();return{lang:gameLanguage,open:bangSettings.open,play:rendered.includes('Play'),switch:rendered.includes('TR'),doc:document.documentElement.lang}}),{lang:'en',open:true,play:true,switch:true,doc:'en'});
  const settings=await page.evaluate(()=>{const snapshot=JSON.stringify({...S,snd:0});tapMenu('moon');tapMenu('sound');if(!bangSettings.open)throw Error('option closed settings');if(JSON.stringify({...S,snd:0})!==snapshot)throw Error('settings changed progress');sv2();return{sound:S.snd,dark:dk,save:JSON.stringify(S)}});
  await page.reload();assert.deepEqual(await page.evaluate(()=>({lang:gameLanguage,sound:S.snd,dark:dk,save:JSON.stringify(S)})),{lang:'en',...settings});
  const coverage=await page.evaluate(()=>{
   S.snd=0;S.progress.colorAccess={highest:100,completed:false};S.starterBoostersGranted=true;S.boosterSeen={volcano:true,ice:true,electric:true};S.learn={drag:true,rainbow:true,electric:true};
   const missing=LEVEL_NAMES.filter(name=>!Object.hasOwn(LANG_EN,name));if(missing.length)throw Error('level translations '+missing.join(','));
   window.rendered=[];const original=x.fillText.bind(x);x.fillText=(s,...args)=>{rendered.push(String(s));original(s,...args)};
   const screens=[];window.checkScreen=name=>{rendered=[];draw();const bad=rendered.filter(s=>/[çğıöşüÇĞİÖŞÜ]/.test(s)||(LANG_EN[s]&&LANG_EN[s]!==s));if(bad.length)throw Error(name+': '+bad.join(' / '));screens.push(name);return [...rendered]};
   st='intro';checkScreen('intro');st='menu';checkScreen('menu');openLevels();
   for(let y=0;y<=levelMaxScroll()+200;y+=200){levelScroll=Math.min(y,levelMaxScroll());checkScreen('level cards '+levelScroll)}
   newSpiral(1);activeBoosterInfo=null;checkScreen('HUD');lessonDrag=true;checkScreen('drag tutorial');lessonDrag=false;
   for(const key of ['rainbow','electric']){specialHint={i:0,o:SPS[0].ch[0],key,age:1};checkScreen(key+' tutorial')}specialHint=null;
   paused=true;checkScreen('pause');paused=false;
   for(const kind of BOOSTER_ORDER){activeBoosterInfo={kind,first:true};checkScreen(kind+' info');activeBoosterInfo=null;activeBoosterReward={kind,age:1};checkScreen(kind+' reward');activeBoosterReward=null;}
   volcanoSelecting=true;checkScreen('volcano selection');volcanoSelecting=false;iceRemaining=4;toast={s:'16 top volkanla patladı!',l:2};checkScreen('dynamic toast');toast=null;iceRemaining=0;
   st='spwin';wt2=.8;checkScreen('win');st='lose';lr='Sarmal doldu!';checkScreen('lose');
   if(tr('450 top')!=='450 balls'||tr('Seviye 95')!=='Level 95')throw Error('dynamic numbers');
   // Rendering reflects language immediately, even when a notice was created in Turkish.
   st='sp';activeBoosterReward={kind:'ice',age:1};setGameLanguage('tr');rendered=[];draw();if(!rendered.includes('Buz Topu kullanmak için'))throw Error('TR reward');setGameLanguage('en');checkScreen('live reward switch');activeBoosterReward=null;
   return{levels:LEVEL_NAMES.length,screens:screens.length};
  });
  // Same seeded inputs in either language must produce identical game states in all 100 levels.
  const preserved=await page.evaluate(()=>{
   const collect=lang=>{setGameLanguage(lang);return LVC.map((_,i)=>{testSeed=42;newSpiral(i+1);activeBoosterInfo=null;for(let n=0;n<120;n++)updSp(1/60);return JSON.stringify({cfg:CFG,lanes:SPS,pc,spt})})};
   const trStates=collect('tr'),enStates=collect('en');for(let i=0;i<100;i++)if(trStates[i]!==enStates[i])throw Error('gameplay changed '+(i+1));return enStates.length;
  });
  const screenshots=[];
  for(const [width,height]of [[320,568],[390,844]])for(const dark of [false,true]){
   await page.setViewportSize({width,height});
   for(const screen of ['menu','levels','pause','reward','info','lose']){
    await page.evaluate(({dark,screen})=>{rs();dk=dark;setGameLanguage('en');newSpiral(53);activeBoosterInfo=null;activeBoosterReward=null;paused=false;if(screen==='menu'){st='menu';bangSettings.open=true;bangSettings.from=[1,1,1]}if(screen==='levels'){openLevels();levelScroll=levelMaxScroll()}if(screen==='pause')paused=true;if(screen==='reward')activeBoosterReward={kind:'electric',age:1};if(screen==='info')activeBoosterInfo={kind:'electric',first:false};if(screen==='lose'){st='lose';lr='Sarmal doldu!'}draw()},{dark,screen});
    const file=path.join(os.tmpdir(),`bang-language-${width}-${dark}-${screen}.png`);await page.screenshot({path:file});screenshots.push(file);
   }
  }
  // Preference storage failures must leave the currently selected language usable.
  await page.evaluate(()=>{Storage.prototype.setItem=()=>{throw Error('blocked storage')};setGameLanguage('tr');setGameLanguage('en');if(gameLanguage!=='en')throw Error('storage fallback')});
  assert.deepEqual(errors,[]);console.log(JSON.stringify({status:'PASS',animation,coverage,preserved,checks:'touch, rapid reversal, hidden hitboxes, theme/mute, reload and unchanged save, live translation, 100 seeded level states, narrow light/dark',screenshots}));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});

const {chromium}=require('playwright');
const assert=require('assert/strict'),path=require('path'),os=require('os'),{pathToFileURL}=require('url');
(async()=>{const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||undefined});try{
 const page=await browser.newPage({viewport:{width:320,height:568}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>requestAnimationFrame=()=>0);
 await page.goto(pathToFileURL(path.join(__dirname,'index.html')).href);
 const result=await page.evaluate(()=>{
  S.snd=0;const check=(v,m)=>{if(!v)throw Error(m)};check(S.progress.colorAccess.highest===1,'new save');st='menu';check(newSpiral(2)===false&&st==='menu','direct locked start');lvStart=50;check(newSpiral()===false,'implicit locked start');openLevels();const r=lvRect(1);levelsDown(r.x+10,r.y+10);check(st==='levels','locked card');
  bangStartGame();check(level===1&&lessonDrag,'first drag tutorial');check(S.starterBoostersGranted&&BOOSTER_ORDER.every(k=>S.boosters[k]===1),'starter gifts');const notices=[];while(activeBoosterInfo){notices.push(activeBoosterInfo.kind);dismissBoosterInfo()}check(notices.length===3,'three introductions');
  selS=0;use(0);sel={l:ch.slice(0,4),tr:[],c:1};spUp();check(S.learn.drag&&!lessonDrag,'real drag completion');const inventory=JSON.stringify(S.boosters);pc=0;levelUp();check(st==='sp'&&S.progress.colorAccess.highest===1,'false win');pc=CFG.goal;levelUp();check(S.progress.colorAccess.highest===2,'unlock exactly next');upd(3);check(level===2,'normal transition');newSpiral(1);check(!lessonDrag&&!activeBoosterInfo&&JSON.stringify(S.boosters)===inventory,'repeat tutorial/gift');lose(null,'Sarmal doldu!');check(S.progress.colorAccess.highest===2,'loss keeps unlock');bangStartGame();check(level===2,'menu frontier');
  // Advance through real goal checks, then replay a lower level.
  for(let lv=2;lv<=7;lv++){newSpiral(lv);activeBoosterInfo=null;pc=CFG.goal;levelUp();check(S.progress.colorAccess.highest===lv+1,'sequential '+lv)}
  newSpiral(3);pc=CFG.goal;levelUp();check(S.progress.colorAccess.highest===8,'replay win preserves frontier');upd(3);while(activeBoosterReward){upd(.4);dismissBoosterReward()}check(S.progress.colorAccess.highest===8,'reward continuation');newSpiral(3);saveProgress();return{notices,access:{...S.progress.colorAccess},inventory:{...S.boosters}};
 });
 await page.reload();assert.equal(await page.evaluate(()=>S.progress.colorAccess.highest),8);await page.evaluate(()=>{S.snd=0;resumeColor();if(level!==8)throw Error('resume highest after replay reload')});
 const shots=[];for(const dark of [false,true])for(const lang of ['tr','en']){await page.evaluate(({dark,lang})=>{dk=dark;setGameLanguage(lang);openLevels();levelScroll=0;draw()},{dark,lang});const file=path.join(os.tmpdir(),`bang-unlocks-${dark}-${lang}.png`);await page.screenshot({path:file});shots.push(file)}
 // Test independent old/current save formats without pagehide overwriting fixtures.
 const cases=[
  {progress:{color:{level:37,score:4321}},expected:37},
  {progress:{color:{level:100,completed:true}},expected:100,complete:true},
  {progress:{color:{level:3},colorAccess:{highest:8,completed:false}},expected:8},
  {progress:{color:{level:500}},expected:1},
  {progress:{color:{level:'8'}},expected:1},
  {progress:{color:{level:8},colorAccess:{highest:-2}},expected:1},
  {progress:[],expected:1}
 ];
 for(const c of cases){await page.evaluate(c=>{runStarted=false;localStorage.setItem('bang_match_s',JSON.stringify({progress:c.progress,snd:0}))},c);await page.reload();assert.deepEqual(await page.evaluate(()=>S.progress.colorAccess),{highest:c.expected,completed:!!c.complete});}
 await page.evaluate(()=>{runStarted=false;localStorage.removeItem('bang_match_s');localStorage.setItem('istop_s',JSON.stringify({snd:0,progress:{color:{level:26,score:222}},boosters:{ice:4}}))});await page.reload();assert.deepEqual(await page.evaluate(()=>[S.progress.colorAccess.highest,S.boosters.ice]),[26,4]);
 await page.evaluate(()=>{runStarted=false;localStorage.setItem('bang_match_s','{broken')});await page.reload();assert.equal(await page.evaluate(()=>S.progress.colorAccess.highest),1);
 const final=await page.evaluate(()=>{S.snd=0;S.progress.colorAccess={highest:100,completed:false};S.starterBoostersGranted=true;S.boosterSeen={volcano:true,ice:true,electric:true};newSpiral(100);activeBoosterInfo=null;pc=CFG.goal;levelUp();upd(3);while(activeBoosterReward){upd(.4);dismissBoosterReward()}if(st!=='levels'||!S.progress.colorAccess.completed)throw Error('final completion');bangStartGame();if(level!==1||S.progress.colorAccess.highest!==100)throw Error('completed restart');saveProgress();return S.progress.colorAccess});await page.reload();assert.deepEqual(await page.evaluate(()=>S.progress.colorAccess),final);
 assert.deepEqual(errors,[]);console.log(JSON.stringify({status:'PASS',...result,checks:'new save, direct/card guards, real drag and 3 intros, gifts once, goal guard, sequential/replay/loss/menu/reload, 7 migration fixtures, legacy/corrupt saves, final level and reward flow',screenshots:shots}));
 }finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});

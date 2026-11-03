const {chromium}=require('playwright');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const os=require('node:os');
const assert=require('node:assert/strict');
const url=pathToFileURL(path.join(__dirname,'index.html')).href;
(async()=>{
 const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||undefined});
 try{
  const ctx=await browser.newContext({viewport:{width:390,height:844},offline:true});
  await ctx.addInitScript(()=>{window.requestAnimationFrame=()=>0;});
  const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url);await page.evaluate(()=>{localStorage.clear()});await page.reload();
  assert.equal(await page.title(),'Bang Match');
  assert.deepEqual(await page.evaluate(()=>({st,mode})),{st:'intro',mode:2});
  await page.waitForFunction(()=>bangIntroVideo.currentTime>.2,null,{polling:50});
  assert.equal(await page.evaluate(()=>bangIntroVideo.duration),3);
  assert.equal(await page.evaluate(()=>bangIntroVideo.controls),false);
  await page.mouse.click(100,300);assert.equal(await page.evaluate(()=>st),'intro');
  await page.waitForFunction(()=>st==='menu',null,{polling:50});
  assert.deepEqual(await page.evaluate(()=>[bangIntroVideo.ended,bangIntroVideo.hidden,it]),[true,true,3]);
  const click=async name=>{const r=await page.evaluate(n=>bangMenuLayout()[n],name);await page.mouse.click(r.x+r.w/2,r.y+r.h/2)};
  await click('gear');await page.evaluate(()=>{t+=.31});
  await click('moon');assert.equal(await page.evaluate(()=>dk),true);
  await click('sound');assert.equal(await page.evaluate(()=>S.snd),0);
  await page.reload();assert.deepEqual(await page.evaluate(()=>[dk,S.snd]),[true,0]);
  await page.waitForFunction(()=>st==='menu',null,{polling:50});await click('start');
  assert.deepEqual(await page.evaluate(()=>({st,mode,level,score})),{st:'sp',mode:2,level:1,score:0});
  await page.evaluate(()=>{S.progress.colorAccess={highest:37,completed:false};S.progress.color={score:4321,level:37,completed:false};st='menu';mt=1;activeBoosterInfo=null;});
  await click('start');assert.deepEqual(await page.evaluate(()=>[st,mode,level,score]),['sp',2,37,4321]);
  await page.evaluate(()=>{S.progress.colorAccess={highest:100,completed:true};S.progress.color={score:9999,level:100,completed:true};st='menu';mt=1;activeBoosterInfo=null;});
  await click('start');assert.deepEqual(await page.evaluate(()=>[st,mode,level,score]),['sp',2,1,0]);
  await page.evaluate(()=>{st='menu';mt=1;activeBoosterInfo=null;});await click('levels');
  assert.deepEqual(await page.evaluate(()=>[st,LVC.length]),['levels',100]);
  await page.evaluate(()=>{levelsDown(32,45)});assert.equal(await page.evaluate(()=>st),'menu');
  for(const size of [{width:360,height:640},{width:390,height:844},{width:724,height:884}]){
   await page.setViewportSize(size);
   for(const dark of [false,true]){
    await page.evaluate(d=>{dk=d;st='menu';mt=1;t=2.8;flash=0;shake=0;parts=[];S.b2=12450;draw()},dark);
    const layout=await page.evaluate(()=>bangMenuLayout());
    for(const n of ['gear','language','moon','sound','start','levels']){const r=layout[n];assert.ok(r.x>=0&&r.y>=0&&r.x+r.w<=size.width&&r.y+r.h<=size.height,`outside viewport: ${n}`)}
    await page.screenshot({path:path.join(os.tmpdir(),`bang-menu-${size.width}-${dark?'dark':'light'}.png`)});
    await page.reload();await page.waitForFunction(()=>bangIntroVideo.currentTime>.3&&bangIntroVideo.currentTime<2.8,null,{polling:50});
    await page.screenshot({path:path.join(os.tmpdir(),`bang-intro-${size.width}-${dark?'dark':'light'}.png`)});
    await page.waitForFunction(()=>st==='menu',null,{polling:50});
   }
  }
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>{dk=false;st='levels';levelScroll=0;draw()});await page.screenshot({path:path.join(os.tmpdir(),'bang-levels-verified.png')});
  // Draw-only shell must not alter gameplay data, progress or consume gameplay randomness.
  const noMutation=await page.evaluate(()=>{newSpiral(22);const snap=()=>JSON.stringify({S,SPS,score,level,mode});const before=snap();for(let k=0;k<20;k++){drawBangMenu();drawBangIntro()}return before===snap()});assert.equal(noMutation,true);
  assert.deepEqual(errors,[]);
  // Isolated save migration reads the legacy data once, then keeps a separate namespace.
  await page.evaluate(()=>{runStarted=false;localStorage.clear();localStorage.setItem('istop_s',JSON.stringify({b2:8123,snd:0,progress:{color:{score:1234,level:23,completed:false}},boosters:{electric:2,ice:3,volcano:1},learn:{drag:true}}));localStorage.setItem('istop_dk','1')});
  await page.reload();assert.deepEqual(await page.evaluate(()=>[S.b2,S.progress.color.level,S.boosters.ice,dk,S.snd]),[8123,23,3,true,0]);
  await page.evaluate(()=>{S.b2=9000;sv2();localStorage.setItem('istop_s',JSON.stringify({b2:1}));});await page.reload();assert.equal(await page.evaluate(()=>S.b2),9000);
  console.log(JSON.stringify({result:'PASS',viewports:3,themes:2,checks:'3-second video duration/no skip, start/resume/reset, levels, toggles/reload, migration/isolation, draw-only state, screenshots',errors}));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});

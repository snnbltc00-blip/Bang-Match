const {chromium}=require('playwright');
const assert=require('assert/strict'),path=require('path'),os=require('os'),{pathToFileURL}=require('url');
(async()=>{const browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});try{
 const page=await browser.newPage({viewport:{width:360,height:640}});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>requestAnimationFrame=()=>0);await page.goto(pathToFileURL(path.join(__dirname,'index.html')).href);
 const result=await page.evaluate(()=>{
  S.snd=0;S.starterBoostersGranted=true;S.boosterSeen={volcano:true,ice:true,electric:true};S.learn.drag=true;
  window.prepareRewardTest=(lv,chain,ice,electric)=>{newSpiral(lv);activeBoosterInfo=null;S.winChain={count:chain,lastLevel:lv-1};S.iceProgress=ice;S.electricProgress=electric;S.boosters={volcano:0,ice:0,electric:0};pc=CFG.goal;levelUp();};
  const cases=[];
  for(const [name,chain,ice,electric,expected] of [['volcano',2,0,0,['volcano']],['ice',0,4,0,['ice']],['electric',0,0,9,['electric']],['multiple',2,4,9,['volcano','ice','electric']]]){
   prepareRewardTest(9,chain,ice,electric);const inventory=JSON.stringify(S.boosters);levelUp();if(JSON.stringify(S.boosters)!==inventory)throw Error('duplicate award');upd(2.9);const shown=[];
   for(const kind of expected){if(activeBoosterReward?.kind!==kind)throw Error('wrong reward');const old=level;upd(30);if(level!==old||st!=='spwin')throw Error('auto transition');shown.push(activeBoosterReward.kind);dismissBoosterReward();dismissBoosterReward();}
   if(level!==10||st!=='sp'||JSON.stringify(S.boosters)!==inventory)throw Error('transition or inventory');cases.push({name,shown,level});
  }
  prepareRewardTest(4,0,0,0);upd(2.9);if(activeBoosterReward||level!==5)throw Error('no award');
  newSpiral(7);activeBoosterInfo=null;const beforeLoss=JSON.stringify(S.boosters);lose(null,'test');upd(10);if(activeBoosterReward||JSON.stringify(S.boosters)!==beforeLoss)throw Error('loss');
  prepareRewardTest(100,0,4,0);upd(2.9);upd(.4);dismissBoosterReward();dismissBoosterReward();if(st!=='levels'||level!==100)throw Error('final level');
  prepareRewardTest(9,2,0,0);upd(2.9);upd(.4);return{cases,inventory:{...S.boosters},progress:{...S.progress.color}};
 });
 assert.equal(result.progress.level,10);assert.equal(result.inventory.volcano,1);
 // Reload after award: inventory stays granted once; saved progress already points forward.
 await page.reload();assert.deepEqual(await page.evaluate(()=>S.boosters),result.inventory);assert.equal(await page.evaluate(()=>S.progress.color.level),10);
 await page.evaluate(()=>{S.snd=0;S.boosterSeen={volcano:true,ice:true,electric:true};S.winChain={count:2,lastLevel:8};newSpiral(9);S.winChain={count:2,lastLevel:8};S.iceProgress=4;S.electricProgress=9;activeBoosterInfo=null;levelUp();upd(2.9);upd(.4)});
 await page.evaluate(()=>addEventListener("resize",()=>draw()));
 const shots=[];
 for(const [width,height,dark] of [[360,640,false],[360,640,true],[320,568,false],[640,360,true]]){
  await page.setViewportSize({width,height});await page.evaluate(dark=>{rs();dk=dark;draw()},dark);
  const file=path.join(os.tmpdir(),`bang-reward-${width}-${height}-${dark}.png`);await page.screenshot({path:file});shots.push(file);
 }
 // Real pointer events: a double click cannot skip the next reward or advance twice.
 await page.setViewportSize({width:360,height:640});const button=await page.evaluate(()=>{rs();const b=boosterInfoButton();const rect=cv.getBoundingClientRect();return{x:rect.left+(b.x+b.w/2)*rect.width/W,y:rect.top+(b.y+b.h/2)*rect.height/H}});
 await page.mouse.dblclick(button.x,button.y);assert.equal(await page.evaluate(()=>activeBoosterReward.kind),'ice');
 await page.evaluate(()=>{upd(.4);draw()});const iceFile=path.join(os.tmpdir(),'bang-reward-ice.png');await page.screenshot({path:iceFile});shots.push(iceFile);
 await page.mouse.click(button.x,button.y);await page.evaluate(()=>{upd(.4);draw()});assert.equal(await page.evaluate(()=>activeBoosterReward.kind),'electric');const electricFile=path.join(os.tmpdir(),'bang-reward-electric.png');await page.screenshot({path:electricFile});shots.push(electricFile);
 await page.mouse.dblclick(button.x,button.y);assert.equal(await page.evaluate(()=>level),10);assert.equal(await page.evaluate(()=>activeBoosterReward),null);
 assert.deepEqual(errors,[]);console.log(JSON.stringify({status:'PASS',...result,checks:'single/multiple/no reward/loss/final level/reload/double click, inventory once',screenshots:shots}));
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});

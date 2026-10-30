const {chromium}=require('playwright');
const assert=require('assert/strict'),path=require('path'),{pathToFileURL}=require('url');
(async()=>{const browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});try{
 const page=await browser.newPage();await page.addInitScript(()=>{requestAnimationFrame=()=>0;window.testSeed=42;Math.random=()=>((window.testSeed=(Math.imul(window.testSeed,1664525)+1013904223)>>>0)/4294967296)});await page.goto(pathToFileURL(path.join(__dirname,'index.html')).href);
 const result=await page.evaluate(()=>{
 S.snd=0;S.starterBoostersGranted=true;S.learn.drag=true;
 const original=eval('('+updOne.toString().replace(/const lb2=ch\[ch.length-1\];[\s\S]*?\ncloseLinkedChain/,`const lb2=ch[ch.length-1];if(!SPS[curI].branch){if(!lb2)ch.push({d:0,c:nextC(),g:0});else if(lb2.d>=SP)ch.push({d:lb2.d-SP,c:nextC(),g:0});}\ncloseLinkedChain`)+')');
 const targets=[14,39,44,46,49],out=[];let unaffected=0;
 function run(lv,lane,fn,seconds,step,progress){
  window.testSeed=42;newSpiral(lv);activeBoosterInfo=null;use(lane);Ltot=1e9;ch.length=0;ch.push({d:0,c:0,g:0});sq.length=0;lastC=-1;helpCd=1e9;rev=0;pc=progress;spt=20;curSpd=1;let seed=42;const savedRnd=Math.random;Math.random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
  try{for(let f=0;f<seconds/step;f++){const count=ch.length;fn(step);if(lv===14&&fn===updOne&&ch.length>count&&ch[ch.length-1].d!==0)throw Error("spawn entrance");}return{count:ch.length-1,front:ch[0].d,colors:ch.map(o=>o.c)}}finally{Math.random=savedRnd}
 }
 for(let lv=1;lv<=100;lv++){
  newSpiral(lv);const lanes=SPS.length;
  if(targets.includes(lv)){for(let lane=0;lane<lanes;lane++)for(const step of [1/60,1/120])for(const progress of [0,100]){
   const before=run(lv,lane,original,120,step,progress),after=run(lv,lane,updOne,120,step,progress);
   if(Math.abs(before.front-after.front)>1e-8)throw Error('movement '+lv);
   out.push({lv,lane,step,progress,before:before.count,after:after.count,ratio:after.count/before.count});
  }}else{
   for(let lane=0;lane<lanes;lane++){const before=run(lv,lane,original,2,1/60,0),after=run(lv,lane,updOne,2,1/60,0);if(JSON.stringify(before)!==JSON.stringify(after))throw Error('regression '+lv+' lane '+lane)}unaffected++;
  }
 }
 newSpiral(14);use(0);SPS[0].spawnCredit=.7;save(0);use(1);if(SPS[1].spawnCredit)throw Error('shared counter');newSpiral(14);if(SPS.some(l=>l.spawnCredit))throw Error('reset');
 activeBoosterInfo=null;lessonDrag=false;const snapshot=()=>JSON.stringify(SPS);iceRemaining=5;const beforeIce=snapshot();updSp(1);if(snapshot()!==beforeIce)throw Error('ice');
 use(0);rev=1;ch[0].d=Ltot*.8;const credit=SPS[0].spawnCredit;updOne(.01);if(SPS[0].spawnCredit!==credit)throw Error('reverse');
 const goals={36:250,40:300,42:300,45:250,46:350,50:200,53:250};for(const [lv,n]of Object.entries(goals))if(LVC[lv-1].goal!==n)throw Error('goal');if(LVC[25].flowBoost!==.3)throw Error('26 speed');
 return{out,unaffected};
 });
 for(const r of result.out)assert.ok(r.ratio>=.47&&r.ratio<=.53,JSON.stringify(r));assert.equal(result.unaffected,95);console.log(JSON.stringify({status:'PASS',...result}));
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});

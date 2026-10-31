const {chromium}=require('playwright');
const assert=require('assert/strict'),fs=require('fs'),path=require('path'),os=require('os'),{pathToFileURL}=require('url');
const baselineFile=path.join(os.tmpdir(),'bang-flow-before.json');
(async()=>{const browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});try{
 const page=await browser.newPage();await page.addInitScript(()=>{requestAnimationFrame=()=>0;window.testSeed=42;Math.random=()=>((window.testSeed=(Math.imul(window.testSeed,1664525)+1013904223)>>>0)/4294967296)});
 await page.goto(process.env.BANG_TEST_URL||pathToFileURL(path.join(__dirname,'index.html')).href);
 const results=[];
 for(const width of [320,390]){await page.setViewportSize({width,height:844});results.push(await page.evaluate((capture)=>{
  rs();S.snd=0;S.starterBoostersGranted=true;S.boosterSeen={volcano:true,ice:true,electric:true};S.learn.drag=true;
  const targets=[14,25,39,44,46,49,53],rows=[];
  const init=lv=>{window.testSeed=42;newSpiral(lv);activeBoosterInfo=null;lessonDrag=false;};
  const state=()=>JSON.parse(JSON.stringify(SPS));
  for(let lv=1;lv<=100;lv++){
   init(lv);const initial=state(),cfg={...CFG};for(let f=0;f<120;f++)updSp(1/60);const after=state();
   const speeds=[];
   if(lv<=25||targets.includes(lv))for(const fraction of [0,.24,.25,.49,.5,.74,.75,.99])for(const time of [0,7.99,8.99,9,20,60,160,240]){
    init(lv);pc=Math.floor(CFG.goal*fraction);spt=time;magicNext=1e9;
    SPS.forEach(l=>{l.ch=[{d:0,c:0,g:0}];l.helpCd=1e9});updSp(1/120);
    speeds.push(SPS.map(l=>l.ch[0].d*120));
   }
   rows.push({lv,cfg,initial,after,speeds});
  }
  if(capture)return{width:W,rows};
  const standard=eval('('+updOne.toString().replace(/const lb2=ch\[ch.length-1\];[\s\S]*?\ncloseLinkedChain/,`const lb2=ch[ch.length-1];if(!SPS[curI].branch){if(!lb2)ch.push({d:0,c:nextC(),g:0});else if(lb2.d>=SP)ch.push({d:lb2.d-SP,c:nextC(),g:0});}\ncloseLinkedChain`)+')');
  const production=[];
  for(const lv of [...targets,18,21,24,38]){
   init(lv);if(CFG.spawnRate||ENTRY_SPAWN_LEVELS.has(lv))throw Error('nonstandard production '+lv);
   const laneCount=SPS.length;
   for(let k=0;k<laneCount;k++)for(const step of [1/60,1/120]){
    const run=fn=>{init(lv);use(k);Ltot=1e9;helpCd=1e9;spt=20;curSpd=1;let born=0;
     for(let f=0;f<120/step;f++){const count=ch.length;fn(step);if(ch.length>count){born++;if(ch.length!==count+1)throw Error('burst');}for(let i=1;i<ch.length;i++)if(Math.abs(ch[i-1].d-ch[i].d-SP)>1e-7)throw Error('gap '+lv);}
     return{born,front:ch[0].d,ch,sq};};
    const expected=run(standard),actual=run(updOne);if(JSON.stringify(actual)!==JSON.stringify(expected))throw Error('standard mismatch '+lv);
    if(!actual.born)throw Error('no production');production.push({lv,lane:k,hz:Math.round(1/step),born:actual.born});
   }
  }
  if([38,43].some(i=>Math.abs(LVC[i].flowBoost/1.5-.8)>1e-12)||LVC[24].flowBoost!==1||LVC[52].flowBoost!==1.2||LVC[25].flowBoost!==.3)throw Error('final speed override');
  for(const lv of targets){init(lv);const before=JSON.stringify(SPS);iceRemaining=2;updSp(1);if(JSON.stringify(SPS)!==before)throw Error('ice');iceRemaining=0;paused=true;loop(performance.now());if(JSON.stringify(SPS)!==before)throw Error('pause');paused=false;
   init(lv);use(0);ch[0].d=Ltot*.8;rev=1;const n=ch.length,d=ch[0].d;updOne(.01);if(ch.length>n||ch[0].d>=d)throw Error('reverse');
  }
  const tempo=[];
  for(const lv of [18,21,24,25,39,44,53]){init(lv);const originalBoost=CFG.flowBoost,boost=originalBoost||1;let min=Infinity,max=0;
   // Cover full tempo cycles, early boost cutoff, capped time boost and every score step.
   for(const progress of Array.from({length:Math.ceil(CFG.goal/25)},(_,i)=>i*25).concat([CFG.goal-1]))for(const base of [0,8,56,160,240])for(let phase=0;phase<8;phase+=.25){
    const sample=flow=>{CFG.flowBoost=flow;pc=progress;spt=base+phase;magicNext=1e9;SPS.forEach(l=>{l.ch=[{d:0,c:0,g:0}];l.helpCd=1e9});updSp(1/120);return SPS.map(l=>l.ch[0].d*120);};
    const current=sample(boost),reference=sample(1);current.forEach((v,k)=>{if(!(v>0)||Math.abs(v/reference[k]-boost)>1e-8)throw Error('tempo scaling '+lv);min=Math.min(min,v);max=Math.max(max,v)});
   }if(originalBoost===undefined)delete CFG.flowBoost;else CFG.flowBoost=originalBoost;tempo.push({lv,min,max,maxPathFractionPerSecond:max/SPS[0].Ltot});
  }
  return{width:W,rows,production,tempo};
 },process.argv.includes('--capture')));}
 if(process.argv.includes('--capture')){fs.writeFileSync(baselineFile,JSON.stringify(results));console.log('Captured pre-change runtime measurements: '+baselineFile);return;}
 const baseline=process.argv.includes('--compare')?JSON.parse(fs.readFileSync(baselineFile,'utf8')):null;
 for(let w=0;w<results.length;w++)for(const row of results[w].rows){
  if(!baseline)continue;const before=baseline[w].rows[row.lv-1];
  if(![14,25,39,44,46,49,53].includes(row.lv)){assert.deepEqual(row,before,'unchanged level '+row.lv);continue;}
  const expectedCfg={...before.cfg};delete expectedCfg.spawnRate;if(row.lv===25)expectedCfg.flowBoost=1;if(row.lv===53)expectedCfg.flowBoost=1.2;assert.deepEqual(row.cfg,expectedCfg);
  row.initial.forEach((lane,k)=>{const old=before.initial[k];assert.deepEqual([lane.PX,lane.PY,lane.Ltot,lane.SP],[old.PX,old.PY,old.Ltot,old.SP]);assert.deepEqual([...lane.ch.map(b=>b.c),...lane.sq],[...old.ch.map(b=>b.c),...old.sq]);});
  const factor=row.lv===25?2/3:row.lv===53?.6:1;
  row.speeds.forEach((speeds,i)=>speeds.forEach((v,k)=>{assert.ok(v>0&&Math.abs(v/before.speeds[i][k]-factor)<1e-9,'speed '+row.lv);}));
 }
 const profile=results[1].rows.filter(r=>[18,21,24,25,53].includes(r.lv)).map(r=>({level:r.lv,flowBoost:r.cfg.flowBoost||1,length:r.initial.map(l=>l.Ltot),min:Math.min(...r.speeds.flat()),max:Math.max(...r.speeds.flat())}));
 console.log(JSON.stringify({status:'PASS',baselineCompared:!!baseline,unchangedLevels:baseline?93:null,profile,tempo:results[1].tempo,production:results.map(r=>({width:r.width,cases:r.production.length}))}));
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});

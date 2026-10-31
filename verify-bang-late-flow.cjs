const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
(async()=>{const source=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
 const baseline=source.replace('const FAST_FLOW_LEVELS=new Set([54,55,66,73,75,79,88,90,96,97]);\n','').replace('FAST_FLOW_LEVELS.has(number)?2:1.5','number>=50?2:1.5');assert.notEqual(source,baseline);
 const browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});try{
 const snapshots=[];
 for(const html of [baseline,source]){const p=await browser.newPage({viewport:{width:390,height:844}});await p.route('http://bang.test/index.html',r=>r.fulfill({contentType:'text/html',body:html}));await p.addInitScript(()=>{requestAnimationFrame=()=>0;window.testSeed=42;Math.random=()=>((window.testSeed=(Math.imul(window.testSeed,1664525)+1013904223)>>>0)/4294967296)});await p.goto('http://bang.test/index.html');snapshots.push(await p.evaluate(()=>{
  S.snd=0;S.starterBoostersGranted=true;S.boosterSeen={volcano:true,ice:true,electric:true};S.learn.drag=true;const rows=[];
  for(let lv=1;lv<=100;lv++){window.testSeed=42;newSpiral(lv);activeBoosterInfo=null;const cfg={...CFG},initial=JSON.stringify(SPS);for(let f=0;f<120;f++)updSp(1/60);const after=JSON.stringify(SPS),speed=[];
   for(const fraction of [0,.24,.25,.5,.75,.99])for(const time of [0,6,9,20,160,246]){newSpiral(lv);activeBoosterInfo=null;pc=Math.floor(CFG.goal*fraction);spt=time;magicNext=1e9;SPS.forEach(l=>{l.ch=[{d:0,c:0,g:0}];l.helpCd=1e9});updSp(1/120);speed.push(SPS.map(l=>l.ch[0]?.d*120||0));}
   rows.push({lv,cfg,initial,after,speed});
  }return rows;
 }));await p.close();}
 const fast=[54,55,66,73,75,79,88,90,96,97],changed=[],multi=[],keptFast=[];
 for(let i=0;i<100;i++){const old=snapshots[0][i],now=snapshots[1][i],single=(old.cfg.sources||old.cfg.n)===1,affected=now.lv>=50&&single&&!fast.includes(now.lv)&&now.lv!==53,ratio=affected?.75:1;
  const expected={...old.cfg};if(affected)expected.flowBoost*=.75;assert.deepEqual(now.cfg,expected,'config '+now.lv);assert.equal(now.initial,old.initial,'initial geometry/color/spacing '+now.lv);
  if(!affected)assert.equal(now.after,old.after,'runtime regression '+now.lv);
  now.speed.forEach((v,j)=>v.forEach((n,k)=>assert.ok(Math.abs(n-old.speed[j][k]*ratio)<1e-8,'movement '+now.lv)));
  if(affected){assert.equal(now.cfg.flowBoost,1.5);changed.push(now.lv);}if(now.lv>=50&&!single)multi.push(now.lv);if(fast.includes(now.lv)&&single){assert.equal(now.cfg.flowBoost,2);keptFast.push(now.lv);}
 }
 assert.equal(snapshots[1][24].cfg.flowBoost,1);assert.equal(snapshots[1][25].cfg.flowBoost,.3);assert.equal(snapshots[1][52].cfg.flowBoost,1.2);
 console.log(JSON.stringify({status:'PASS',changed,unchanged:100-changed.length,keptFast,multi,checks:'100 configs/initial states; unaffected runtime; all lanes at 36 progress/time samples; 25/26/53 overrides'}));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});

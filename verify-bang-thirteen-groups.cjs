const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const targets=[55,57,59,60,61,64,65,68,74,75,78,79,94],prob={2:.15,3:.15,4:.20,5:.25,6:.15,7:.10};
(async()=>{const source=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
 const baseline=source.replace(/for\(const number of \[55,57,59,60,61,64,65,68,74,75,78,79,94\]\)\{[^\n]+\}/,'');assert.notEqual(source,baseline);
 const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||undefined});try{const reports=[];
 for(const [version,html] of [baseline,source].entries()){const p=await browser.newPage({viewport:{width:390,height:844}});await p.route('http://bang.test/',r=>r.fulfill({body:html,contentType:'text/html'}));await p.addInitScript(()=>{requestAnimationFrame=()=>0;window.testSeed=42;Math.random=()=>((window.testSeed=(Math.imul(window.testSeed,1664525)+1013904223)>>>0)/4294967296)});await p.goto('http://bang.test/');
 reports.push(await p.evaluate(({targets,version})=>{S.snd=0;S.progress.colorAccess={highest:100,completed:false};S.starterBoostersGranted=true;S.boosterSeen={volcano:true,ice:true,electric:true};S.learn.drag=true;
 const init=lv=>{window.testSeed=42;newSpiral(lv);activeBoosterInfo=null;},rows=[];
 for(let lv=1;lv<=100;lv++){init(lv);const cfg={...CFG},geometry=JSON.stringify(SPS.map(l=>[l.PX,l.PY,l.SP,l.Ltot])),initial=JSON.stringify(SPS);for(let f=0;f<120;f++)updSp(1/60);const after=JSON.stringify(SPS);const row={lv,cfg,geometry,initial,after};
 if(targets.includes(lv)){
  init(lv);const lanes=SPS.length;row.groups=[];row.flow=[];
  for(let k=0;k<lanes;k++){
   init(lv);use(k);sq.length=0;pc=0;let previous=-1;const counts={};for(let g=0;g<10000;g++){const c=nextC(),n=sq.length+1;if(c===previous||c>=5)throw Error('color selection');previous=c;counts[n]=(counts[n]||0)+1;while(sq.length)if(nextC()!==c)throw Error('split group');}row.groups.push(counts);
   init(lv);use(k);Ltot=1e9;helpCd=1e9;pc=0;spt=20;curSpd=1;let born=0;for(let f=0;f<7200;f++){const n=ch.length;updOne(1/60);if(ch.length>n){if(ch.length!==n+1)throw Error('birth burst');born++;}for(let j=1;j<ch.length;j++)if(Math.abs(ch[j-1].d-ch[j].d-SP)>1e-7)throw Error('spacing');}row.flow.push({born,dist:ch[0].d});
  }
  // Initial first group includes any unfinished portion retained in the queue.
  if(version){const counts=Array.from({length:lanes},()=>({}));for(let sample=0;sample<2000;sample++){newSpiral(lv);SPS.forEach((l,k)=>{const seq=[...l.ch.map(o=>o.c),...l.sq];let n=0;while(seq[n]===seq[0]&&n<seq.length)n++;counts[k][n]=(counts[k][n]||0)+1;});}row.initialGroups=counts;}
  // Controlled long score stream; consumed balls leave the entrance clear.
  init(lv);SPS.forEach(l=>{l.ch=[];l.sq=[];l.lastC=-1});const rainbows=Array(lanes).fill(0);
  for(let score=1;score<=20000;score++){pc=score;for(let k=0;k<lanes;k++){use(k);const pending=sq.length,c=nextC();if(c===5){if(version&&pending)throw Error('rainbow split');rainbows[k]++;}save(k);}}row.rainbows=rainbows;
  if(version){if(Math.max(...rainbows)-Math.min(...rainbows)>1)throw Error('lane fairness');
   init(lv);use(0);sq.length=0;pc=10000;ch=[{d:SP*10,c:5,g:0},{d:SP*5,c:5,g:0}];if(nextC()===5)throw Error('rainbow cap');
   ch=[{d:SP,c:5,g:0}];sq.length=0;if(nextC()===5)throw Error('entry proximity');
   ch=[];sq.length=0;let previous=false;for(let i=0;i<100;i++){const rainbow=nextC()===5;if(rainbow&&previous)throw Error('backlog burst');previous=rainbow;}
  }
  // Preserve the existing near-atom rescue branch with entry generation blocked.
  init(lv);use(0);ch=[];for(let j=0;j<30;j++)ch.push({d:Ltot*.95-j*SP,c:Math.floor(j/3)%5,g:0});helpCd=0;pc=0;nextRb=1e9;updOne(0);row.rescue={count:ch.filter(o=>o.c===5).length,cooldown:helpCd};
 }
 rows.push(row);
 }return rows;},{targets,version}));await p.close();}
 const totals={continuous:{},initial:{}},frequency=[];let unchanged=0;
 for(let i=0;i<100;i++){const old=reports[0][i],now=reports[1][i];if(!targets.includes(now.lv)){assert.deepEqual(now,old,'other level '+now.lv);unchanged++;continue;}
  assert.deepEqual(now.cfg,{...old.cfg,groupRainbowBoost:1.2,wild:Math.round(old.cfg.wild/1.2)});assert.equal(now.geometry,old.geometry);assert.deepEqual(now.flow,old.flow);assert.deepEqual(now.rescue,old.rescue);assert.ok(now.rescue.count>0);
  for(const [kind,samples,data]of [['continuous',10000,now.groups],['initial',2000,now.initialGroups]])for(const counts of data)for(const [n,p]of Object.entries(prob)){assert.ok(Math.abs((counts[n]||0)/samples-p)<(samples===2000?.04:.02),now.lv+' '+kind+' '+n);totals[kind][n]=(totals[kind][n]||0)+(counts[n]||0);}
  const count=arr=>arr.reduce((a,b)=>a+b,0),ratio=count(now.rainbows)/count(old.rainbows);assert.ok(ratio>1.17&&ratio<1.23,'rainbow frequency '+now.lv+': '+ratio);frequency.push({level:now.lv,before:count(old.rainbows),after:count(now.rainbows),ratio,lanes:now.rainbows});
 }
 for(const counts of Object.values(totals)){const sum=Object.values(counts).reduce((a,b)=>a+b,0);for(const n in counts)counts[n]=+(100*counts[n]/sum).toFixed(2);}
 console.log(JSON.stringify({status:'PASS',unchanged,percentages:totals,frequency,checks:'initial/continuous colors; 120s spawn spacing and speed; two-lane fairness; entry cap/proximity/backlog; rescue preserved'}));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});

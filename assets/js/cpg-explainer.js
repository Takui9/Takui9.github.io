(() => {
  'use strict';
  const canvas = document.getElementById('cpg-canvas');
  const source = document.getElementById('cpg-explainer-data');
  if (!canvas || !source) return;
  const data = JSON.parse(source.textContent), scenes = data.scenes;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const $ = id => document.getElementById(id);
  const palette = { ink: '#192b42', muted: '#5f7085', blue: '#2459b5', pale: '#eaf0fa', amber: '#b47518', amberPale: '#fff3da', teal: '#167d80', tealPale: '#e5f4f1', line: '#d9e2ec', white: '#ffffff' };
  const trials = [.08, .65, .31];
  const models = new Map();
  let announcedScene = -1;
  const state = { time: 0, playing: false, scene: 0, trials: 3, context: 'payload', target: .6, manualTrials: false, manualTarget: false, last: 0 };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hardware = new Image(); hardware.src = '/assets/img/explainers/cpg-hardware.png';
  function text(value, x, y, size = 24, color = palette.ink, weight = 450, align = 'left') {
    ctx.fillStyle = color; ctx.font = `${weight} ${size}px Geist, system-ui, sans-serif`; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(value, x, y);
  }
  function line(x1, y1, x2, y2, color = palette.line, width = 3) { ctx.strokeStyle = color; ctx.lineWidth = width; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }
  function box(x, y, w, h, fill = palette.white, border = palette.line) { ctx.fillStyle = fill; ctx.strokeStyle = border; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(x, y, w, h, 14); ctx.fill(); ctx.stroke(); }
  function dot(x, y, radius, fill) { ctx.fillStyle = fill; ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill(); }
  function arrow(x1, y1, x2, y2, color = palette.muted) { line(x1, y1, x2, y2, color, 3); const a = Math.atan2(y2-y1, x2-x1); line(x2,y2,x2-12*Math.cos(a-.5),y2-12*Math.sin(a-.5),color,3);line(x2,y2,x2-12*Math.cos(a+.5),y2-12*Math.sin(a+.5),color,3); }
  function wrap(value, x, y, width, size = 23, color = palette.muted, leading = 34) {
    ctx.font = `450 ${size}px Geist, system-ui, sans-serif`; let row = '', offset = 0;
    String(value).split(/\s+/).forEach(word => { if (row && ctx.measureText(row+' '+word).width > width) { text(row,x,y+offset,size,color);offset+=leading;row=word; } else row += (row?' ':'')+word; });
    if (row) text(row,x,y+offset,size,color); return y+offset;
  }
  function robot(x, y, scale = 1, phase = 0, load = false, slope = 0) {
    ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);ctx.rotate(-slope);
    line(-150,100,165,100,palette.line,4);
    ctx.fillStyle = palette.blue;ctx.beginPath();ctx.roundRect(-105,-30,210,68,15);ctx.fill();
    if (load) { box(-55,-89,110,54,palette.amberPale,palette.amber);text('payload',0,-62,18,palette.amber,600,'center'); }
    const hips=[-75,75,-75,75];const offsets=[0,Math.PI,Math.PI,0];
    hips.forEach((hip,i)=>{const p=phase+offsets[i];const kneeX=hip+24*Math.sin(p), kneeY=57;const footX=hip+42*Math.sin(p), footY=100-22*Math.max(0,Math.cos(p));const color=i<2?palette.blue:'#7599cf';line(hip,18,kneeX,kneeY,color,11);line(kneeX,kneeY,footX,footY,color,10);dot(footX,footY,7,palette.teal);});
    ctx.restore();
  }
  function header(scene, index) {
    ctx.fillStyle = '#f8fafc';ctx.fillRect(0,0,1280,720);
    text('ONLINE CPG OPTIMIZATION',55,45,17,palette.blue,650);text(index===6?'HARDWARE · Separate experiments':'SCHEMATIC · Not experimental data',1100,45,15,palette.muted,500,'right');text(`0${index+1} / 08`,1225,45,18,palette.muted,500,'right');
    text(scene.title,55,100,37,palette.ink,600);
    const labels=scene.screen_text.split('\n');labels.forEach((v,i)=>text(v,55,151+i*31,23,palette.muted));
    line(55,670,1225,670,palette.line,2);
    text(index===6?'HARDWARE · Separate experiments':'SCHEMATIC · Not experimental data',55,699,15,palette.muted,500);
    const progress=Math.min(1,state.time/90);ctx.fillStyle=palette.blue;ctx.fillRect(55,668,1170*progress,4);
  }
  // Educational one-dimensional GP. The paper optimizes eight controller parameters.
  function objective(x) { return .38+.4*Math.sin(x*3.1)+.1*Math.cos(x*10); }
  function posterior(count) {
    if(models.has(count)) return models.get(count);
    const known=trials.slice(0,count), n=known.length;
    const kernel=(a,b)=>.08*Math.exp(-.5*Math.pow((a-b)/.18,2));
    const L=Array.from({length:n},()=>Array(n).fill(0));
    for(let i=0;i<n;i++) for(let j=0;j<=i;j++) {
      let value=kernel(known[i],known[j])+(i===j?.0015:0);
      for(let k=0;k<j;k++) value-=L[i][k]*L[j][k];
      L[i][j]=i===j?Math.sqrt(Math.max(value,1e-10)):value/L[j][j];
    }
    const lower=vector=>{const out=Array(n).fill(0);for(let i=0;i<n;i++){let v=vector[i];for(let j=0;j<i;j++)v-=L[i][j]*out[j];out[i]=v/L[i][i];}return out;};
    const y=lower(known.map(x=>objective(x)-.42)),alpha=Array(n).fill(0);
    for(let i=n-1;i>=0;i--){let v=y[i];for(let j=i+1;j<n;j++)v-=L[j][i]*alpha[j];alpha[i]=v/L[i][i];}
    const predict=x=>{const k=known.map(v=>kernel(x,v)),v=lower(k);return {mean:.42+k.reduce((sum,k,i)=>sum+k*alpha[i],0),uncertainty:Math.sqrt(Math.max(.0001,kernel(x,x)-v.reduce((sum,x)=>sum+x*x,0)))};};
    let next=.5,best=-Infinity;
    for(let i=0;i<=80;i++){const x=.015+.97*i/80;if(known.some(v=>Math.abs(v-x)<.035))continue;const p=predict(x),ucb=p.mean+1.6*p.uncertainty;if(ucb>best){best=ucb;next=x;}}
    const result={predict,next};models.set(count,result);return result;
  }
  while(trials.length<9) trials.push(posterior(trials.length).next);
  function searchDiagram(count, time) {
    const x0=110,y0=540,w=680,h=290;box(70,215,790,385);
    line(x0,y0,x0+w,y0,palette.muted,2);line(x0,y0,x0,y0-h,palette.muted,2);
    text('one-dimensional parameter slice',450,575,19,palette.muted,450,'center');text('score',110,235,18,palette.muted);
    const known=trials.slice(0,count);
    const gp=posterior(count);
    const model=x=>gp.predict(x).mean;
    const unc=x=>1.6*gp.predict(x).uncertainty;
    ctx.fillStyle='#f8e2b5';ctx.beginPath();for(let i=0;i<=100;i++){const x=i/100;const y=y0-(model(x)+unc(x))*h; i?ctx.lineTo(x0+x*w,y):ctx.moveTo(x0,y);}for(let i=100;i>=0;i--){const x=i/100;ctx.lineTo(x0+x*w,y0-(model(x)-unc(x))*h);}ctx.closePath();ctx.fill();
    ctx.strokeStyle=palette.amber;ctx.lineWidth=4;ctx.beginPath();for(let i=0;i<=100;i++){const x=i/100;const y=y0-model(x)*h;i?ctx.lineTo(x0+x*w,y):ctx.moveTo(x0,y);}ctx.stroke();
    known.forEach((v,i)=>{dot(x0+v*w,y0-objective(v)*h,7,palette.blue);text(String(i+1),x0+v*w,y0-objective(v)*h-19,15,palette.blue,600,'center');});
    if(count<trials.length){const v=trials[count];line(x0+v*w,260,x0+v*w,540,palette.teal,2);text('next trial',x0+v*w,245,16,palette.teal,500,'center');}
    box(905,225,310,96,palette.pale);text('1  Predict',930,257,24,palette.blue,600);text('Score + uncertainty',930,291,20,palette.muted);
    box(905,345,310,96,palette.tealPale);text('2  Test',930,377,24,palette.teal,600);text('Measure speed + energy',930,411,20,palette.muted);
    box(905,465,310,96,palette.amberPale);text('3  Update',930,497,24,palette.amber,600);text(`${count} observed trials`,930,531,20,palette.muted);
    text('Next trial: highest mean + 1.6 × uncertainty on the candidate grid',450,610,17,palette.muted,450,'center');
    text('1.5 s transition + 3 s evaluation per trial',640,642,21,palette.muted,450,'center');
  }
  function draw() {
    const index=Math.min(7,scenes.findLastIndex(s=>state.time>=s.start));state.scene=Math.max(0,index);const scene=scenes[state.scene],local=state.time-scene.start,phase=local*3;
    if(state.playing && state.scene===2 && !state.manualTrials) state.trials=Math.min(8,3+Math.floor(local/2.5));
    if(state.playing && state.scene===4 && !state.manualTarget) state.target=local<5.5?.6:.3;
    header(scene,state.scene);
    if(state.scene===0){
      ['Reduced friction','Incline','Added payload'].forEach((v,i)=>{const x=240+i*400;box(x-170,250,340,300);robot(x,370,.85,phase,i===2,i===1?.13:0);text(v,x,510,24,palette.ink,550,'center');});
      text('A useful gait setting depends on the operating conditions.',640,614,26,palette.muted,450,'center');
    } else if(state.scene===1){
      const names=['LF','RF','LH','RH'];const offsets=[0,Math.PI,Math.PI,0];
      names.forEach((v,i)=>{const x=150+(i%2)*180,y=290+Math.floor(i/2)*180;ctx.strokeStyle=palette.line;ctx.lineWidth=4;ctx.beginPath();ctx.arc(x,y,53,0,Math.PI*2);ctx.stroke();dot(x+53*Math.cos(phase+offsets[i]),y+53*Math.sin(phase+offsets[i]),10,palette.blue);text(v,x,y,24,palette.blue,600,'center');});
      arrow(425,370,535,370);robot(705,370,1.1,phase);arrow(875,370,955,370);box(985,310,230,130,palette.pale);text('Joint',1100,352,27,palette.blue,600,'center');text('commands',1100,392,27,palette.blue,600,'center');
      text('Coupled oscillators',240,580,24,palette.blue,550,'center');text('Foot trajectories',705,580,24,palette.blue,550,'center');text('Eight parameters shape the controller',640,630,21,palette.muted,450,'center');
    } else if(state.scene===2){searchDiagram(state.trials,local);
    } else if(state.scene===3){
      robot(250,395,.95,phase,state.context==='payload',state.context==='incline'?.15:0);
      text(state.context==='payload'?'Added payload':'Inclined treadmill',250,570,23,palette.ink,550,'center');
      box(510,250,290,115,state.context==='payload'?palette.tealPale:palette.white);text('Foot forces',535,285,25,palette.teal,600);text('Load-related proxy',535,327,20,palette.muted);
      box(510,400,290,115,state.context==='incline'?palette.tealPale:palette.white);text('Body pitch',535,435,25,palette.teal,600);text('Slope-related proxy',535,477,20,palette.muted);
      arrow(810,305,925,360,palette.teal);arrow(810,455,925,400,palette.teal);box(940,310,275,145,palette.amberPale);text('Contextual',1077,352,27,palette.amber,600,'center');text('optimizer',1077,397,27,palette.amber,600,'center');text('Measured proxies, not exact payload or slope values',640,627,22,palette.muted,450,'center');
    } else if(state.scene===4){
      const v=state.target;
      box(75,225,1130,70,palette.pale);text(`Desired velocity: ${v.toFixed(1)} m/s`,105,260,26,palette.blue,600);text('New command → recompute stored scores',1160,260,22,palette.muted,450,'right');
      [.23,.4,.58].forEach((velocity,i)=>{const x=90+i*400;box(x,335,340,235);text(`Trial ${i+1}`,x+25,370,24,palette.ink,600);text('Stored measurements',x+25,412,20,palette.muted);text('speed + energy',x+25,445,23,palette.blue);line(x+25,481,x+315,481);text('New score',x+25,520,20,palette.muted);ctx.fillStyle=palette.teal;ctx.fillRect(x+140,507,Math.max(18,150*Math.exp(-Math.pow((velocity-v)/.3,2))),25);});
      text('Measurements stay fixed. Their score changes with the command.',640,628,24,palette.muted,450,'center');
    } else if(state.scene===5){
      box(75,225,540,350,palette.tealPale);robot(340,365,.85,phase);arrow(290,472,290,275,palette.teal);text('Force feedback',345,530,28,palette.teal,600,'center');text('Loaded foot → oscillator timing',345,605,22,palette.muted,450,'center');
      box(665,225,540,350,palette.pale);robot(935,365,.85,phase,false,.08*Math.sin(local));ctx.strokeStyle=palette.blue;ctx.lineWidth=5;ctx.beginPath();ctx.arc(935,300,80,Math.PI*1.1,Math.PI*1.8);ctx.stroke();text('Virtual model control',935,530,28,palette.blue,600,'center');text('Body attitude → corrective torques',935,605,22,palette.muted,450,'center');
    } else if(state.scene===6){
      if(hardware.complete && hardware.naturalWidth){const ratio=Math.min(640/hardware.naturalWidth,430/hardware.naturalHeight);ctx.drawImage(hardware,60+(640-hardware.naturalWidth*ratio)/2,205+(430-hardware.naturalHeight*ratio)/2,hardware.naturalWidth*ratio,hardware.naturalHeight*ratio);}
      [['< 3 min','Initial flat-ground speed learning'],['10° incline','Separate slope experiment'],['+ 15 kg','Maximum demonstrated added load']].forEach((v,i)=>{const y=225+i*125;box(755,y,465,108,i===0?palette.pale:palette.white);text(v[0],780,y+36,31,palette.blue,600);text(v[1],780,y+78,20,palette.muted);});
      text('Unitree Go1 · Treadmill · Paper Figures 1, 4, 5',740,635,19,palette.muted);
    } else {
      [['Rhythmic structure',palette.pale,palette.blue],['Online optimizer',palette.amberPale,palette.amber],['Sensory feedback',palette.tealPale,palette.teal]].forEach((v,i)=>{box(75+i*405,235,350,115,v[1]);text(v[0],250+i*405,293,28,v[2],600,'center');if(i<2)text('+',452+i*405,293,34,palette.muted,400,'center');});
      text('A compact controller can adapt its parameter settings online.',640,430,29,palette.ink,550,'center');
      box(125,492,1030,105,palette.white);text('Scope: tested command, friction, slope and payload changes',640,526,23,palette.muted,450,'center');text('More rugged terrain and search safety remain open questions.',640,568,23,palette.muted,450,'center');
    }
  }
  function format(s){return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;}
  function sync(){
    $('cpg-play').textContent=state.playing?'Pause':'Play';$('cpg-play').setAttribute('aria-pressed',String(state.playing));
    $('cpg-timeline').value=state.time;
    const timeLabel=`${format(state.time)} / 1:30`;if($('cpg-time').textContent!==timeLabel)$('cpg-time').textContent=timeLabel;
    if(announcedScene!==state.scene){const scene=scenes[state.scene];$('cpg-scene-description').querySelector('strong').textContent=scene.title;$('cpg-scene-description').querySelector('span').textContent=scene.narration;announcedScene=state.scene;}
    document.querySelectorAll('[data-cpg-scene]').forEach((b,i)=>b.setAttribute('aria-current',String(i===state.scene)));
    $('cpg-trial').hidden=state.scene!==2;$('cpg-context-label').hidden=state.scene!==3;$('cpg-target').hidden=state.scene!==4;
    $('cpg-trial').disabled=state.trials>=trials.length;
    $('cpg-target').textContent=state.target===.6?'Change target: 0.6 → 0.3 m/s':'Change target: 0.3 → 0.6 m/s';
  }
  function setTime(value){state.time=Math.max(0,Math.min(90,Number(value)));draw();sync();}
  function pause(){state.playing=false;state.last=0;sync();}
  function go(index){pause();state.trials=3;state.target=.6;state.manualTrials=false;state.manualTarget=false;setTime(scenes[Math.max(0,Math.min(7,index))].start);}
  $('cpg-play').addEventListener('click',()=>{if(state.playing)pause();else{if(state.time>=90)setTime(0);state.playing=true;state.last=0;sync();}});
  $('cpg-prev').addEventListener('click',()=>go(state.scene-1));$('cpg-next').addEventListener('click',()=>go(state.scene+1));$('cpg-replay').addEventListener('click',()=>{go(state.scene);state.playing=true;sync();});
  $('cpg-timeline').addEventListener('input',event=>{pause();setTime(event.target.value);});
  document.querySelectorAll('[data-cpg-scene]').forEach(b=>b.addEventListener('click',()=>go(Number(b.dataset.cpgScene))));
  document.querySelectorAll('[data-cpg-explore]').forEach(b=>b.addEventListener('click',()=>{go(Number(b.dataset.cpgExplore));$('explore').scrollIntoView({behavior:reduced.matches?'auto':'smooth',block:'start'});}));
  $('cpg-trial').addEventListener('click',()=>{pause();state.manualTrials=true;state.trials=Math.min(trials.length,state.trials+1);draw();sync();});
  $('cpg-context').addEventListener('change',event=>{pause();state.context=event.target.value;draw();sync();});
  $('cpg-target').addEventListener('click',()=>{pause();state.manualTarget=true;state.target=state.target===.6?.3:.6;draw();sync();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
  reduced.addEventListener('change',()=>{if(reduced.matches)pause();});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)pause();},{threshold:.05}).observe(canvas);
  hardware.addEventListener('load',draw);
  function tick(now){if(state.playing){if(state.last){state.time=Math.min(90,state.time+Math.min(.1,(now-state.last)/1000));draw();if(state.time>=90)pause();sync();}state.last=now;}requestAnimationFrame(tick);}
  setTime(0);requestAnimationFrame(tick);
})();

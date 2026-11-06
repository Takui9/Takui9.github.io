#!/usr/bin/env node
/* Offline Canvas rendering of the same diagrams used by the interactive page.
 * This does not launch or control a browser. Requires @napi-rs/canvas externally.
 * node scripts/render_cpg_explainer.cjs --canvas-module /path/to/@napi-rs/canvas
 *   --font /path/to/Geist.ttf --ffmpeg /path/to/ffmpeg [--snapshots-only]
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
function arg(name, fallback) { const i=process.argv.indexOf(name);return i<0?fallback:process.argv[i+1]; }
const ROOT=path.resolve(__dirname,'..'),work=arg('--work','/tmp/zewei-cpg-render');
const {createCanvas,loadImage,GlobalFonts}=require(arg('--canvas-module','@napi-rs/canvas'));
GlobalFonts.registerFromPath(arg('--font','/tmp/zewei-explainer-models/Geist.ttf'),'Geist');
const data=JSON.parse(fs.readFileSync(path.join(ROOT,'_data/cpg_explainer.json'),'utf8'));
class Element {
 constructor(id=''){this.id=id;this.listeners={};this.attributes={};this.dataset={};this.value=0;this.hidden=false;this.textContent='';this.children={strong:new Leaf(),span:new Leaf()};}
 addEventListener(type,fn){this.listeners[type]=fn;}
 setAttribute(key,value){this.attributes[key]=value;}
 querySelector(key){return this.children[key];}
 scrollIntoView(){}
}
class Leaf {constructor(){this.value='';this.writes=0;}get textContent(){return this.value;}set textContent(value){this.value=value;this.writes++;}}
(async()=>{
 fs.mkdirSync(work,{recursive:true});
 const canvas=createCanvas(1280,720);canvas.addEventListener=()=>{};
 const photo=await loadImage(path.join(ROOT,'assets/img/explainers/cpg-hardware.png'));
 Object.defineProperty(photo,'src',{get:()=>'',set:()=>{}});
 Object.defineProperty(photo,'complete',{value:true});
 Object.defineProperty(photo,'naturalWidth',{value:photo.width});
 photo.addEventListener=(type,callback)=>{if(type==='load')callback();};
 const elements=new Map();
 const get=id=>{if(!elements.has(id))elements.set(id,new Element(id));return elements.get(id);};
 const source=get('cpg-explainer-data');source.textContent=JSON.stringify(data);
 const buttons=data.scenes.map((s,i)=>{const e=new Element();e.dataset.cpgScene=String(i);return e;});
 const explore=data.scenes.map((s,i)=>{const e=new Element();e.dataset.cpgExplore=String(i);return e;});
 const document={hidden:false,getElementById:id=>id==='cpg-canvas'?canvas:get(id),querySelectorAll:selector=>selector==='[data-cpg-scene]'?buttons:explore,addEventListener:()=>{}};
 const sandbox={document,window:{matchMedia:()=>({matches:true,addEventListener(){}})},Image:function(){return photo;},requestAnimationFrame(){},console};
 vm.createContext(sandbox);
 const original=fs.readFileSync(path.join(ROOT,'assets/js/cpg-explainer.js'),'utf8');
 const marker='  setTime(0);requestAnimationFrame(tick);';
 if(!original.includes(marker))throw new Error('Player rendering entry point changed; update offline renderer.');
 const instrumented=original.replace(marker,`  globalThis.inspectState=()=>({...state}); globalThis.renderFrame=(t)=>{state.time=t;state.manualTrials=false;state.manualTarget=false;state.playing=true;state.context=t%12<6?'payload':'incline';draw();state.playing=false;sync();};\n${marker}`);
 vm.runInContext(instrumented,sandbox);
 const render=t=>sandbox.renderFrame(t);
 // Exercise the actual page controls, beyond checking syntax or duplicating formulas.
 buttons[2].listeners.click();
 if(!get('cpg-scene-description').children.strong.textContent.includes('next trial'))throw new Error('Scene selection failed');
 get('cpg-trial').listeners.click();
 if(get('cpg-trial').hidden)throw new Error('Trial control visibility failed');
 buttons[3].listeners.click();get('cpg-context').listeners.change({target:{value:'incline'}});
 if(get('cpg-context-label').hidden)throw new Error('Context control failed');
 buttons[4].listeners.click();get('cpg-target').listeners.click();
 if(!get('cpg-target').textContent.includes('0.3 → 0.6'))throw new Error('Target change failed');
 render(27);const boBefore=sandbox.inspectState().trials;
 get('cpg-play').listeners.click();get('cpg-play').listeners.click();
 if(sandbox.inspectState().trials!==boBefore)throw new Error('Pausing changed visible BO trials');
 get('cpg-trial').listeners.click();if(sandbox.inspectState().trials!==boBefore+1)throw new Error('Next trial did not continue from visible state');
 render(52);if(sandbox.inspectState().target!==.3)throw new Error('Automatic target state was not retained');
 get('cpg-target').listeners.click();if(sandbox.inspectState().target!==.6)throw new Error('Target toggle did not continue from visible state');
 render(35);const captionWrites=get('cpg-scene-description').children.strong.writes;render(36);
 if(get('cpg-scene-description').children.strong.writes!==captionWrites)throw new Error('ARIA caption re-announced within a scene');
 console.log('Interactive controls passed: scene selection, BO trial, context, target data reuse, pause-state continuity and bounded ARIA announcements.');
 for(let i=0;i<data.scenes.length;i++){const s=data.scenes[i];render(s.start+s.duration*.55);fs.writeFileSync(path.join(work,`scene-${i+1}.png`),canvas.toBuffer('image/png'));}
 render(12.5);fs.writeFileSync(path.join(ROOT,'assets/img/explainers/cpg-poster.jpg'),canvas.toBuffer('image/jpeg'));
 if(process.argv.includes('--snapshots-only'))return;
 const ffmpeg=arg('--ffmpeg',process.env.FFMPEG||'ffmpeg');
 const base=path.join(work,'diagrams.mp4');
 const encoder=spawn(ffmpeg,['-hide_banner','-loglevel','error','-y','-f','rawvideo','-pix_fmt','rgba','-s','1280x720','-r','30','-i','pipe:0','-an','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p',base],{stdio:['pipe','inherit','inherit']});
 const finished=once(encoder,'close');
 for(let frame=0;frame<2700;frame++){
  render(frame/30);const pixels=canvas.getContext('2d').getImageData(0,0,1280,720).data;
  if(!encoder.stdin.write(Buffer.from(pixels.buffer,pixels.byteOffset,pixels.byteLength)))await once(encoder.stdin,'drain');
  if(frame%300===0)console.log(`Rendered ${frame/30} / 90 seconds`);
 }
 encoder.stdin.end();const [code]=await finished;if(code!==0)throw new Error(`Video encoder exited ${code}`);
 const output=path.join(ROOT,'assets/video/cpg-explainer.mp4');
 const mux=spawn(ffmpeg,['-hide_banner','-loglevel','error','-y','-i',base,'-stream_loop','-1','-i',path.join(ROOT,'assets/video/cpg-adaptation.mp4'),'-i',path.join(work,'narration.wav'),'-filter_complex',"[1:v]scale=600:450,setsar=1[hardware];[0:v][hardware]overlay=72:190:enable='gte(t,67)*lt(t,82)'[v];[2:a]loudnorm=I=-16:TP=-1.5:LRA=11[a]",'-map','[v]','-map','[a]','-t','90','-r','30','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-c:a','aac','-ar','48000','-b:a','160k','-movflags','+faststart',output],{stdio:['ignore','inherit','inherit']});
 const [muxCode]=await once(mux,'close');if(muxCode!==0)throw new Error(`Mux exited ${muxCode}`);
 console.log(`Created ${output}`);
})().catch(error=>{console.error(error);process.exitCode=1;});

/*THIS STORY IS BASED ON MY MIND LIKE I THINK HALF LIKE IT! */
/*T STANDS FOR TEXT, S STANDS FOR SOUND, M STANDS FOR MINUTES, SMS STANDS FOR MESSAGE
, EYES STANDS FOR EYES OPENING, STAGE STANDS FOR STAGE OF STORY, SND FOR SOUNDS*/
const night=[
    {m:0, t:"You checked the time. 2:58.\nNow it's 3:00.",stage:1},
    {m:0, t:"Everything you said today is replaying in your mind."},
 
    {m:2, s:"Teddy hums, then stops. You feel it is looking at you.",snd:"hum"},
 
    {m:4, t:"You hear some CRACKING noises, like a big creature is moving around.",snd:"steps"},
 
    {m:6, t:"You feel someone is watching you, and someone is breathing.",snd:"buzz"},
 
    {m:8, t:"Everything is now quiet, but you still feel afraid."},
 
    {m:13, t:"Everything is still quiet, but the door is opening slowly and making a weird sound.",snd:"buzz"},
 
    {m:15, t:"You think of yourself as an anime character in a horror movie."},
 
    {m:17, t:"You decide to investigate the noise and suddenly something terrible happens.",stage:2},
    {m:17, sms:"ghost detected!!",glitch:1},
 
    {m:19, t:"There was a creature on your legs! You shouted very loudly and it ran away..",eyes:1},
 
    {m:20, s:"MEOW.... MEOW..... MEOW.....",snd:"buzz"},
 
    {m:21, t:"You realized it was a cat, but you know this is not over."},
 
    {m:23, t:"You are now very scared and you decide to hide under the bed."},
 
    {m:25, t:"The door is fully open and you can see the shadow of a big creature coming...",snd:"creak",stage:3},
 
    {m:27, t:"You are extremely scared. You had your phone in your hand, so you called the police..",snd:"steps"},
 
    {m:28, t:"You realized that the big creature was your daddy, and he is asking why you shouted so loudly.",stage:0},
 
    {m:30, t:"You are very scared and you are crying, and you ask your daddy to hug you."},
 
    {m:32, t:"Your daddy offered to let you sleep with him, but you told him he can go to his room. You are coming in 5 minutes."},
 
    {m:35, t:"You heard many ghosts shouting, and this time it was a monster's voice and it was very scary."},
 
    {m:37, t:"This was extremely scary for 10 seconds. You are very scared and you are crying..."},
 
    {m:40, t:"Your phone rang!! It was your classmate Het! He said sorry and asked you to see his sms!",snd:"buzz"},
 
    {m:42, from:"Het", sms:"sorry!! i set an alarm of 3:00 am to prank you! i am very sorry!! i will never do this again!! please forgive me!!"},
 
    {m:46, t:"You forgive him because it's HALLOWEEN!!!"},
 
    {m:48, t:"NOW YOU ARE SAFE AND YOU CAN SLEEP PEACEFULLY!!"},
 
    {m:50, t:"YOU SLEPT"},
 
    {m:52, t:"YOUR CRUSH TEXTED YOU!!"},
 
    {m:54, from:"Your crush", sms:"I like you, will you be my boyfriend??"},
 
    {m:56, t:"YOU ARE VERY HAPPY AND YOU ACCEPTED!!"},
 
    {m:59, t:"You realized that it was a DREAM! You are a bit sad, but you want to sleep, and then.."},
    {m:59, s:"CRACK",snd:"creak",stage:3},
    {m:59, t:"YOU SHOUTED: NOT AGAIN!!!!!",end:1}
]
const $=id=>document.getElementById(id);

const clock=$('clock'),feed=$('feed');

let i=0,timer=null,typing=false,started=false,dead=false;
 
const parse=s=>s.split('~~').map((t,k)=>k%2?{t,x:1}:{t}).filter(o=>o.t);

const setClock=m=>clock.innerHTML='03<span class="c">:</span>'+String(m).padStart(2,'0');
 
function addEl(cls,html){

    const d=document.createElement('p');d.className=cls;d.innerHTML=html;
  d.style.setProperty('--r',(Math.random()*3-1.5).toFixed(2)+'deg');   
  d.style.setProperty('--x',(Math.random()*26-8).toFixed(0)+'px');
  feed.appendChild(d);
  [...feed.children].forEach((e,k,a)=>{if(k<a.length-1)e.classList.add('old')});

  while(feed.children.length>7)feed.firstChild.remove();
  return d;
}
 
function write(el,segs,done){
  typing=true;let si=0;
  (function seg(){

    if(si>=segs.length){typing=false;done&&done();return}

    const g=segs[si++],sp=document.createElement('span');el.appendChild(sp);let k=0;

    (function ch(){
      sp.textContent=g.t.slice(0,++k);
      if(k<g.t.length){const c=g.t[k-1];setTimeout(ch,(/[.,\n]/.test(c)?260:38)+Math.random()*55)}
      else if(g.x)setTimeout(()=>{sp.classList.add('x');setTimeout(seg,550)},500);   // cross it out
      else seg();
    })();
  })();
}
 
function next(){

    if(!started||i>=night.length)return;
  clearTimeout(timer);

  const n=night[i++];
  setClock(n.m);


  if(n.snd)sound(n.snd);

  if(n.stage!==undefined)document.body.dataset.stage=n.stage;

  if(n.eyes){const e=$('eyes');e.classList.remove('go');void e.offsetWidth;e.classList.add('go')}


  let el,text=n.t||n.sms||n.s;

  if(n.sms){
  el=addEl('sms','<small>'+(n.from||'Unknown')+'</small><span></span>');
  write(el.querySelector('span'),[{t:n.sms}]);
  if(n.glitch){
    document.body.classList.add('glitch');dead=true;
    setTimeout(()=>{document.body.classList.remove('glitch');document.body.classList.add('dead')},900);
  }
}


  else if(n.s){el=addEl('t snd','');write(el,[{t:'('+n.s+')'}])}
  
  else{el=addEl('t'+(n.end?' dread':''),'');write(el,parse(n.t))}
  
  if(n.end){$('hint').textContent='';setTimeout(finale,3200);return}
  timer=setTimeout(next,5200+text.length*50);
}
 
function finale(){

    const b=document.createElement('button');b.className='btn';b.textContent='close your eyes';
  b.onclick=e=>{

    e.stopPropagation();$('blk').classList.add('on');beat();
    setTimeout(()=>{$('bt').textContent='You can open them now.\nOr not.'},9000);
    setTimeout(()=>{$('red').classList.add('on');beat()},13000);
  };
  feed.appendChild(b);
}
 
$('go').onclick=()=>{$('ov').classList.add('off');started=true;setTimeout(next,1800);glitchLoop()};

addEventListener('pointerdown',e=>{if(started&&!typing&&e.target.tagName!=='BUTTON')next()});

addEventListener('keydown',e=>{if(started&&!typing&&(e.key===' '||e.key==='Enter')&&e.target.tagName!=='BUTTON'){e.preventDefault();next()}});
 

function glitchLoop(){
  
    setTimeout(()=>{
    if(!dead){const h=clock.innerHTML;clock.innerHTML='03<span class="c">:</span>33';setTimeout(()=>{if(!dead)clock.innerHTML=h},130)}
    glitchLoop();
  },14000+Math.random()*16000);
}
 
let ac,master,on=false;

function init(){
  ac=new (window.AudioContext||window.webkitAudioContext)();
  master=ac.createGain();master.gain.value=0;master.connect(ac.destination);

  const buf=ac.createBuffer(1,ac.sampleRate*3,ac.sampleRate),d=buf.getChannelData(0);let l=0;

  for(let k=0;k<d.length;k++){l=(l+.02*(Math.random()*2-1))/1.02;d[k]=l*3.5}
  const src=ac.createBufferSource();src.buffer=buf;src.loop=true;


  const lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=140;
  src.connect(lp);lp.connect(master);src.start();
}

function env(o,peak,dur){

    const g=ac.createGain(),t=ac.currentTime;g.gain.setValueAtTime(.0001,t);
  g.gain.exponentialRampToValueAtTime(peak,t+.04);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(g);g.connect(master);o.start();o.stop(t+dur+.05);
}

function tone(type,f,peak,dur,f2){const o=ac.createOscillator();o.type=type;o.frequency.value=f;if(f2)o.frequency.exponentialRampToValueAtTime(f2,ac.currentTime+dur);env(o,peak,dur)}

function sound(k){
  
    if(!on||!ac)return;
  
    if(k==='creak')tone('sawtooth',110,.18,1.4,52);
  
    if(k==='hum')tone('sine',50,.15,2.2);
  
    if(k==='steps')[0,700,1400].forEach(t=>setTimeout(()=>tone('sine',62,.8,.22),t));
  
    if(k==='buzz'){tone('square',150,.1,.35);setTimeout(()=>tone('square',150,.1,.35),500)}
}

function beat(){if(on&&ac)[0,280].forEach(t=>setTimeout(()=>tone('sine',55,.7,.25),t))}
$('sb').onclick=e=>{

    e.stopPropagation();

    try{if(!ac)init();if(ac.state==='suspended')ac.resume()}catch(x){return}
  on=!on;master.gain.value=on?.35:0;e.target.textContent='sound: '+(on?'on':'off');e.target.setAttribute('aria-pressed',on);
};


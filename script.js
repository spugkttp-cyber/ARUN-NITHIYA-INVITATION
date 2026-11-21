// Arun & Nithiya wedding invitation interactions
const weddingDate = new Date("2026-12-13T07:30:00+05:30").getTime();
function updateCountdown(){
  const now=Date.now(), diff=weddingDate-now;
  if(diff<=0){["days","hours","minutes","seconds"].forEach(id=>document.getElementById(id).textContent="00");return;}
  const values={days:Math.floor(diff/86400000),hours:Math.floor(diff%86400000/3600000),minutes:Math.floor(diff%3600000/60000),seconds:Math.floor(diff%60000/1000)};
  Object.entries(values).forEach(([id,value])=>document.getElementById(id).textContent=String(value).padStart(2,"0"));
}
updateCountdown();setInterval(updateCountdown,1000);

// English / Tamil language switch
const langButtons=document.querySelectorAll(".lang");
function setLanguage(lang){
  document.documentElement.lang=lang;
  document.body.classList.toggle("tamil",lang==="ta");
  document.querySelectorAll("[data-en][data-ta]").forEach(el=>{el.innerHTML=el.dataset[lang];});
  langButtons.forEach(btn=>btn.classList.toggle("active",btn.dataset.lang===lang));
}
langButtons.forEach(btn=>btn.addEventListener("click",()=>setLanguage(btn.dataset.lang)));

// Original gentle bell-like ambient loop, generated in the browser.
// Browsers require a user gesture before audio can start.
let audioContext=null, musicTimer=null, musicOn=false, noteIndex=0;
const notes=[523.25,659.25,783.99,659.25,587.33,698.46,880,698.46];
function playNote(){
  if(!audioContext||!musicOn)return;
  const now=audioContext.currentTime, freq=notes[noteIndex%notes.length]; noteIndex++;
  const osc=audioContext.createOscillator(), gain=audioContext.createGain();
  osc.type="sine";osc.frequency.setValueAtTime(freq,now);
  gain.gain.setValueAtTime(0.0001,now);gain.gain.exponentialRampToValueAtTime(0.045,now+0.08);gain.gain.exponentialRampToValueAtTime(0.0001,now+1.7);
  osc.connect(gain);gain.connect(audioContext.destination);osc.start(now);osc.stop(now+1.8);
}
const musicButton=document.getElementById("musicToggle");
musicButton.addEventListener("click",async()=>{
  if(!audioContext)audioContext=new(window.AudioContext||window.webkitAudioContext)();
  if(audioContext.state==="suspended")await audioContext.resume();
  musicOn=!musicOn;
  if(musicOn){playNote();musicTimer=setInterval(playNote,650);musicButton.innerHTML="♫ <span>Pause music</span>";musicButton.setAttribute("aria-label","Pause background music");}
  else{clearInterval(musicTimer);musicButton.innerHTML="♫ <span>Play music</span>";musicButton.setAttribute("aria-label","Play background music");}
});

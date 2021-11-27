const timer=document.getElementById('timer');
const start=document.getElementById('start');
const stop=document.getElementById('stop');
const reset=document.getElementById('reset');

let startTime;
let timeoutid;
let elapsedTime=0;


function countUp(){
    const d=new Date(Date.now() - startTime + elapsedTime);
    const m=String(d.getMinutes()).padStart(2,"0");
    const s=String(d.getSeconds()).padStart(2,"0");
    const ms=String(d.getMilliseconds()).slice(0,1);
    timer.textContent=`${m}:${s}:${ms}`;
    
    timeoutid=setTimeout(()=>{
        countUp();
    },10);
}


function setButtonStateInitial(){
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
}

function setButtonStateRunning(){
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
}

function setButtonStateStopped(){
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
}

setButtonStateInitial();

start.addEventListener('click',()=>{
    if(start.classList.contains('inactive')===true){
        return;
    }
    
    setButtonStateRunning();
    startTime=Date.now();
    countUp();
});

stop.addEventListener('click',()=>{
    if(stop.classList.contains('inactive')===true){
        return;
    }
    
    setButtonStateStopped();
    clearTimeout(timeoutid);
    elapsedTime += Date.now() -startTime;
});

reset.addEventListener('click', ()=>{
    if(reset.classList.contains('inactive')===true){
        return;
    }
    
    setButtonStateInitial()
    timer.textContent='00:00:0';
    elapsedTime=0;
});

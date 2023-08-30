const timer = document.querySelector('.timer');
const title = document.querySelector('.title');
const startBtn = document.querySelector('.startBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const resumeBtn = document.querySelector('.resumeBtn');
const resetBtn = document.querySelector('.resetBtn');

const WORK_TIME = 25*60;
const BREAK_TIME = 5*60;

//Function  to countDown
const countDown = (time) =>{

    return() =>{

        timer.textContent = time;
        time--;

        if(time<0){

            stoptimer();
        }
    }
   
}

// Arrow function to start timer...
const startTimer = (startTime)=> {

    setInterval(countDown(startTime), 1000);
}

// Adding EventListner to start button
startBtn.addEventListener('click', ()=>{

    startTimer();
})
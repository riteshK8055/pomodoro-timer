const timer = document.querySelector('.timer');
const title = document.querySelector('.title');
const startBtn = document.querySelector('.startBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const resumeBtn = document.querySelector('.resumeBtn');
const resetBtn = document.querySelector('.resetBtn');

const WORK_TIME = 25*60;
const BREAK_TIME = 5*60;

let timerID = null;

//Function  to countDown
const countDown = (time) =>{

    return() =>{

        timer.textContent = time;
        time--;

        if(time<0){

            stopTimer();
        }
    }
   
}

// Arrow function to start timer...
const startTimer = (startTime)=> {

    timerID = setInterval(countDown(startTime), 1000);
}

// Arrow function to stop timer

const stopTimer = () =>{

    clearInterval(timerID);
    timerID = null;0
}

// Adding EventListner to start button
startBtn.addEventListener('click', ()=>{

    startTimer();
})
const timer = document.querySelector('.timer');
const title = document.querySelector('.title');
const startBtn = document.querySelector('.startBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const resumeBtn = document.querySelector('.resumeBtn');
const resetBtn = document.querySelector('.resetBtn');

const WORK_TIME = 1*60;
const BREAK_TIME = 0.5*60;

let timerID = null;
let oneRoundCompleted = false;
let totalCount;

//function to update  title
const updateTitle = (msg) =>{

    title.textContent = msg;
}

//Function  to countDown
const countDown = (time) =>{

    return() =>{

        timer.textContent = time;
        time--;

        if(time<0){

            stopTimer();
            timerID = startTimer;
             if(!oneRoundCompleted){

                 timerID = startTimer(BREAK_TIME);
                 oneRoundCompleted = true;
                 updateTitle("It's Break Time");
            }

            else{

                updateTitle("Competed 1 Round of Pomodoro technique!");

                setTimeout(() => updateTitle("Start timer again"),2000);
                totalCount++;
                console.log(totalCount);
            }
        }
    }
   
}

// Arrow function to start timer...
const startTimer = (startTime)=> {

    if(timerID !== null){

        stopTimer();
        //timerID = startTimer(BREAK_TIME);
    }
    return setInterval(countDown(startTime),1000);
}

// Arrow function to stop timer

const stopTimer = () =>{

    clearInterval(timerID);
    timerID = null;
}

// Adding EventListner to start button
startBtn.addEventListener('click', ()=>{

   timerID =  startTimer(WORK_TIME);
   updateTitle("It's Work Time");
});
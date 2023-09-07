const timer = document.querySelector('.timer');
const title = document.querySelector('.title');
const startBtn = document.querySelector('.startBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const resumeBtn = document.querySelector('.ResumeBtn');
const resetBtn = document.querySelector('.ResetBtn');
const pomoCountDisplay = document.querySelector(".pomoCountDisplay");

const WORK_TIME = 25*60;
const BREAK_TIME = 5*60;

let timerID = null;
let oneRoundCompleted = false;
let totalCount=0;
let paused = false;

//function to update  title
const updateTitle = (msg) =>{

    title.textContent = msg;
}


//Function to save pomodoro counts to local Storage
const saveLocalCounts = () =>{

    let counts = JSON.parse(localStorage.getItem("pomoCounts"));

    counts !== null ? counts++ : counts =1;

    localStorage.setItem("pomoCounts" , JSON.stringify(counts));

}

//Function  to countDown
const countDown = (time) =>{

    return() =>{

        const mins = Math.floor(time/60);
        const secs = Math.floor(time%60);
        timer.textContent = `${mins}:${secs}`;
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
                saveLocalCounts();
                showPomoCounts();
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

// function to get time is seconds
const getTimeInSeconds = (timeString) =>{

    const[minutes,seconds] = timeString.split(":");
    return minutes*60 + parseInt(seconds);

}
// Adding EventListner to start button
startBtn.addEventListener('click', ()=>{

   timerID =  startTimer(WORK_TIME);
   updateTitle("It's Work Time");
});


//Adding eventListner to reset button
resetBtn.addEventListener('click',()=>{

    stopTimer();
    timer.textContent = "25:00";
    updateTitle("Click start to start timer");

});

//Adding eventListner to pause button
pauseBtn.addEventListener('click',()=>{

    stopTimer();
    paused =true;
    updateTitle("Timer Paused");

});


//Adding eventListner to resume button
resumeBtn.addEventListener('click',()=>{

    if(paused){

        const currentTime = getTimeInSeconds(timer.textContent);
        timerID = startTimer(currentTime);
        paused = false;

        (!oneRoundCompleted) ? updateTitle("It's Work Time") :updateTitle("it's Break time");
    }

});



// Function to show pomodoros to screen from local storage
const showPomoCounts = () =>{

    const counts =JSON.parse(localStorage.getItem("pomoCounts"));
    if(counts > 0 ){

        pomoCountDisplay.style.display = "flex";
    }
    pomoCountDisplay.firstElementChild.textContent = counts;
}

showPomoCounts();
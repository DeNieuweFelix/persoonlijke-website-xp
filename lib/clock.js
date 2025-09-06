const clockDisplay = document.getElementById("bottomClock");

//update the clock display
function updateClock(){
    const newData = new Date();

    const timeData = {
        hours: (newData.getHours()),
        minutes: (newData.getMinutes())
    };

    if(timeData.hours < 10){
        timeData.hours = "0" + timeData.hours;
    }
    if(timeData.minutes < 10){
        timeData.minutes = "0" + timeData.minutes;
    }
    
    const time = timeData.hours + ":" + timeData.minutes;
    console.log(time);
    clockDisplay.innerHTML = time;
}

updateClock();

//start interval for clock :3
setInterval(updateClock, 5000);
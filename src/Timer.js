import React from 'react';
import {useState, useEffect} from 'react';

function Timer({startTime}){
    const [elapsed, setElapsed] = useState(millisToMinutesAndSeconds(0));
    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (
            seconds == 60 ?
            (minutes+1) + ":00" :
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds
          );
    }
    function updateTime(){
        if(startTime){
            setElapsed(millisToMinutesAndSeconds(Date.now()-startTime));
        }
    }
    useEffect(() =>{
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    });

    return(
        <div id="timer">
            {elapsed}
        </div>
    )
}

export default Timer;
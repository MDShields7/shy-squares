import React, { useEffect, useState } from 'react';
import gamebartop from '../../styles/gamebartop.module.css'

export default function GameBarTop ({children}) {
    // const [start, setStart] = useState(children[1]);
    // const [timer, setTimer] = useState(0);
    const level = children[0];
    const gameStart = children[2];
    const gameWin = children[2];
    const par = children[4];
    // console.log('gamebartop, children[1]:', children[1])
    let start;
    let now;

    // let start = children[1] === 0 ? 0 : children[1];
    // const funcList = new Set();
    // const calcTime = () => {
    // setTimer((now - start) / 1000);
    // }
    // funcList.add(calcTime)
    // console.log('start', start)
    
    const calculateTimePassed = () => {
        if ( children[1] === 0 ){
            return 0;
        } else {
            start = children[1];
        }
        now = +new Date();
        let difference =  now - start;
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60),
              milliseconds: Math.floor((difference))
          };
        }
        console.log('timeLeft', timeLeft)
        return timeLeft;
    }
    const [timePassed, setTimePassed] = useState(calculateTimePassed());
    let timerAmount = 'TIME:';
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimePassed(calculateTimePassed());
        }, 1000);
        Object.keys(timePassed).forEach((interval) => {
            if (!timePassed[interval]) {
                return;
            }
            // console.log('timePassed[interval]',timePassed[interval])
            timerAmount = timerAmount.concat( timePassed[interval]+":")
            console.log('in effect, timerAmount',timerAmount)
        })
        return () => clearTimeout(timer);
    });
    // timer = timePassed;

    if ( !gameStart) {
        // setTimer(startTime);
    } else if ( gameStart ){
        now = new Date();
        now = now.getTime();
        // let starter = start.getTime()
        // setStart(starter)
        // setInterval(calcTime, 1000)
    } else if ( gameStart && gameWin ){

    }
    // console.log()
    // console.log('gamebartop, funcList.size:', funcList.size)
    console.log('gamebartop,timerAmount:', timerAmount)
    // console.log('gamebartop, start:', start)
    // console.log('gamebartop, now:', now)
    // console.log('gamebartop, now-start', (now-start)/1000)
    return (
        <div>
            <div className={`${gamebartop.row} ${gamebartop.gamebar}`}>
                <h1 className={`${gamebartop.timeItem}`}>
                    Level {level}
                </h1>
                <h2 className={`${gamebartop.timeItem} ${gamebartop.timer}`}>
                    {timerAmount ?  timerAmount : '00:00:00'}
                </h2>
                <h2 className={`${gamebartop.timeItem} ${gamebartop.par}`}>
                    Par : {par} {par !== 1 ? 'seconds' : 'second'}
                </h2>
            </div>
        </div>
    )
}
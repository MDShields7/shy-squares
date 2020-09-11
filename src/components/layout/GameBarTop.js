import React, { useState } from 'react';
import gamebartop from '../../styles/gamebartop.module.css'

export default function GameBarTop ({children}) {
    // const [start, setStart] = useState(children[1]);
    const [timer, setTimer] = useState(0);
    const level = children[0];
    const gameStart = children[2];
    const gameWin = children[2];
    const par = children[4];
    let now;
    console.log('gamebartop, children[1]:', children[1])
    let start = children[1] === 0 ? 0 : children[1];
    const calcTime = () => {
        setTimer((now - start) / 1000);
    }
    console.log('start', start)
    if ( !gameStart) {
        // setTimer(startTime);
    } else if ( gameStart ){
        now = new Date();
        now = now.getTime();
        // let starter = start.getTime()
        // setStart(starter)
        setInterval(calcTime, 100)
    } else if ( gameStart && gameWin ){

    }
    // console.log()
    console.log('gamebartop, start:', start)
    console.log('gamebartop, now:', now)
    console.log('gamebartop, now-start', (now-start)/1000)
    return (
        <div>
            <div className={`${gamebartop.row} ${gamebartop.gamebar}`}>
                <h1 className={`${gamebartop.timeItem}`}>
                    Level {level}
                </h1>
                <h2 className={`${gamebartop.timeItem} ${gamebartop.timer}`}>
                    {timer}
                </h2>
                <h2 className={`${gamebartop.timeItem} ${gamebartop.par}`}>
                    Par : {par} {par !== 1 ? 'seconds' : 'second'}
                </h2>
            </div>
        </div>
    )
}
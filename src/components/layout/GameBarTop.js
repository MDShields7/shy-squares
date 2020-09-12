import React, { useEffect, useState } from 'react';
import Timer from './Timer'
import gamebartop from '../../styles/gamebartop.module.css'

export default function GameBarTop ({children}) {
    const level = children[0];
    const finalTime = children[2]
    const gameStart = children[3];
    const gameWin = children[4];
    const par = children[5];
    const gameLose = children[6];

    // if ( !gameStart) {
    //     // setTimer(startTime);
    // } else if ( gameStart ){
    //     now = new Date();
    //     now = now.getTime();
    // }

    // console.log('gamebartop, gameStart:', gameStart)
    // console.log('gamebartop,timerAmount:', timerAmount)
    // console.log('gamebartop, startTime:', startTime)
    // console.log('gamebartop, now:', now)
    // console.log('gamebartop, now-start', (now-start)/1000)
    return (
        <div>
            <div className={`${gamebartop.row} ${gamebartop.gamebar}`}>
                <h1 className={`${gamebartop.timeItem}`}>
                    Level {level}
                </h1>
                <h2 className={`${gamebartop.timeItem} ${gamebartop.timer}`}>
                    {/* {timerAmount ?  timer Amount : '00:00:00'} */}
                    <Timer gameStart={gameStart} finalTime={finalTime} gameLose={gameLose}/>
                    {    console.log('gamebartop, gameStart:', gameStart)}
                </h2>
                <h2 className={`${gamebartop.timeItem} ${gamebartop.par}`}>
                    Par : {par} {par !== 1 ? 'seconds' : 'second'}
                </h2>
            </div>
        </div>
    )
}
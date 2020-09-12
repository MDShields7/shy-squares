import React, { useState } from 'react';
import Link from 'next/link'
import withContext from '../contextAPI/ContextWrapper';
import Site from './Site'
// import Gamebox from './GameBox';
import GameBarTop from './GameBarTop';
import levelcss from '../../styles/level.module.css';
import makeSquareArr from '../lib/makeSquareArr';

function Level ({ children }){
    // Top bar
    const level = children[0];
    const par = children[2];
    const [startTime, setStartTime] = useState(false);
    const [finalTime, setFinalTime] = useState(undefined);
    // Game box
    const [mapOrig, setMapOrig] = useState(children[1] || []);
    // Bottom bar 
    const [tutorial, setTutorial] = useState(true);
    const [gameStart, setGameStart] = useState(false);
    const [gameStartFault, setGameStartFault] = useState(false);
    const [gameWin, setGameWin] = useState(false); 
    const [gameLose, setGameLose] = useState(false);
    const hrefNext='/level/'+(level+1)
    const totalSquares = mapOrig.size;
    const totalSquaresAcross = Math.sqrt(totalSquares);
    const squareWidth = 600 / totalSquaresAcross;
    
    let gamebox;
    let progressBtn;
    const gameStarter = () => {
        setGameStart(true);
        setStartTime( Date.now() );
    }
    // const stopTimer = () => {
    //    stopTime = new Date();
    // }
    const loseGame = () => {
        setGameLose(true);
        setFinalTime(undefined);
    }
    const resetTutorial = () => {
        setGameStart(false);
        setGameLose(false);
        setGameStartFault(false);
        setTutorial(true);
    }
    if ( tutorial ) {
        gamebox = <img src="/shokiri-sumo.gif" />;
        progressBtn = <button className='button' onClick={() => setTutorial(false)}>Next</button>;
    } else if ( !tutorial && !gameStart ){
        const sqArrResults = makeSquareArr( 'pre-start', squareWidth, mapOrig, checkGameMap, loseGame );
        [ gamebox ] = sqArrResults;
        if ( gameStartFault ){
            progressBtn = <button className='button' >Start</button>
        } else {
        progressBtn = <button className='button' onClick={() => gameStarter()} >Start</button>
        }
    } else if ( !tutorial && gameStart && !gameLose && !gameWin ){
        const sqArrResults = makeSquareArr( 'start', squareWidth, mapOrig, checkGameMap, loseGame );
        [ gamebox ] = sqArrResults;
        const [ hoverMap , mapClick ] = sqArrResults;
        progressBtn = <div>nothing to show now</div>
    } else if ( !tutorial && gameStart && gameLose ){
        gamebox = <div>You Lost!</div>
        progressBtn = <button className='button' ><a onClick={() => resetTutorial()}
        >Restart</a></button>
    } else if ( gameWin === true ){
        gamebox = <div>You win!</div>
        progressBtn = <button className='button' ><Link href={hrefNext}><a >Next level</a></Link></button>
    } 
    function calcTime (endTime) {
        let myTime = endTime - startTime
        setFinalTime(myTime);
    }
    
    function checkGameMap (mapHover, mapClick) {
        // check scoring arrays for game over
        if ( mapHover.size === 0 && mapClick.size === 0 ){
            setGameWin(true);
            let end =  Date.now()
            calcTime(end);
            // setTimer( stopTimer() )
            console.log('you win')
        }
        console.log('mapHover.size', mapHover.size)
        console.log('mapClick.size', mapClick.size)
    }
    
    // console.log('outside calcTime, finalTime', finalTime)
    return (
        <Site>
            <GameBarTop>
                {[level, startTime, finalTime, gameStart, gameWin, par, gameLose]}
            </GameBarTop>
            <div className={levelcss.gameContainer} onMouseEnter={ !tutorial && !gameStart ? () => setGameStartFault(true) : null} onMouseLeave={ !tutorial && !gameStart ? () => setGameStartFault(false) : null} >
                {gamebox}
            </div>
            <div className={`${levelcss.row} ${levelcss.level}`}>
                { progressBtn }
            </div>
        </Site>
    )
}

export default withContext(Level);
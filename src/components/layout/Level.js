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
    const [timer, setTimer] = useState(0);
    // Game box
    const [mapOrig, setMapOrig] = useState(children[1] || []);
    // Bottom bar 
    const [tutorial, setTutorial] = useState(true);
    const [gameStart, setGameStart] = useState(false);
    const [gameStartFault, setGameStartFault] = useState(false);
    const [gameFault, setGameFault] = useState(false);
    const [gameWin, setGameWin] = useState(false);
    const [gameLose, setGameLose] = useState(false);
    const hrefAgain='/level/'+level;
    const hrefNext='/level/'+(level+1)

    const totalSquares = mapOrig.size;
    const totalSquaresAcross = Math.sqrt(totalSquares);
    const squareWidth = 600 / totalSquaresAcross;
    let gamebox;
    let progressBtn;
    if ( tutorial ) {
        gamebox = <img src="/shokiri-sumo.gif" />;
        progressBtn = <button className='button' onClick={() => setTutorial(false)}>Next</button>;
    } else if ( !tutorial && !gameStart ){
        const sqArrResults = makeSquareArr( 'pre-start', squareWidth, mapOrig, checkGameMap );
        [ gamebox ] = sqArrResults;
        if ( gameStartFault ){
            progressBtn = <button className='button' >Start</button>
        } else {
        progressBtn = <button className='button' onClick={() => setGameStart(true)}
        >Start</button>
        }
    } else if ( !tutorial && gameStart && !gameWin ){
        const sqArrResults = makeSquareArr( 'start', squareWidth, mapOrig, checkGameMap );
        [ gamebox ] = sqArrResults;
        console.log('hi', gamebox)
        const [ hoverMap , mapClick ] = sqArrResults;
        progressBtn = <div>nothing to show now</div>
    } else if ( gameWin === true ){
        gamebox = <div>You win!</div>
        progressBtn = <button className='button' ><Link href={hrefNext}><a >Next level</a></Link></button>
    } else if ( gameFault || gameLose ){
        gamebox = <div>You lost</div>
        progressBtn = <button className='button' ><Link href={hrefAgain}><a >Try Again</a></Link></button>
    }

    function checkGameMap (mapHover, mapClick) {
        // check scoring arrays for game over
        if ( mapHover.size === 0 && mapClick.size === 0 ){
            setGameWin(true);
            console.log('you win')
        }
        console.log('mapHover.size', mapHover.size)
        console.log('mapClick.size', mapClick.size)
    }

    console.log('gamebox',gamebox)
    // console.log('tutorial:',tutorial, ', gameStart:',gameStart, ', gameWin', gameWin)
    return (
        <Site>
            <GameBarTop>
                {[level, timer, par]}
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
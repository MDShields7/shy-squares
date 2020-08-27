import React, { useState } from 'react';
import withContext from '../contextAPI/ContextWrapper';
import Site from './Site'
import Gamebox from './GameBox';
import GameBarTop from './GameBarTop';
import levelcss from '../../styles/level.module.css';
// import GameBarBot from './GameBarBot';

function Level ({ children }){
    // Top bar
    const [level, setLevel] = useState(children[0]);
    const [timer, setTimer] = useState(0);
    const [par, setPar] = useState(1);
    // Game box
    const [arrayOrig, setArrayOrig] = useState(children[1] || []);
    const [arrayNew, setArrayNew] = useState(children[1] || []);
    const [arrayStatus, setArrayStatus] = useState([]);
    // Bottom bar 
    const [tutorial, setTutorial] = useState(true);
    const [gameStart, setGameStart] = useState(false);
    const [gameFault, setGameFault] = useState(false);
    const [gameWin, setGameWin] = useState(false);
    const [gameLose, setGameLose] = useState(false);
    const hrefAgain='/level/'+level;
    const hrefNext='/level/'+(level+1)
    let gamebox;
    let newArr = [];
    let gameArr = [];
    for ( let i = 0; i < arrayOrig.length; i++ ){
        for ( let j = 0; j < arrayOrig.length; j++ ){
            newArr.push(arrayOrig[i][j]);
        }
    }
    console.log('newArr', newArr)
    const totalSquares = newArr.length;
    const totalSquaresAcross = Math.sqrt(totalSquares);
    const squareWidth = 600 / totalSquaresAcross
    if ( tutorial ) {
        gamebox = <img src="/shokiri.jpg" />
    } else {
        gamebox = newArr.map( elem => {
            let hover = [];
            let click = [];
            switch ( elem ) {
                case 'shy':
                    hover = ['end', 'flip'];
                    click = ['end', 'na'];

                    break;
                case 'bold':
                    hover = ['na', 'na'];
                    click = ['end', 'demo'];
                case 'calm':
                    hover = ['done'];
                    click = ['done'];
                    break;
                default:
                    hover = ['done'];
                    click = ['done'];
            }
            let color;
            let radius;
            if ( hover[0] === 'done' || click[0] === 'done') {
                color = 'green';
            } else if ( click[0] === 'demo' ){
                if ( click.length === 2){
                    radius = squareWidth/2+'px';
                } else {
                    radius = squareWidth/4+'px';
                }
                color = 'green';
            }
            if ( hover[0] === 'flip') {
                if ( hover.length === 2){
                    color = 'orange';
                } else {
                    color = 'red';
                }
                radius = 0+'px';
            }
        
        })
    }
    let button;
    if ( tutorial ){
        // Advance from tutorial to game
        button = <button onClick={() => setTutorial(false)}>Next</button>
    } else if ( gameStart === false ) {
        // Start Game
        button = <button onClick={() => setGameStart(true)}>Start</button>
    } else if ( gameWin === true ) {
        // Game won
        button = <Link href={hrefNext}>
            <a >Next level</a>
        </Link>
    } else if ( gameFault === true ) {
        // Start game over
        button = <Link href={hrefAgain}>
            <a >Try Again</a>
        </Link>
    }

    return (
        <Site>
            <GameBarTop>
                {[level, timer, par]}
            </GameBarTop>
            {/* { children[1] } */}
            <div className={levelcss.gameContainer}>
                {gamebox}
            </div>
            <div className={`${levelcss.row} ${levelcss.level}`}>
                { button }
            </div>
        </Site>
    )
}

export default withContext(Level);
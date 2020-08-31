import React, { useState } from 'react';
import withContext from '../contextAPI/ContextWrapper';
import Site from './Site'
import Gamebox from './GameBox';
import GameBarTop from './GameBarTop';
import levelcss from '../../styles/level.module.css';

function Level ({ children }){
    // Top bar
    const [level, setLevel] = useState(children[0]);
    const [timer, setTimer] = useState(0);
    const [par, setPar] = useState(1);
    // Game box
    const [mapOrig, setMapOrig] = useState(children[1] || []);
    const [mapNew, setMapNew] = useState(children[1] || []);
    const [mapStatus, setMapStatus] = useState([]);
    // Bottom bar 
    const [tutorial, setTutorial] = useState(true);
    const [gameStart, setGameStart] = useState(false);
    const [gameFault, setGameFault] = useState(false);
    const [gameWin, setGameWin] = useState(false);
    const [gameLose, setGameLose] = useState(false);
    const hrefAgain='/level/'+level;
    const hrefNext='/level/'+(level+1)
    let gamebox;
    const totalSquares = mapOrig.size;
    const totalSquaresAcross = Math.sqrt(totalSquares);
    const squareWidth = 600 / totalSquaresAcross
    const borderWidth = 6;
    let hoverMap = new Map();
    let clickMap = new Map();
    let hover = [];
    let click = [];
    var squaresArr = [];
    if ( tutorial ) {
        gamebox = <img src="/shokiri.jpg" />;
    } else {
        mapOrig.forEach( function (value, key) {
            // console.log('gamebox - Key:'+key+', Value:'+value)
            // console.log('Key[0]:'+key[0]+', Key[1]:'+key[1])
            // console.log('Array.isArray(Key):'+ Array.isArray(key))
            let val1 = key[0];
            let val2 = key[1];
            // if ( val2 === 0 ){
            //     squaresArr[ val1 ] = [];
            // }
            switch ( value ) {
                case 'shy':
                    hover = ['end', 'flip'];
                    click = ['end', 'na'];
                    hoverMap.set(key, 1);
                    break;
                case 'bold':
                    hover = ['na', 'na'];
                    click = ['end', 'demo'];
                    clickMap.set(key, 1);
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
            } else if ( click[1] === 'demo' ){
                if ( click.length === 2){
                    radius = (squareWidth/2)+'px';
                } else {
                    radius = (squareWidth/4)+'px';
                }
                color = '#65B540';
            }
            if ( hover[1] === 'flip') {
                if ( hover.length === 2){
                    color = '#EF8A17'; // red
                } else {
                    color = '#DB162F'; // orange
                }
                radius = 0+'px';
            }
            console.log('color', color)
            console.log('radius', radius)
            let style = {
                width: (squareWidth - borderWidth)+'px',
                height: (squareWidth - borderWidth)+'px',
                background: color,
                borderRadius: radius,
                border: `${borderWidth/2}px solid #3E1429`
            }
            squaresArr.push(<div style={style} key={key} >Key: {key}, Type: {value}</div>)
        })
        gamebox = squaresArr;
    }
    console.log('gamebox', gamebox)
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
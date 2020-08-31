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
    let squaresArr = [];
    let count = 0;
    let smRadius = 5+'px';
    let mdRadius = (squareWidth/4)+'px';
    let lgRadius = (squareWidth/2)+'px';
    let green = '#65B540';
    let orange = '#EF8A17';
    let red = '#DB162F';
    if ( tutorial ) {
        gamebox = <img src="/shokiri.jpg" />;
    } else {
        mapOrig.forEach( function (value, key) {
            console.log('gamebox - Key:'+key+', Value:'+value)
            // console.log('Key[0]:'+key[0]+', Key[1]:'+key[1])
            // console.log('Array.isArray(Key):'+ Array.isArray(key))
            let val1 = key[0];
            let val2 = key[1];
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
                    break;
                case 'calm':
                    hover = ['done'];
                    click = ['done'];
                    break;
                default:
                    hover = ['done'];
                    click = ['done'];
            }
            let color = green;
            let radius = lgRadius;
            if ( click.length > 1 && click[2] === 'demo' ){
                radius = smRadius;
            } else if ( click.length > 1 && click[1] === 'demo' ){
                radius = mdRadius; 
            }
            if ( hover.length > 1 && hover[2] === 'flip' ) {
                color = red;
            } else if ( hover.length > 1 && hover[1] === 'flip' ) {
                color = orange;
            }
            console.log('Item'+count+', hover', hover)
            console.log('Item'+count+', click', click)
            // console.log(radius)
            let style = {
                width: (squareWidth - borderWidth)+'px',
                height: (squareWidth - borderWidth)+'px',
                background: color,
                borderRadius: radius,
                border: `${borderWidth/2}px solid #3E1429`,
            }
            squaresArr.push(<div style={style} key={key} data={count} onMouseEnter={onHover} onClick={onClick}></div>)
            count += 1;
        })
        gamebox = squaresArr;
    }
    console.log('gamebox', gamebox)

    function onHover ( e ) {
        console.log('e.target', e.target)
        // let index = e.data
        let sqColor = e.target.style.background;
        if ( sqColor === red) { //red
            e.target.style.background = orange;
        } else {
            e.target.style.background = green;   
        }
        console.log('sqColor', sqColor)
    }

    function onClick ( e ) {
        console.log('e.target', e.target)
        // let index = e.data
        let sqRadius = e.target.style.borderRadius;
        if ( sqRadius === smRadius ) { //red
            e.target.style.borderRadius = mdRadius;
        } else {
            e.target.style.borderRadius = lgRadius;;   
        }
        console.log('sqRadius', sqRadius)
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
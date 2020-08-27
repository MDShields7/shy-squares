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
    // Bottom bar 
    const [tutorial, setTutorial] = useState(true);
    const [gameStart, setGameStart] = useState(false);
    const [gameFault, setGameFault] = useState(false);
    const [gameWin, setGameWin] = useState(false);
    const [gameLose, setGameLose] = useState(false);
    const hrefAgain='/level/'+level;
    const hrefNext='/level/'+(level+1)
    let gamebox;
    if ( tutorial ) {
        // gamebox =  <img src='../../public/shokiri.jpg'/>
        gamebox = <img src="/shokiri.jpg" />
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
            { children[1] }
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
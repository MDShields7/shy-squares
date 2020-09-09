import chroma from 'chroma-js';

let hoverMap = new Map();
// Each item in hoverMap is composed of:
// A key, which is the key of the item ( 0 for first square, count+1 for each square)
// A count, which tells how many times more this can be hovered over
let clickMap = new Map();

export default function makeSquareArr ( startType, widthOfSq, inputMap, gameChecker ) {
    let squaresArr = [];
    let hover = [];
    let click = [];
    let count = 0;
    const borderRadius  = {
        small: 5+'px',
        medium: (widthOfSq/4)+'px',
        large: (widthOfSq/2)+'px'
    }
    const background = {
        green: 'rgb(101, 181, 64)',
        orange: 'rgb(239, 138, 23)',
        red: 'rgb(219, 22, 47)'
    }
    function onHover ( e, arr ) {
        console.log('Hovering! e.target', e.target)
        let sqColor = e.target.style.background;
        if ( sqColor === background.red ) { //red
            e.target.style.background = background.orange;
            e.target.style.border = background.orange;
        } else if (sqColor === background.orange ){
            e.target.style.background = background.green;   
            e.target.style.border = background.green;   
        }
        changeGameMap( 'hover', arr )
    }
    function onClick ( e, arr ) {
        // console.log('e.target', e.target)
        let sqRadius = e.target.style.borderRadius;
        if ( sqRadius === borderRadius.small ) {
            e.target.style.borderRadius = borderRadius.medium;
        } else if ( sqRadius === borderRadius.medium ){
            e.target.style.borderRadius = borderRadius.large;   
        }
        changeGameMap( 'click', arr )
    }
    function changeGameMap ( type, mapKey ) {
        // modify scoring maps
        console.log( 'changeGameMap, type:', type, ', mapKey:', mapKey)
        if ( type === 'hover' ){
            let hoverNum = hoverMap.get(mapKey)
            console.log('hoverNum:', hoverNum)
            if ( hoverNum > 1 ){
                hoverMap.set( mapKey, hoverNum - 1 );
            } else {
                hoverMap.delete(mapKey);
            }
        } else if ( type === 'click' ){
            let clickNum = clickMap.get(mapKey)
            if ( clickNum > 1 ){
                clickMap.set( mapKey, clickNum - 1 );
            } else {
                clickMap.delete(mapKey);
            }
        }
        gameChecker(hoverMap, clickMap)
    }

    inputMap.forEach( function (value, key) {
        // console.log('gamebox - Key:'+key+', Value:'+value)
        switch ( value ) {
            case 'shy-2x':
                hover = ['end', 'flip', 'flip'];
                click = ['end', 'na', 'na'];
                hoverMap.set(key, 2);
                break;
            case 'shy':
                hover = ['end', 'flip'];
                click = ['end', 'na'];
                hoverMap.set(key, 1);
                break;
            case 'bold-2x':
                hover = ['na', 'na', 'na'];
                click = ['end', 'demo', 'demo'];
                clickMap.set(key, 2);
                break;
            case 'bold':
                hover = ['na', 'na'];
                click = ['end', 'demo'];
                clickMap.set(key, 1);
                break;
            case 'lava':
                hover = ['lava'];
                click = ['lava'];
                break;
            case 'calm':
                hover = ['done'];
                click = ['done'];
                break;
            default:
                hover = ['done'];
                click = ['done'];
        }
        let borderWidth = 10;
        const dark2 = 'rgb(62, 20, 41)';
        let color = background.green;
        // console.log('color', color);
        let radius = borderRadius.large;
        let border = background.green;
        // console.log('radius', radius);
        if ( click.length > 1 && click[2] === 'demo' ){
            radius = borderRadius.small;
        } else if ( click.length > 1 && click[1] === 'demo' ){
            radius = borderRadius.medium; 
        }    
        if ( hover.length > 1 && hover[2] === 'flip' ) {
            color = background.red;
            border = background.red;
        } else if ( hover.length > 1 && hover[1] === 'flip' ) {
            color = background.orange;
            border = background.orange;
        } 
        if ( hover.length === 1 && hover[0] === 'lava' ){
            border = background.red;
            color = dark2;
            radius = borderRadius.small;
        }
        // console.log('Item'+count+', hover', hover)
        // console.log('Item'+count+', click', click)
        let startStyle = {
            boxSizing: 'border-box',
            width: (widthOfSq - borderWidth)+'px',
            height: (widthOfSq - borderWidth)+'px',
            background: color,
            borderRadius: radius,
            border: `${borderWidth/2}px solid ${border}`,
        }
        let preStartStyle = {
            boxSizing: 'border-box',
            width: (widthOfSq - borderWidth)+'px',
            height: (widthOfSq - borderWidth)+'px',
            background: chroma(color).desaturate(2),
            borderRadius: radius,
            border: `${borderWidth/2}px solid ${chroma(border).desaturate(2)}`,
        }
        if ( startType === 'start' ){

            squaresArr.push(<div style={startStyle} data={key} key={count} onMouseEnter={(e) => onHover(e, key)} onClick={(e) => onClick(e, key)}></div>)
        } else if ( startType === 'pre-start' ){
            squaresArr.push(<div style={preStartStyle} data={key} key={count} ></div>)
        }
        count += 1;
    })
    // console.log('squaresArr',squaresArr)
    const gamebox = [squaresArr, hoverMap, clickMap];
    return gamebox; 
}


import chroma from 'chroma-js';

// Each item in hoverMap is composed of:
// A key, which is the key of the item ( 0 for first square, count+1 for each square)
// A count, which tells how many times more this can be hovered over

export default function makeSquareArr ( startType, widthOfSq, inputMap, gameChecker, gameLoser ) {
    let hoverMap = new Map();
    let clickMap = new Map();
    let squaresArr = [];
    let hover = [];
    let click = [];
    let count = 0;
    let gameEnd = false;
    let borderWidth = widthOfSq/10;
    const dark2 = 'rgb(62, 20, 41)';

    const makeBorder = function ( color ) {
        return chroma(color).darken()
    }
    const borderRadius = {
        square: 15+'px',
        small: (widthOfSq/4)+'px',
        medium: (Math.ceil(widthOfSq/3))+'px',
        large: (widthOfSq/2)+'px'
    }
    const background = {
        green: 'rgb(101, 181, 64)',
        orange: 'rgb(239, 138, 23)',
        red: 'rgb(219, 22, 47)'
    }
    function onHover ( e, arr ) {
        // console.log('Hovering! e.target', e.target)
        let sqColor = e.target.style.background;
        if ( sqColor === background.red ) { //red
            e.target.style.background = background.orange;
            e.target.style.border = `${borderWidth/2}px solid ${makeBorder(background.orange)}`;
        } else if (sqColor === background.orange ){
            e.target.style.background = background.green; 
            e.target.style.border = `${borderWidth/2}px solid ${makeBorder(background.green)}`;
        }
        changeGameMap( 'hover', arr )
    }
    function onClick ( e, arr ) {
        // console.log('e.target', e.target)
        let sqRadius = e.target.style.borderRadius;
        // console.log('sqRadius', sqRadius)
        // console.log('borderRadius.small',borderRadius.small)
        // console.log('borderRadius.medium',borderRadius.medium)
        // console.log('borderRadius.large',borderRadius.large)
        if ( sqRadius === borderRadius.small ) {
            e.target.style.borderRadius = borderRadius.medium;
        } else if ( sqRadius === borderRadius.medium ){
            e.target.style.borderRadius = borderRadius.large;   
        }
        changeGameMap( 'click', arr )
    }
    function changeGameMap ( type, mapKey ) {
        // modify scoring maps
        // console.log( 'changeGameMap, type:', type, ', mapKey:', mapKey)
        if ( type === 'hover' ){
            let hoverNum = hoverMap.get(mapKey)
            // console.log('hoverNum:', hoverNum)
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
        let color = background.green;
        // console.log('color', color);
        let radius = borderRadius.large;
        let border = makeBorder(background.green);
        // console.log('radius', radius);
        if ( click.length > 1 && click[2] === 'demo' ){
            radius = borderRadius.small;
        } else if ( click.length > 1 && click[1] === 'demo' ){
            radius = borderRadius.medium; 
        }    
        if ( hover.length > 1 && hover[2] === 'flip' ) {
            color = background.red;
            border = makeBorder(background.red);
        } else if ( hover.length > 1 && hover[1] === 'flip' ) {
            color = background.orange;
            border = makeBorder(background.orange);
        } 
        if ( hover.length === 1 && hover[0] === 'lava' ){
            border = background.red;
            color = dark2;
            radius = borderRadius.square;
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
            if ( hover[0] === 'end'){
                squaresArr.push(<div style={startStyle} data={key} key={count} onMouseEnter={(e) => onHover(e, key)} ></div>)
            } else if ( click[0] === 'lava'){
                squaresArr.push(<div style={startStyle} data={key} key={count} onMouseEnter={() => gameLoser()} ></div>)
            } else if ( click[0] === 'end'){
                squaresArr.push(<div style={startStyle} data={key} key={count}  onClick={(e) => onClick(e, key)}></div>)
            } else {
                squaresArr.push(<div style={startStyle} data={key} key={count} ></div>)
            }
        } else if ( startType === 'pre-start' ){
            squaresArr.push(<div style={preStartStyle} data={key} key={count} ></div>)
        }
        count += 1;
    })
    // console.log('makeSquareArr')
    // console.log('hoverMap', hoverMap)
    // console.log('clickMap', clickMap)
    // console.log('squaresArr',squaresArr)
    const gamebox = [squaresArr, hoverMap, clickMap];
    return gamebox; 
}


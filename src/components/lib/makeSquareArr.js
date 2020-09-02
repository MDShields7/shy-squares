
export default function makeSquareArr ( widthOfSq, inputMap ) {
    let hoverMap = new Map();
    let clickMap = new Map();
    let squaresArr = [];
    let hover = [];
    let click = [];
    let count = 0;
    const borderWidth = 6;
    const borderRadius  = {
        small: 5+'px',
        medium: (widthOfSq/4)+'px',
        large: (widthOfSq/2)+'px'
    }
    const background = {
        green: '#65B540',
        orange: '#EF8A17',
        red: '#DB162F'
    }
    inputMap.forEach( function (value, key) {
        // console.log('gamebox - Key:'+key+', Value:'+value)
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
        let color = background.green;
        // console.log('color', color);
        let radius = borderRadius.large;
        // console.log('radius', radius);
        if ( click.length > 1 && click[2] === 'demo' ){
            radius = borderRadius.small;
        } else if ( click.length > 1 && click[1] === 'demo' ){
            radius = borderRadius.medium; 
        }
        if ( hover.length > 1 && hover[2] === 'flip' ) {
            color = background.red;
        } else if ( hover.length > 1 && hover[1] === 'flip' ) {
            color = background.orange;
        }
        // console.log('Item'+count+', hover', hover)
        // console.log('Item'+count+', click', click)
        let style = {
            width: (widthOfSq - borderWidth)+'px',
            height: (widthOfSq - borderWidth)+'px',
            background: color,
            borderRadius: radius,
            border: `${borderWidth/2}px solid #3E1429`,
        }
        squaresArr.push(<div style={style} data={key} key={count} onMouseEnter={(e) => onHover(e, key)} onClick={(e) => onClick(e, key)}></div>)
        count += 1;
    })
    // console.log('squaresArr',squaresArr)
    const gamebox = [squaresArr, hoverMap, clickMap];
    return gamebox; 
}   

function onHover ( e, arr ) {
    console.log('Hovering! e.target', e.target)
    let sqColor = e.target.style.background;
    if ( sqColor === red) { //red
        e.target.style.background = orange;
    } else {
        e.target.style.background = green;   
    }
    changeGameMap( 'hover', arr )
}
function onClick ( e, arr ) {
    // console.log('e.target', e.target)
    let sqRadius = e.target.style.borderRadius;
    if ( sqRadius === smRadius ) { //red
        e.target.style.borderRadius = mdRadius;
    } else {
        e.target.style.borderRadius = lgRadius;;   
    }
    changeGameMap( 'click', arr )
}
function changeGameMap ( type, mapKey ) {
    // modify scoring maps
    if ( type === 'hover' ){
        let hoverNum = hoverMap.get(mapKey)
        if ( hoverNum > 1 ){
            hoverMap.set( hoverNum - 1 );
        } else {
            hoverMap.delete(mapKey);
        }
    } else if ( type === 'click' ){
        let clickNum = clickMap.get(mapKey)
        if ( clickNum > 1 ){
            clickMap.set( clickNum - 1 );
        } else {
            clickMap.delete(mapKey);
        }
    }
    checkGameMap()
}
function checkGameMap () {
    // check scoring arrays for game over
    if ( hoverMap.size === 0 && clickMap.size === 0 ){
        setGameWin(true);
        console.log('you win')
    }
    console.log('hoverMap.size', hoverMap.size)
    console.log('clickMap.size', clickMap.size)
}
import squarecss from '../../styles/square.module.css';

function Square ({ children }) {
    const { hover, setHover } = useState([]);
    const { click, setClick } = useState([]);
    const width = children[1];
    let color;
    let radius;
    if ( hover[0] === 'done' || click[0] === 'done') {
        color = 'green';
    } else if ( click[0] === 'demo' ){
        if ( click.length === 2){
            radius = width/2+'px';
        } else {
            radius = width/4+'px';
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

    switch ( children[0] ) {
        case 'calm':
            setHover(['done']);
            setClick(['done']);
            break;
        case 'shy':
            setHover(['end', 'flip']);
            setClick('end', 'na');
            break;
        case 'bold':
            setHover('na', 'na');
            setClick('end', 'demo');
    }
    return (
        <div className={squarecss.square} style={`background:${color} border-radius:${radius}`}></div>
    )
}

export default Square;
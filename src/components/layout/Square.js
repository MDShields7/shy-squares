import squarecss from '../../styles/square.module.css';

function Square ({ children }) {
    const { hover, setHover } = useState([]);
    const { click, setClick } = useState([]);



    return (
        <div className={squarecss.square} style={`background:${color} border-radius:${radius}`}></div>
    )
}

export default Square;
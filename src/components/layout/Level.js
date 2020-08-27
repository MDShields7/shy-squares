import level from '../../styles/level.module.css';
import Site from './Site'
import Link from 'next/link';

function getScores () {
    // axios.get(`/api/v1/level${num}`)
}

export default function Level ({ children }){
    // console.log('children',children)
    const href='/level/'+(children[0]+1)
    console.log('href',href)
    return (
        <Site>
            <div className={`${level.row} ${level.level}`}>
                <h1>Level {children[0]}</h1>
            </div>
            <div className={`${level.row} ${level.timebar}`}>
                <h2 className={`${level.timeItem} ${level.par}`}>Par: {}</h2>
                <h2 className={`${level.timeItem} ${level.timer}`}>00:00</h2>
                <h2 className={`${level.timeItem}`}></h2>
            </div>
            { children[1] }
            <div className={level.gamebox}>box</div>
            <br/>
            <div className={`${level.row} ${level.level}`}>
                <Link href={href}>
                    <a >Next level</a>
                </Link>
            </div>
        </Site>
    )
}
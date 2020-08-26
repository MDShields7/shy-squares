import Site from './Site';
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
            <h1>Level {children[0]}</h1>
            { children[1] }
            <br/>
            <Link href={href}>
                <a >Next level</a>
            </Link>
        </Site>
    )
}
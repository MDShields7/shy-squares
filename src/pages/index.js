import Site from '../components/layout/Site';
import Link from 'next/link';

export default function Home (){
    return (
        <Site>
            <div>Home</div>
            <Link href='level/1'>
                <a>Play!</a>
            </Link>
        </Site>
    )
}
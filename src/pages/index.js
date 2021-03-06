import Site from '../components/layout/Site';
import Link from 'next/link';

const style1 = {
    width: '100%',
    textAlign: 'center',
    margin: 'auto',
    padding: '60px 0 0 0'
};

export default function Home (){
    return (
        <Site>
            <div style={style1}>
                <h1 >Home</h1><br/>
                <button className='button'>
                    <Link href='level/1'>
                        <a>Play!</a>
                    </Link>
                </button>
            </div>
        </Site>
    )
}
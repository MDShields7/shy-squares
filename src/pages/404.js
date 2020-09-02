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
                <h1>404 - Page Not Found</h1><br/>
                <Link href='/'>
                    <a >Go back to home page</a>
                </Link>
            </div>
        </Site>
    )
}
import axios from 'axios';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home (){
    return (
        <Layout>
            <div>Home</div>
            <Link href='level/1'>
                <a className>Play!</a>
            </Link>
        </Layout>
    )
}
import Link from 'next/link';

export default function Navbar() {
    return (
        <section className>
            <div><a href='/'>Logo</a></div>
            <div>
                <Link href="/high-scores">
                    <a className>High Scores</a>
                </Link>
                <Link href="/contact/">
                    <a className>Contact</a>
                </Link>
            </div>
        </section>
    )
}
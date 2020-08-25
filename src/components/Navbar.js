import Link from 'next/link';

export default function Navbar() {
    return (
        <section>
            <div><a href='/'>Logo</a></div>
            <div>
                <Link href="/high-scores">
                    <a>High Scores</a>
                </Link>
                <Link href="/contact/">
                    <a>Contact</a>
                </Link>
            </div>
        </section>
    )
}
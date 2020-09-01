import Link from 'next/link';
import navbar from '../../styles/navbar.module.css'

export default function Navbar() {
    return (
        <nav className={`${navbar.navbarOuter} ${navbar.row}`}>
            <Link href="/">
                    <a className={navbar.navlink}>shysquares</a>
            </Link>
            <div className={navbar.navbarInner}>
                <Link href="/high-scores">
                    <a className={navbar.navlink}>High Scores</a>
                </Link>
                <Link href="/contact/">
                    <a className={navbar.navlink}>Contact</a>
                </Link>
            </div>
        </nav>
    )
}
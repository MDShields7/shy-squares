import Navbar from './Navbar';
import Footer from './Footer';
import site from '../../styles/site.module.css';

export default function Site ({ children }) {
    return (
        <>
            <section className={site.container}>
                <Navbar/>
                <div> {children} </div>
                <Footer/>
            </section>
        </>
    )
};
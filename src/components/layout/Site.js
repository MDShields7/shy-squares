import Navbar from '../Navbar';
import Footer from '../Footer';
import '../../styles/site.scss'

export default function Site ({ children }) {
    return (
        <section className='container'>
            <Navbar/>
            <div> {children} </div>
            <Footer/>
        </section>
    )
};
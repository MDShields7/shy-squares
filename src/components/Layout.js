import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Layout ({ children }) {
    return (
        <>
            <Navbar/>
            <div> {children} </div>
            <Footer/>
        </>
    )
}

export default Layout;
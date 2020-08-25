import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function layout ({ children }) {
    return (
        <>
            <Navbar/>
            <div> {children} </div>
            <Footer/>
        </>
    )
}

export default layout;
import React from 'react'
import Navbar from '../Navbar/Navbar';
import NewHero from '../Hero/NewHero';
import TopProducts from '../TopProducts/TopProducts';
import Subscribe from '../Subscribe/Subscribe';
import Products from '../Products/Products';
import Banner from '../Banner/Banner';
import Hero from '../Hero/Hero';
import Testimonials from '../Testimonials/Testimonials';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {

    const [orderPopup, setOrderPopup] = React.useState(false);

    const handleOrderPopup = () => {
        setOrderPopup(!orderPopup);
    };
    React.useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 800,
            easing: "ease-in-sine",
            delay: 100,
        });
        AOS.refresh();
    }, []);

    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
            {/* <MegaMenuWithPlacement /> */}

            <NewHero />
            <TopProducts handleOrderPopup={handleOrderPopup} />
            <Products />
            <Banner />
            <Hero handleOrderPopup={handleOrderPopup} />
            <Testimonials />

            <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
            <Subscribe />
        </div>
    )
}

export default Home
import React from 'react'
import Navbar from '../Navbar/Navbar';
import NewHero from '../Hero/NewHero';
import TopProducts from '../Category/CategoryProduct';
import Subscribe from '../Subscribe/Subscribe';
import Banner from '../Banner/Banner';
import Testimonials from '../Testimonials/Testimonials';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import AOS from "aos";
import "aos/dist/aos.css";
import NewArrival from '../New Arrival/NewArrival';
import MensCategory from '../ShopByGender/ShopByGender';
import PreFooter from './PreFooter';
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct';
import EssentialSummerCollection from '../EssentialSummerCollection/EssentialSummerCollection';
import { GallerySection } from '../Gallery/GallerySection';

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
            <NewArrival />
            <Banner />
            <MensCategory handleOrderPopup={handleOrderPopup} />
            <EssentialSummerCollection />
            <FeaturedProduct />
            <Testimonials />
            <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
            <GallerySection />
            <PreFooter />
            <Subscribe />

        </div>
    )
}

export default Home
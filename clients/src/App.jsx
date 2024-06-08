import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import Navbar from './components/Navbar/Navbar';
import Home from './components/Pages/Home';
import Footer from './components/Footer/Footer';
import Catagory from './components/Pages/Catagory';
import Product from './components/Pages/Product';
import Cart from './components/Pages/Cart';
import PreFooter from './components/Pages/PreFooter';
import CheckOut from './components/Pages/CheckOut';
import { MegaMenuWithPlacement } from './components/Navbar/Header';
import { PreHeader } from './components/Navbar/PreHeader';

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <>
        <PreHeader />
        <Navbar handleOrderPopup={handleOrderPopup} />
        {/* <PrivateAuthSlice /> */}
        {/* <MegaMenuWithPlacement /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/catagory" element={<Catagory />} />
          <Route path="/checkOut" element={<CheckOut />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
};

export default App;

import React from "react";
import Image1 from "../../assets/hero/women.png";
import Image2 from "../../assets/hero/shopping.png";
import Image3 from "../../assets/hero/sale.png";
import Slider from "react-slick";
import img1 from '../../assets/hero/1.jpg';
import img2 from '../../assets/hero/2.jpg';
import img3 from '../../assets/hero/3.jpg';
import img4 from '../../assets/hero/4.jpg';
import img5 from '../../assets/hero/5.jpg';


const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Upto 50% off on all Men's Wear",
    description:
      "lorem His Life will forever be Changed dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    img: Image2,
    title: "30% off on all Women's Wear",
    description:
      "Who's there lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    img: Image3,
    title: "70% off on all Products Sale",
    description:
      "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const Hero = ({ handleOrderPopup }) => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (

    <div>
      <div> 
        <div className=" justify-center text-center">
          <p className="text-gray-700">
            Share your setup with
          </p>
          <p className="my-4 font-bold text-3xl  sm:text-4xl ">#ShopOnShopmet</p>

        </div>
      </div>
      <section className="bg-white">
        <div className=" ">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 h-full ">

            <div className="col-span-2 py-1 sm:col-span-1 md:col-span-2   flex flex-col">
              <a href="" className="group relative flex flex-col overflow-hidden  px-4 pt-[100vh] flex-grow">
                <img src={img1} alt="" className="absolute inset-0 h-[105vh] w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-0 bg-gradient-to-b "></div>
                <div className="absolute top-60 left-10">

                  <p className="z-10 text-6xl font-medium p-2 xs:text-2xl font-serif	font-family:Georgia md:text-6xl">Women’s fashion</p>
                  <p className="z-10 font-medium p-2 ">Sitamet, consectetur adipiscing elit, sed do eiusmod tempor incidid-unt labore edolore magna aliquapendisse ultrices gravida.</p>
                  <p className="z-10 font-medium m-2 border-b-2 border-red-500 w-24 ">SHOP NOW</p>

                </div>
              </a>
            </div>

            <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50 ">

              <div className="grid gap-2 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">

                <a href="" className="group relative flex flex-col overflow-hidden px-4 pb-4 pt-[50vh]">
                  <img src={img2} alt="" className="absolute py-1 inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                  <div className="absolute inset-0 "></div>
                  <div className="absolute top-20 left-10">

                    <p className="z-10 text-2xl font-semibold  xs:text-2xl md:text-2xl">Men’s fashion</p>
                    <p className="z-10 font-medium  ">358 items</p>
                    <p className="z-10 font-medium  border-b-2 border-red-500 w-24 ">SHOP NOW</p>

                  </div>
                </a>

                <a href="" className="group relative flex flex-col overflow-hidden px-4 pb-4 pt-[50vh]">
                  <img src={img3} alt="" className="absolute py-1 inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                  <div className="absolute inset-0 "></div>
                  <div className="absolute top-20 left-10">

                    <p className="z-10 text-2xl font-semibold  xs:text-2xl md:text-2xl">Kid’s fashion</p>
                    <p className="z-10 font-medium  ">168 items</p>
                    <p className="z-10 font-medium  border-b-2 border-red-500 w-24 ">SHOP NOW</p>

                  </div>
                </a>

              </div>
              <div className="grid gap-2 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">

                <a href="" className="group relative flex flex-col overflow-hidden  px-4 pb-4 pt-[50vh]">
                  <img src={img4} alt="" className="absolute py-1 inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                  <div className="absolute inset-0 "></div>
                  <div className="absolute top-20 left-10">

                    <p className="z-10 text-2xl font-semibold  xs:text-2xl md:text-2xl">Cosmetics</p>
                    <p className="z-10 font-medium  ">948 items</p>
                    <p className="z-10 font-medium  border-b-2 border-red-500 w-24 ">SHOP NOW</p>

                  </div>
                </a>

                <a href="" className="group relative flex flex-col overflow-hidden  px-4 pb-4 pt-[50vh]">
                  <img src={img5} alt="" className="absolute py-1 inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                  <div className="absolute inset-0 "></div>
                  <div className="absolute top-20 left-10">

                    <p className="z-10 text-2xl font-semibold  xs:text-2xl md:text-2xl">Accessories</p>
                    <p className="z-10 font-medium  ">158 items</p>
                    <p className="z-10 font-medium  border-b-2 border-red-500 w-24 ">SHOP NOW</p>

                  </div>
                </a>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>

    // <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200 ">
    //   {/* background pattern */}
    //   <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z[8]"></div>
    //   {/* hero section */}
    //   <div className="container pb-8 sm:pb-0">
    //     <Slider {...settings}>
    //       {ImageList.map((data) => (
    //         <div>
    //           <div className="grid grid-cols-1 sm:grid-cols-2">
    //             {/* text content section */}
    //             <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
    //               <h1
    //                 data-aos="zoom-out"
    //                 data-aos-duration="500"
    //                 data-aos-once="true"
    //                 className="text-5xl sm:text-6xl lg:text-7xl font-bold"
    //               >
    //                 {data.title}
    //               </h1>
    //               <p
    //                 data-aos="fade-up"
    //                 data-aos-duration="500"
    //                 data-aos-delay="100"
    //                 className="text-sm"
    //               >
    //                 {data.description}
    //               </p>
    //               <div
    //                 data-aos="fade-up"
    //                 data-aos-duration="500"
    //                 data-aos-delay="300"
    //               >
    //                 <button
    //                   onClick={handleOrderPopup}
    //                   className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
    //                 >
    //                   Order Now
    //                 </button>
    //               </div>
    //             </div>
    //             {/* image section */}
    //             <div className="order-1 sm:order-2">
    //               <div
    //                 data-aos="zoom-in"
    //                 data-aos-once="true"
    //                 className="relative z-10"
    //               >
    //                 <img
    //                   src={data.img}
    //                   alt=""
    //                   className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto"
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </Slider>
    //   </div>
    // </div>
  );
};

export default Hero;

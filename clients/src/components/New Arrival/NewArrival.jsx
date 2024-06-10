import React from "react";
import Img1 from "../../assets/category-img/Tamsin Bracelet.webp";
import Img2 from "../../assets/category-img/Elle Ring.webp";
import Img3 from "../../assets/category-img/ring.webp";
import Img4 from "../../assets/category-img/W10226-Y-1_480x.webp";
import { FaRegHeart, FaStar } from "react-icons/fa6";


const NewArrival = () => {
  const ProductsData = [
    {
      id: 1,
      img: Img1,
      title: "Women Ethnic",
      rating: 5.0,
      color: "white",
      aosDelay: "0",
      price: "1345"
    },
    {
      id: 2,
      img: Img2,
      title: "Women western",
      rating: 4.5,
      color: "Red",
      aosDelay: "200",
      price: "1745"
    },
    {
      id: 3,
      img: Img3,
      title: "Goggles",
      rating: 4.7,
      color: "brown",
      aosDelay: "400",
      price: "1205"
    },
    {
      id: 4,
      img: Img4,
      title: "Printed T-Shirt",
      rating: 4.4,
      color: "Yellow",
      aosDelay: "600",
      price: "245"
    },



  ];


  return (
    <div className="mt-20 mb-12 card-background py-20">
      <div className="container">
        {/* Header section */}
        <div className="text-center  text-color font-medium text-4xl pb-10">
          New Arrivals
          <p className=" flex justify-center">
            <p className="h-[2px] nav-strip w-28"></p>
          </p>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 place-items-center gap-8">
            {/* card section */}
            {ProductsData.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.id}
                className="space-y-3 bg-gray-100 justify-center text-center"
              >
                <img
                  src={data.img}
                  alt=""
                  className="h-[280px] w-[300px] object-cover "
                />
                <div className="absolute top-0 right-3 z-[999] cta rounded-full p-2 cursor-pointer"><FaRegHeart className="text-white" /></div>

                <div className="px-2 rounded-b-lg absolute  text-white p-2 bottom-0 banner-card w-full">
                  <p className="font-semibold">{data.title}</p>
                  {/* <p className="text-sm text-gray-600">Color : {data.color}</p> */}
                  <p className="">Price ₹ {data.price}</p>

                </div>

                {/* <button className=" border justify-center   text-center w-full p-2">
                  Buy Now

                </button> */}
              </div>
            ))}
          </div>
          {/*  Show More button */}
          {/* <div className="mt-8 flex justify-center text-center">
            <a href="#" className="inline-block w-full text-center text-lg font-medium cta border-solid border-2  py-4 px-10 text-white hover:shadow-md md:w-48">
              Show More</a>
          </div> */}

        </div>
      </div>


    </div>
  );
};

export default NewArrival;

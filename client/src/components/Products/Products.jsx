import React from "react";
import Img1 from "../../assets/women/women.png";
import Img2 from "../../assets/women/women2.jpg";
import Img3 from "../../assets/women/women3.jpg";
import Img4 from "../../assets/women/women4.jpg";
import { FaStar } from "react-icons/fa6";


const Products = () => {
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
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center pb-10">
          <p className="text-4xl">

            Related Products
          </p>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 place-items-center gap-5">
            {/* card section */}
            {ProductsData.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.id}
                className="space-y-3 background  justify-center text-center"
              >
                <img
                  src={data.img}
                  alt=""
                  className="h-[220px] w-[300px] object-cover "
                />
                <div className="px-2">
                  <p className="font-semibold">{data.title}</p>
                  <p className="text-sm text-gray-600">Color : {data.color}</p>
                  <p className="">Price ₹ {data.price}</p>

                </div>

                <button className=" border justify-center   text-center w-full p-2">
                  Buy Now

                </button>
              </div>
            ))}
          </div>
          {/*  Show More button */}
          <div className="mt-8 flex justify-center text-center">
            <a href="#" className="inline-block w-full text-center text-lg font-medium cta border-solid border-2  py-4 px-10 text-white hover:shadow-md md:w-48">
              Show More</a>
          </div>

        </div>
      </div>


    </div>
  );
};

export default Products;

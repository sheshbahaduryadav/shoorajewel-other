import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import ring from "../../assets/category-img/ring.webp";
import ring1 from "../../assets/category-img/ring2.webp";
import chain from "../../assets/category-img/WG20025-Y-1_480x.webp";
import pendant from "../../assets/category-img/pendant.webp";
import elle from "../../assets/category-img/Elle Ring.webp";
import tamsin from "../../assets/category-img/Tamsin Bracelet.webp";
import { Link } from "react-router-dom";

const TestimonialData = [
  {
    id: 1,
    name: "Cushion Band",
    text: "Cushion Band For Him for mens",
    img: ring,
    aosDelay: "0",
  },
  {
    id: 2,
    name: "Satya Nadella",
    text: "ELLE RING",
    img: elle,
    aosDelay: "300",
  },
  {
    id: 3,
    name: "Initial S Pendant",
    text: "Cushion Band For Him for mens",
    img: pendant,
    aosDelay: "600",
  },
  {
    id: 4,
    name: "TAMSIN BRACELET",
    text: "Cushion Band For Him for mens",
    img: tamsin,
    aosDelay: "900",
  },
  {
    id: 6,
    name: "Initial S Pendant",
    text: "Cushion Band For Him for mens",
    img: pendant,
    aosDelay: "1200",
  },
  // {
  //   id: 7,
  //   name: "Sachin Tendulkar",
  //   text: "Cushion Band For Him for mens",
  //   img: chain,
  //   aosDelay: "1500",
  // },
];

const Testimonials = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <TestimonialWrapper>
      <div className="py-10 mt-20 mb-10 ">
        <div className="container">
          {/* header section */}
          <div className="text-center mb-10 max-w-[600px] space-y-3 mx-auto">
            {/* <p data-aos="fade-up" className="text-sm text-primary">
              What our customers are saying
            </p> */}
            <div className="flex gap-4 justify-center items-center">
              <div className="h-3 w-3 background-rectangle rotate-45"></div>
              <div className="h-3 w-3 background-rectangle rotate-45"></div>
              <div className="h-3 w-3 bg-gray-300 rotate-45"></div>
              <h1 data-aos="fade-up" className="text-3xl text-color font-bold">
                Shop By Category
              </h1>
              <div className="h-3 w-3 bg-gray-300 rotate-45"></div>
              <div className="h-3 w-3 background-rectangle rotate-45"></div>
              <div className="h-3 w-3 background-rectangle rotate-45"></div>
            </div>
            <p data-aos="fade-up" className="text-xs text-gray-400">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
              asperiores modi Sit asperiores modi
            </p>
          </div>

          {/* Testimonial cards */}
          {/* <div className="bg-blue-200 flex justify-center"> */}
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div data-aos="fade-up"
                data-aos-delay={data.aosDelay} key={data.id} className="my-6 text-center">
                <div className="flex background flex-col h-44 w-44 justify-center items-center rounded-full dark:bg-gray-800 relative" >
                  <div className=" bg-blue-300 h-[167px] w-[167px] rounded-full">
                    <img
                      src={data.img}
                      alt=""
                      className="rounded-full h-full w-full"
                    />
                  </div>
                </div>
                <div className="flex mt-3 justify-center items-center">
                  <div className="space-y-3">
                    <h1 className="text-lg text-gray-700 font-medium">
                      {data.name}
                    </h1>
                    <Link to="/" className="underline underline-offset-4 ">Shop Now</Link>
                  </div>
                </div>


              </div>
            ))}
          </Slider>
          {/* </div> */}
        </div>
      </div>
    </TestimonialWrapper>
  );
};

export default Testimonials;

const TestimonialWrapper = styled.div`
.slick-prev:before,
.slick-next:before {
    color: black;
    font-size:35px;
}
`
import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import girlGesture from "../../assets/testimonial-img/gesture.png";

const TestimonialData = [
  {
    id: 1,
    name: "Victor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "Satya Nadella",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Virat Kohli",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/104/104",
  },
  {
    id: 5,
    name: "Sachin Tendulkar",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/103/103",
  },
];

const Testimonials = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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
      <div className=" mb-10  py-36">
        <div className="">
          {/* header section */}
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <p data-aos="fade-up" className="text-sm text-primary">
              What our customers are saying
            </p>
            <h1 data-aos="fade-up" className="text-3xl font-bold">
              Our Client TESTIMONIALS
            </h1>
            <p data-aos="fade-up" className="text-xs text-gray-400">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
              asperiores modi Sit asperiores modi
            </p>
          </div>

          {/* Testimonial cards */}
          <div className="flex items-center px-20  justify-between testimonial">
            <div>
              <img data-aos="fade-right" data-aos-delay={0} src={girlGesture} className="h-[500px]" alt="" /></div>
            <div data-aos="fade-right" data-aos-delay={400} className="w-4/6">
              <Slider {...settings}>
                {TestimonialData.map((data) => (
                  <div key={data.id} className="my-6">
                    <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl bg-white relative" >

                      <div className="flex justify-center flex-col items-center text-center gap-4">
                        {/* <div className="mb-4 w-full"> */}
                        <img
                          src={data.img}
                          alt=""
                          className="rounded-full w-20 h-20"
                        />
                        {/* </div> */}
                        <div className="space-y-3">
                          <h1 className="text-xl font-bold text-color dark:text-light">
                            {data.name}
                          </h1>
                          <p className="text-sm text-gray-500">{data.text}</p>
                        </div>
                      </div>
                      {/* <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                        ,,
                      </p> */}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
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
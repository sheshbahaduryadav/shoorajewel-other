import React from "react";
import img1 from '../../assets/website/jewelry image.webp';
import img from "../../assets/website/jewelry img.webp";
import styled from "styled-components";
import { Link } from "react-router-dom";


const EssentialSummerCollection = () => {
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
        <SummerCollectionWrapper>
            <div className="mt-24 pb-36">
                <div className="lg:flex gap-3 lg:px-20 px-4">
                    <div className="relative">
                        <img data-aos="zoom-in-right"
                            data-aos-delay="600" src={img1} alt="Your Image" className="w-4/5 h-[70vh]" />

                        <div data-aos="fade-up"
                            data-aos-delay="0" className="absolute  flex justify-center items-center shadow-xl bg-white h-80 w-80 top-60 right-0 p-4">
                            <div className="text-center space-y-36">
                                <div className=" h-full">
                                    <p className="uppercase">Must See New Styles</p>
                                    <h2 className="text-color card-text-family">Birthday
                                        Collection</h2>
                                    <div className="mt-8">
                                        <Link to="" className="inline-block w-full text-center text-lg font-medium cta   py-3 px-10 text-white hover:shadow-md md:w-48">
                                            Buy Now
                                        </Link>
                                        <p className="flex justify-end mr-9 mt-1 ">
                                            <p className="h-[2px] nav-strip w-44"></p>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img data-aos="zoom-in-left"
                            data-aos-delay="600" src={img1} alt="Your Image" className="w-4/5 h-[70vh]" />

                        <div data-aos="fade-up"
                            data-aos-delay="200" className="absolute flex justify-center items-center shadow-xl bg-white h-80 w-80 top-60 right-0 p-4">
                            <div className="text-center space-y-36">
                                <div className=" h-full">
                                    <p className="uppercase">New collection</p>
                                    <h2 className="text-color card-text-family">Summer
                                        Essentials</h2>
                                    <div className="mt-8">
                                        <Link to="" className="inline-block w-full text-center text-lg font-medium cta   py-3 px-10 text-white hover:shadow-md md:w-48">
                                            Buy Now
                                        </Link>
                                        <p className="flex justify-end mr-9 mt-1 ">
                                            <p className="h-[2px] nav-strip w-44"></p>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </SummerCollectionWrapper>

    );
};

export default EssentialSummerCollection;

const SummerCollectionWrapper = styled.div`
.backgound-img{
    background-image: url(${img1});
}`

import React from 'react';
import img1 from '../../assets/banner/banner images.webp'

function NewHero() {
    return (
        <div className=' w-full'>
            <div className="relative flex flex-col  items-center  w-full  lg:flex-row   bg-cover bg-center bg-no-repeat">

                <div className="w-full lg:h-auto">
                    <img className=" w-full " src={img1} alt="Winding mountain road" />
                </div>

                <div className="max-w-lg banner-card text-white rounded-xl md:max-w-2xl md:z-10 md:shadow-lg md:absolute md:top-0 md:mt-48 lg:w-3/5 lg:left-0 lg:mt-20 lg:mr-20 xl:mt-24 xl:mr-12">
                    <div className="flex flex-col p-12 md:px-16">
                        <p className='py-4'>New Arrival</p>
                        <p className="font-medium   text-2xl sm:text-2xl md:text-4xl  lg:text-4xl xl:text-6xl">Discover Our <span className='font-semibold'>New Collection</span></p>
                        <p className="mt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
                        </p>
                        <div className="mt-8">
                            <a href="#" className="inline-block w-full text-center text-lg font-medium cta py-4 px-10 text-white hover:shadow-md md:w-48">
                                Buy Now </a>
                            <p className="justify-center mt-1 ml-6">
                                <p className="h-[2px] nav-strip w-44"></p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewHero;


import { IoIosArrowForward } from "react-icons/io";
import { IoTrophyOutline } from "react-icons/io5";
import Img1 from "../../assets/women/women.png";
import Img2 from "../../assets/women/women2.jpg";
import Img3 from "../../assets/women/women3.jpg";
import Img4 from "../../assets/women/women4.jpg";
import img5 from '../../assets/New folder/12.jpg'
import { FaStar } from "react-icons/fa6";
import { VscSettings } from "react-icons/vsc";
import { TbGridDots } from "react-icons/tb";
import Products from '../New Arrival/NewArrival';

function Catagory() {

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
        {
            id: 6,
            img: Img2,
            title: "Fashin T-Shirt",
            rating: 4.5,
            color: "Pink",
            aosDelay: "800",
            price: "1245"
        },
        {
            id: 7,
            img: Img1,
            title: "Women Ethnic",
            rating: 5.0,
            color: "white",
            aosDelay: "0",
            price: "1345"
        },
        {
            id: 8,
            img: Img2,
            title: "Women western",
            rating: 4.5,
            color: "Red",
            aosDelay: "200",
            price: "1745"
        },
        {
            id: 9,
            img: Img3,
            title: "Goggles",
            rating: 4.7,
            color: "brown",
            aosDelay: "400",
            price: "1205"
        },
        {
            id: 10,
            img: Img4,
            title: "Printed T-Shirt",
            rating: 4.4,
            color: "Yellow",
            aosDelay: "600",
            price: "245"
        },
        {
            id: 11,
            img: Img2,
            title: "Fashin T-Shirt",
            rating: 4.5,
            color: "Pink",
            aosDelay: "800",
            price: "1245"
        },
        {
            id: 12,
            img: Img1,
            title: "Women Ethnic",
            rating: 5.0,
            color: "white",
            aosDelay: "0",
            price: "1345"
        },
        {
            id: 13,
            img: Img2,
            title: "Women western",
            rating: 4.5,
            color: "Red",
            aosDelay: "200",
            price: "1745"
        },



    ];



    return (
        <div>
            <div className=' w-full'>
                <div className="relative flex justify-center text-center flex-col items-center  w-full lg:flex-row   bg-cover bg-center bg-no-repeat">
                    <div className="w-full ">
                        <img className=" w-full opacity-50 " src={img5} alt="Winding mountain road" />
                    </div>

                    <div className="    md:z-10 md:absolute  ">
                        <div className="flex flex-col">

                            <p className="font-medium uppercase text-orange-500 text-2xl sm:text-2xl md:text-4xl  lg:text-4xl xl:text-4xl">Product Comparison</p>
                            <div className='flex w-full justify-center text-center'>
                                <p>Home </p>
                                <IoIosArrowForward className='m-1' />
                                <p>Comparison</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mt-14 mb-12">
                <div className="container">
                    {/* Header section */}
                    <div className="text-center  mx-auto pb-10">
                        <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
                            <div className="flex items-center bg-white  rounded-sm overflow-hidden ">
                                <div className="p-4 ">
                                    <VscSettings />
                                </div>
                                <div className="px-4 ">

                                    <p className="text-xl">Filter</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-white  rounded-sm overflow-hidden ">

                                <div className="px-4 ">

                                    Showing 1–16 of 32 results
                                </div>
                            </div>
                            <div className="flex items-center bg-white  rounded-sm overflow-hidden ">
                                <div className="p-4 ">
                                    Show
                                </div>
                                <div className="p-4 background ">

                                    <p className="text-xl">16</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-white  rounded-sm overflow-hidden ">
                                <div className="p-4 ">
                                    Short by
                                </div>
                                <div className="p-4 background ">

                                    <p className="text-xl">Default</p>
                                </div>
                            </div>
                        </div>

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
                        {/* view all button */}

                    </div>
                </div>
            </div>

            <div className='w-full p-10 '>


                <div className="w-full flex justify-center text-center space-x-10">
                    <a href="#"
                        className="h-10 w-10 rounded-md bg-orange-500 hover:bg-orange-300 font-semibold text-white text-sm flex items-center justify-center">1
                    </a>
                    <a href="#"
                        className="h-10 w-10  rounded-md font-semibold text-gray-500 hover:bg-orange-500 hover:text-white text-sm flex items-center justify-center">2
                    </a>
                    <a href="#"
                        className="h-10 w-10  rounded-md font-semibold text-gray-500 hover:bg-orange-500 hover:text-white text-sm flex items-center justify-center">3
                    </a>
                    <a href="#"
                        className="h-10 w-10 rounded-md  font-semibold text-gray-500 hover:bg-orange-500 hover:text-white text-sm flex items-center justify-center">4
                    </a>
                    <a href="#"
                        className="h-10 w-10  rounded-md font-semibold text-gray-500 hover:bg-orange-500 hover:text-white text-sm flex items-center justify-center">
                        Next
                    </a>
                </div>
            </div>

        </div>
    )
}

export default Catagory
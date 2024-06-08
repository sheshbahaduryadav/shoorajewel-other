import React, { useState } from 'react'
import img17 from '../../assets/New folder/17.jpg'
import img18 from '../../assets/New folder/18.jpg'
import img19 from '../../assets/New folder/19.jpg'
import img20 from '../../assets/New folder/20.jpg'
import img22 from '../../assets/New folder/22.jpg'
import Products from '../New Arrival/NewArrival'



function Product() {

    const [subProfile, setSubProfile] = useState("");

    return (
        <div>
            <div className="p-10">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8 ">
                    <div className="flex flex-col md:flex-row -mx-4 ">
                        <div className="flex px-4 ">

                            <div>

                                <div className="">
                                    <div className="space-y-10 pt-3 ">

                                        <div className="">
                                            <img src={img17} className='h-28 w-20 rounded-lg' />
                                        </div>

                                        <div className="">
                                            <img src={img18} className='h-28 w-20 rounded-lg' />
                                        </div>

                                        <div className="">
                                            <img src={img19} className='h-28 w-20 rounded-lg' />
                                        </div>

                                        <div className="">
                                            <img src={img20} className='h-28 w-20 rounded-lg' />
                                        </div>

                                    </div>

                                </div>

                            </div>
                            <div className='md:flex-1 px-4 '>
                                <div className=" rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                    <img className="w-full h-full object-cover rounded-md" src={img18} alt="Product Image" />
                                </div>
                            </div>

                        </div>
                        <div className="md:flex-1 px-4  ">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">True Shape</h2>

                            <div className="flex mb-4">
                                <div className="mr-4 text-xl">
                                    <span className="text-gray-600 dark:text-gray-300">Rs 2000.00</span>
                                </div>

                            </div>
                            <div className="flex mb-4">
                                <button>
                                    <svg className="text-orange-500 w-5 h-auto fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
                                    </svg>
                                </button>

                                <button>
                                    <svg className="text-orange-500 w-5 h-auto fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
                                    </svg>
                                </button>

                                <button>
                                    <svg className="text-orange-500 w-5 h-auto fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
                                    </svg>
                                </button>

                                <button>
                                    <svg className="text-orange-500 w-5 h-auto fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z" />
                                    </svg>
                                </button>

                                <button className="mr-2">
                                    <svg className="text-orange-500 w-5 h-auto fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z" />
                                    </svg>
                                </button>

                                <span className="text-slate-400  font-medium pt-1">
                                    5 Customer Review
                                </span>
                            </div>

                            <div className="mb-4">
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur odio minus delectus ad fugiat dolore? Tempora dolore et ipsam quisquam, quia, ipsum dicta unde possimus quas officiis, laboriosam voluptatibus debitis!</p>
                            </div>



                            <div className="mb-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Size:</span>
                                <div className="flex items-center mt-2 space-x-2">
                                    <button className="h-10 w-10 rounded-md bg-orange-500 hover:bg-orange-300 font-semibold text-white text-sm flex items-center justify-center">S</button>
                                    <button className="h-10 w-10 rounded-md bg-orange-500 hover:bg-orange-300 font-semibold text-white text-sm flex items-center justify-center">M</button>
                                    <button className="h-10 w-10 rounded-md bg-orange-500 hover:bg-orange-300 font-semibold text-white text-sm flex items-center justify-center">L</button>
                                    <button className="h-10 w-10 rounded-md bg-orange-500 hover:bg-orange-300 font-semibold text-white text-sm flex items-center justify-center">XL</button>
                                    <button className="h-10 w-10 rounded-md bg-orange-500 hover:bg-orange-300 font-semibold text-white text-sm flex items-center justify-center">XXL</button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Color:</span>
                                <div className="flex items-center mt-2">
                                    <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                                    <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                                    <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                                    <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                                <div className="flex items-center mt-2">
                                    <span className="text-gray-600 dark:text-gray-300">In Stock</span>
                                </div>
                            </div>


                            <div className="flex -mx-2 mb-4">

                                <div className="flex items-center  ">
                                    <button className="h-10 w-10 rounded-md bg-orange-500 hover:bg-orange-300 font-semibold text-white text-sm flex items-center justify-center">-</button>
                                    <span className="text-center rounded  p-2  w-10">1</span>
                                    <button className="h-10 w-10 rounded-md bg-orange-500 hover:bg-orange-300 font-semibold text-white text-sm flex items-center justify-center">+</button>
                                </div>

                                <div className="w-1/2 px-2">
                                    <button className="h-10 w-full rounded-md bg-orange-500 hover:bg-orange-300 font-semibold text-white text-sm flex items-center justify-center">Add to Cart</button>
                                </div>

                                <div className="w-1/2 px-2">
                                    <button className="h-10 w-full rounded-md bg-orange-500 hover:bg-orange-300 font-semibold text-white text-sm flex items-center justify-center">Add to Wishlist</button>
                                </div>

                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                    sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                                    lorem rhoncus aliquet.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 justify-center text-center w-full ">

                <div className=" border-gray-300 border border-l-0 border-r-0 border-t-0  text-gray-700 dark:text-gray-400 text-md  w-full flex justify-center text-center ">
                    <div className="md:grid grid-cols-3 gap-4 md:grid-cols-3 p-2 lg:w-[50%] ">
                        <button type="button" className={` ${subProfile === "1" ? " text-orange-500   px-[1.2em] py-[0.6em] w-full duration-500 transition font-bold " : "bg-white text-gray-600 font-bold w-full  px-[1.2em] py-[0.6em] "}`} onClick={() => { setSubProfile("1") }}>DESCRIPTION</button>
                        <button type="button" className={` ${subProfile === "2" ? " text-orange-500   px-[1.2em] py-[0.6em] w-full duration-500 transition font-bold " : "bg-white text-gray-600 font-bold w-full  px-[1.2em] py-[0.6em] "}`} onClick={() => { setSubProfile("2") }}>INFORMATION</button>
                        <button type="button" className={` ${subProfile === "3" ? "  text-orange-500  px-[1.2em] py-[0.6em] w-full duration-500 transition font-bold " : "bg-white text-gray-600 font-bold w-full  px-[1.2em] py-[0.6em] "}`} onClick={() => { setSubProfile("3") }} >REVIEWS</button>
                    </div>
                </div>

                <div>

                    {subProfile === '1' && (

                        <div className=" justify-start text-left text-gray-500 p-6 mt-4 space-y-2">

                            <div className="relative p-4">
                                <div className="px-10">
                                    <div
                                        className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                                        <div className="">
                                            <p className="text-base leading-8 ">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                                industry's standard dummy text ever since the 1500s, when an unknown
                                            </p>

                                            <p className="text-base leading-8 my-5">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                                                and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>

                    )}


                    {subProfile === '2' && (

                        <div className=" justify-start text-left text-gray-300 p-6 mt-4 space-y-2">


                        </div>

                    )}


                    {subProfile === '3' && (

                        <div className=" justify-start text-left text-gray-700 p-6 mt-4 space-y-2">



                        </div>

                    )}

                </div>

            </div>

            <div className="flex pt-12  items-center justify-center bg-hero overflow-hidden ">
                <div className="flex w-full  ">
                    <div className=" flex justify-center text-center w-1/2   ">
                        <img src={img22} />
                    </div>
                    <div className=" flex justify-center text-center w-1/2   ">
                        <img src={img22} />
                    </div>
                </div>
            </div>

            <Products />

        </div>
    )
}

export default Product
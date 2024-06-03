import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import img5 from '../../assets/New folder/12.jpg'
import img18 from '../../assets/New folder/18.jpg'
import { MdDelete } from "react-icons/md";
import img13 from '../../assets/New folder/13.png'
import img14 from '../../assets/New folder/14.png'
import img15 from '../../assets/New folder/15.png'
import img16 from '../../assets/New folder/16.png'
import PreFooter from './PreFooter';

function Cart() {
    return (
        <div>
            <div className=' w-full'>
                <div className="relative flex justify-center text-center flex-col items-center  w-full lg:flex-row   bg-cover bg-center bg-no-repeat">
                    <div className="w-full ">
                        <img className=" w-full opacity-50 " src={img5} alt="Winding mountain road" />
                    </div>

                    <div className="    md:z-10 md:absolute  ">
                        <div className="flex flex-col">

                            <p className="font-medium uppercase text-orange-500 text-2xl sm:text-2xl md:text-4xl  lg:text-4xl xl:text-4xl">Cart</p>
                            <div className='flex w-full justify-center text-center'>
                                <p>Home </p>
                                <IoIosArrowForward className='m-1' />
                                <p>Cart</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className=" h-screen py-8">
                <div className="container mx-auto px-4">

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-3/4">
                            <div className="bg-white rounded-lg p-6 mb-4">
                                <table className="w-full">
                                    <thead className=''>
                                        <tr className='background '>
                                            <th className="text-left font-semibold p-4">Product</th>
                                            <th className="text-left font-semibold p-4">Price</th>
                                            <th className="text-left font-semibold p-4">Quantity</th>
                                            <th className="text-left font-semibold p-4">Total</th>
                                            <th className="text-left font-semibold p-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-4">
                                                <div className="flex items-center">
                                                    <img className="h-28 rounded-lg mr-4" src={img18} alt="Product image" />
                                                    <span className="font-semibold">True Shape</span>
                                                </div>
                                            </td>
                                            <td className="py-4">Rs 2000.00</td>
                                            <td className="py-4">
                                                <div className="flex items-center">

                                                    <span className="text-center w-14">1</span>

                                                </div>
                                            </td>
                                            <td className="py-4">Rs 2000.00</td>
                                            <td className="py-4 w-14 "><MdDelete className='h-8 w-8  text-red-500  ' /></td>

                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="md:w-1/4 pt-6">
                            <div className="background  shadow-md p-6">
                                <h2 className="text-lg font-semibold mb-4">Cart Totals</h2>
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold">Subtotal</span>
                                    <span>Rs. 1009.99</span>
                                </div>

                                <hr className="my-2" />
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold">Rs. 1009.99</span>
                                </div>
                                <div className="mt-8 flex justify-center text-center">
                                    <a href="#" className="inline-block w-full text-center text-lg font-medium cta  py-4 px-10 text-white hover:shadow-md md:w-48">
                                        Check Out</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          

        </div>
    )
}

export default Cart
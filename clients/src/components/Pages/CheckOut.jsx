import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import img5 from '../../assets/New folder/12.jpg'

function CheckOut() {
    return (
        <div>

            <div className=' w-full'>
                <div className="relative flex justify-center text-center flex-col items-center  w-full lg:flex-row   bg-cover bg-center bg-no-repeat">
                    <div className="w-full ">
                        <img className=" w-full opacity-50 " src={img5} alt="Winding mountain road" />
                    </div>

                    <div className="    md:z-10 md:absolute  ">
                        <div className="flex flex-col">

                            <p className="font-medium uppercase text-orange-500 text-2xl sm:text-2xl md:text-4xl  lg:text-4xl xl:text-4xl">Checkout</p>
                            <div className='flex w-full justify-center text-center'>
                                <p>Home </p>
                                <IoIosArrowForward className='m-1' />
                                <p>Checkout</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className=" dark:bg-gray-900">
                <div className="w-full max-w-3xl mx-auto p-8">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Checkout</h1>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Shipping Address</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="first_name" className="block text-gray-700 dark:text-white mb-1">First Name</label>
                                    <input type="text" id="first_name" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="block text-gray-700 dark:text-white mb-1">Last Name</label>
                                    <input type="text" id="last_name" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="address" className="block text-gray-700 dark:text-white mb-1">Address</label>
                                <input type="text" id="address" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                            </div>

                            <div className="mt-4">
                                <label htmlFor="city" className="block text-gray-700 dark:text-white mb-1">City</label>
                                <input type="text" id="city" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label htmlFor="state" className="block text-gray-700 dark:text-white mb-1">State</label>
                                    <input type="text" id="state" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                                </div>
                                <div>
                                    <label htmlFor="zip" className="block text-gray-700 dark:text-white mb-1">ZIP Code</label>
                                    <input type="text" id="zip" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Payment Information</h2>
                            <div className="mt-4">
                                <label htmlFor="card_number" className="block text-gray-700 dark:text-white mb-1">Card Number</label>
                                <input type="text" id="card_number" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label htmlFor="exp_date" className="block text-gray-700 dark:text-white mb-1">Expiration Date</label>
                                    <input type="text" id="exp_date" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                                </div>
                                <div>
                                    <label htmlFor="cvv" className="block text-gray-700 dark:text-white mb-1">CVV</label>
                                    <input type="text" id="cvv" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900">Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;

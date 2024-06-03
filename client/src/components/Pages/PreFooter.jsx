import React from 'react'
import img13 from '../../assets/New folder/13.png'
import img14 from '../../assets/New folder/14.png'
import img15 from '../../assets/New folder/15.png'
import img16 from '../../assets/New folder/16.png'

function PreFooter() {
    return (
        <div>

            <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8 bg-pink-100 p-10">
                <div className="flex items-center  overflow-hidden ">
                    <div className="">
                        <img src={img13} />
                    </div>
                    <div className="px-4 text-gray-700">
                        <p className="text-xl">High Quality</p>
                        <h3 className="text-sm tracking-wider">crafted from top materials</h3>
                    </div>
                </div>
                <div className="flex items-center  overflow-hidden ">
                    <div className="">
                        <img src={img14} />
                    </div>
                    <div className="px-4 text-gray-700">
                        <p className="text-xl">Warranty Protection</p>
                        <h3 className="text-sm tracking-wider">Over 2 years</h3>
                    </div>
                </div>
                <div className="flex items-center  overflow-hidden ">
                    <div className="">
                        <img src={img15} />
                    </div>
                    <div className="px-4 text-gray-700">
                        <p className="text-xl">Free Shipping</p>
                        <h3 className="text-sm tracking-wider">Order over ₹ 1500 </h3>
                    </div>
                </div>
                <div className="flex items-center  overflow-hidden ">
                    <div className="">
                        <img src={img16} />
                    </div>
                    <div className="px-4 text-gray-700">
                        <p className="text-xl">24 / 7 Support</p>
                        <h3 className="text-sm tracking-wider">Dedicated support</h3>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PreFooter
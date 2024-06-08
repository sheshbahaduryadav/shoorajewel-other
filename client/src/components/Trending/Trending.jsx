import React from 'react'
import trend1 from "../../assets/Trending/trend1.webp"
import trend2 from "../../assets/Trending/trend2.webp"
import trend3 from "../../assets/Trending/trend3.webp"
import trend4 from "../../assets/Trending/trend4.webp"
import trend5 from "../../assets/Trending/trend5.webp"
import trend6 from "../../assets/Trending/tend6.webp"
import styled from 'styled-components'

export const Trending = () => {

    return (
        <TrendWrapper className='py-16'>
            <div className="text-center  text-highlight font-medium text-3xl pb-10">
                Trending <span className='text-color underline font-bold'>on Rohit Jewellers</span>

            </div>
            <div className='grid grid-cols-3 gap-8 px-8'>
                <div className=''>
                    <div className="h-60 overflow-hidden  rounded-xl">
                        <div className='trend1 overflow-hidden h-60 transition-all duration-1000 rounded-xl cursor-pointer hover:scale-110'></div>
                    </div>
                    <h4 className='text-center font-medium mt-2'>Traditional Necklaces</h4>
                </div>

                <div className=''>
                    <div className="h-60 overflow-hidden  rounded-xl">
                        <div className='trend2 overflow-hidden h-60 transition-all duration-1000 rounded-xl cursor-pointer hover:scale-110'></div>
                    </div>
                    <h4 className='text-center font-medium mt-2'>Traditional Necklaces</h4>
                </div>


                <div className=''>
                    <div className="h-60 overflow-hidden  rounded-xl">
                        <div className='trend3 overflow-hidden h-60 transition-all duration-1000 rounded-xl cursor-pointer hover:scale-110'></div>
                    </div>
                    <h4 className='text-center font-medium mt-2'>Traditional Necklaces</h4>
                </div>


                <div className=''>
                    <div className="h-60 overflow-hidden  rounded-xl">
                        <div className='trend4 overflow-hidden h-60 transition-all duration-1000 rounded-xl cursor-pointer hover:scale-110'></div>
                    </div>
                    <h4 className='text-center font-medium mt-2'>Traditional Necklaces</h4>
                </div>


                <div className=''>
                    <div className="h-60 overflow-hidden  rounded-xl">
                        <div className='trend5 overflow-hidden h-60 transition-all duration-1000 rounded-xl cursor-pointer hover:scale-110'></div>
                    </div>
                    <h4 className='text-center font-medium mt-2'>Traditional Necklaces</h4>
                </div>


                <div className=''>
                    <div className="h-60 overflow-hidden  rounded-xl">
                        <div className='trend6 overflow-hidden h-60 transition-all duration-1000 rounded-xl cursor-pointer hover:scale-110'></div>
                    </div>
                    <h4 className='text-center font-medium mt-2'>Traditional Necklaces</h4>
                </div>

            </div>
        </TrendWrapper>
    )
}

const TrendWrapper = styled.div`
.trend1{
background-image: url(${trend1});
background-size: 100% 100%;
background-position: center;
background-repeat: no-repeat;

}
.trend2{
background-image: url(${trend2});
background-size: 100% 100%;
background-position: center;
background-repeat: no-repeat;
}
.trend3{
background-image: url(${trend3});
background-size: 100% 100%;
background-position: center;
background-repeat: no-repeat;
}
.trend4{
background-image: url(${trend4});
background-size: 100% 100%;
background-position: center;
background-repeat: no-repeat;
}
.trend5{
background-image: url(${trend5});
background-size: 100% 100%;
background-position: center;
background-repeat: no-repeat;
}
.trend6{
background-image: url(${trend6});
background-size: 100% 100%;
background-position: center;
background-repeat: no-repeat;
}
`

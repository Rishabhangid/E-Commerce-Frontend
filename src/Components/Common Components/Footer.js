import React, { useContext } from 'react'
import { AppConsumer } from '../../Context/AppContext'

import LOGO from "../../img/flogo.png"
import { Link, useNavigate } from 'react-router-dom'




export default function Footer() {
  const navigate = useNavigate()
  return (
    <div className='grid grid-cols-1 md:grid-cols-[30%_70%] bg-black text-white pb-6 md:pb-0'>

      <div className='p-10 flex flex-col justify-start gap-3 '>
        <img src={LOGO} alt="imagelogo" className='w-[200px] bg-white p-2 rounded-lg' />
        <p className='text-[14px] '>Your ultimate lightning-fast shopping companion, delivering a <span onClick={()=>navigate("/adminlogin")} >seamless</span>, efficient, and hassle-free online shopping experience at the speed of light!</p>
        <p className='text-[14px] '>Contact : +91 7073108954</p>
      </div>

      <div className='grid grid-cols-3'>
        <div className=' flex flex-col gap-1  pl-6 justify-center items-start'>
          <p className='font-bold text-yellow-400 text-[16px] mb-2'>Explore</p>
          <p className='mb-0 text-[14px] hover:text-gray-300'>Phone</p>
          <p className='mb-0 text-[14px] hover:text-gray-300'>Electronics</p>
          <p className='mb-0 text-[14px] hover:text-gray-300'>Tshirts</p>
          <p className='mb-0 text-[14px] hover:text-gray-300'>Jeans</p>
        </div>


        <div className=' flex flex-col gap-1 justify-center items-start pl-6 '>
          <p className='font-bold text-[16px] text-yellow-400 mb-2'>Products</p>
          <p className='mb-0 text-[14px] hover:text-gray-300'>Phone</p>
          <p className='mb-0 text-[14px] hover:text-gray-300'>Electronics</p>
          <p className='mb-0 text-[14px] hover:text-gray-300'>Tshirts</p>
          <p className='mb-0 text-[14px] hover:text-gray-300'>Jeans</p>
        </div>


        <div className=' flex flex-col gap-1 justify-center items-start pl-6 '>
          <p className='font-bold text-[16px] text-yellow-400 mb-2'>Company</p>
          <p className='mb-0 text-[14px] hover:text-gray-300'>About Us</p>
          <Link to="/contact" className='mb-0 text-[14px] text-white hover:text-gray-300 no-underline'>Contact Ous</Link>
          <Link to="/contact" className='mb-0 text-[14px] text-white hover:text-gray-300 no-underline'>Report Bug</Link>
          {/* <p className='mb-0 text-[14px] hover:text-gray-300'>Report Bug</p> */}
          {/* <p className='mb-0 text-[14px]'>Jeans</p> */}
        </div>


      
      </div>

    </div>
  )
}

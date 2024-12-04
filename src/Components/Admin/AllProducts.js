import React, { useContext } from 'react'
import { AppConsumer } from '../../Context/AppContext'

export default function AllProducts() {
    const { allProducts } = useContext(AppConsumer)
    console.log(allProducts)
    return (
        <div className='p-10 max-w-[1400px] m-auto '>
            <div className='flex flex-col items-center'>
                <p className='text-center text-black font-bold text-[30px] mb-0'>All Products</p>
                <p className='font-semibold'>You can edit, delete the product here.</p>
            </div>

            {
                allProducts.length > 0 ? (
                    allProducts.map((item) => (
                        <div className=' grid grid-cols-3 h-[100px] shadow-sm mb-3  bg-slate-100'>
                            <div className='flex items-center p-2 gap-3'>
                                <img src={item.image} alt="logo" className='w-[80px] rounded-lg ' />
                                <div>
                                    <div className='font-bold text-[16px]'>{item.title}</div>
                                    <div className='font-semibold text-[16px]'>{item.catagory}</div>
                                    <div className='font-normal text-[16px] truncate w-[250px]'>{item.description}</div>
                                </div>
                            </div>

                            <div className='p-2 text-black flex items-center justify-center  font-medium text-[16px]'>₹{item.price}</div>

                            <div className='flex gap-4 p-2 items-center justify-center  text-black font-medium text-[16px]'>
                                <button className='p-2 rounded-lg bg-black text-white h-[60%]'>Update Product</button>
                                <button className='p-2 rounded-lg bg-white text-black border-2 border-black h-[60%]'>Delete Product</button>
                            </div>

                            {/* {  grand_total += item.qty * item.price} */}
                            {/* <div className='p-2 text-yellow-500 font-bold text-[16px] self-center'>₹ {item.qty * item.price}</div> */}
                        </div>
                    ))
                ) : ("no products")
            }
        </div>
    )
}

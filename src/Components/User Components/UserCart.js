import React, { useContext } from 'react'
import { AppConsumer } from '../../Context/AppContext'
import { AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';



export default function UserCart() {
    const { usercart, update_cart, delete_product, clear_cart,grand_sum ,sumprice} = useContext(AppConsumer)
    // console.log(usercart)
    // let sumprice = 0;
    // let grand_total = usercart.map((item) => sumprice += item.price)
    // console.log(sumprice)

    const handle_add_to_cart = async (productId, action, title, price, qty, img) => {
        console.log(productId, action, title, price, qty, img)
        const updated_cart = await update_cart(productId, action, title, price, qty, img)
        if (update_cart.success) {
            console.log("Cart Updated.", update_cart)
        }
        console.log("Cart not updated.")
    }

    const handle_delete_product = async (id) => {
        console.log("user cart secondary", id)
        const remove_product = await delete_product(id)
        console.log("response after api hit", remove_product)
    }

    const handle_clear_cart = async () => {
        console.log("deleting compllete cart",)
        const delete_cart = await clear_cart()
        console.log("response after api hit", delete_cart)
    }

    return (
        <div className=' p-10'>
            <p className='font-bold text-[36px]  text-center mb-4' style={{ color: '#1A1A1A' }}>Your Cart</p>
            {
                usercart.length > 0 ?  (
                    <>



                        <div className='grid grid-cols-[40%_15%_15%_15%_15%] shadow-lg mb-3 p-2 bg-black rounded-lg text-white'>
                            <div className=' font-semibold p-2'>Item</div>
                            <div className=' font-semibold p-2'>Price</div>
                            <div className=' font-semibold p-2'>Quanity</div>
                            <div className=' font-semibold p-2'>Delete</div>
                            <div className=' font-semibold p-2'>Total</div>
                        </div>

                        {
                            usercart.map((item) => (
                                <div className=' grid grid-cols-[40%_15%_15%_15%_15%] shadow-sm mb-3  bg-slate-100'>
                                    <div className=' flex items-center p-2 gap-3'>
                                        <img src={item.img} alt="logo" className='w-[80px] rounded-lg ' />
                                        <div className='font-semibold text-[16px]'>{item.title}</div>

                                        {/* <div className='font-semibold text-[16px]'>{item.p}</div> */}
                                    </div>
                                    <div className='p-2 text-black self-center font-medium text-[16px]'>₹{item.price}</div>
                                    <div className=' p-2 flex justify-start gap-10 items-center font-semibold text-[16px]'>
                                        <button onClick={() => handle_add_to_cart(item.productId, "increase", item.title, item.price, item.qty, item.img)} className=' font-extrabold text-[20px]'>+</button>
                                        <p className='bg-black text-white p-1  font-medium rounded-lg w-[50px] text-center'>{item.qty}</p>
                                        <button onClick={() => handle_add_to_cart(item.productId, "decrease", item.title, item.price, item.qty, item.img)} className=' font-extrabold text-[20px]'>-</button>
                                    </div>
                                    {/* Delete Product Button */}
                                    <div className='p-2 self-center text-black font-medium text-[16px]'><AiFillDelete size={25} onClick={() => handle_delete_product(item.productId)} color='black' /></div>

                                    {/* {  grand_total += item.qty * item.price} */}
                                    <div className='p-2 text-yellow-500 font-bold text-[16px] self-center'>₹ {item.qty * item.price}</div>
                                </div>
                            ))
                        }
                        <p onClick={() => handle_clear_cart()} className=" flex justify-end font-medium hover:text-yellow-400 transition duration-200 cursor-pointer p-1">Clear Cart</p>

                        <div className='flex justify-end p-3'>
                            <div className='flex flex-col items-center p-2'>
                                <p className='text-[22px] font-medium text-yellow-400'> <span className='text-black font-semibold'>Total Amount :</span>    ₹{sumprice}</p>
                                <Link to="/checkout"  className='no-underline text-black text-center bg-yellow-400 border-2 border-yellow-400 hover:bg-white hover:text-yellow-400 transition duration-300 p-2 rounded-lg font-medium w-[200px]'>CheckOut</Link>
                            </div>
                        </div>
                    </>
                ):
            (
               <div className='flex flex-col items-center'>
                <p className='font-medium text-[16px] text-center text-slate-600' style={{ color: '#777777' }}>  Your cart feels a little lonely. Start shopping now and fill it with your favorites! </p>
                <Link to="/" className='font-medium text-[16px] border-2 border-yellow-400 hover:bg-white transition duration-300 bg-yellow-400 px-3 py-2 rounded-lg no-underline text-black  ' >  Shop Now </Link>
                

               </div>
            )
}


        </div>
    )
}

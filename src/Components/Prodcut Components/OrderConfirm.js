import React, { useContext } from 'react'
import { AppConsumer } from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom'


export default function OrderConfirm() {
    const navigate = useNavigate()
    const { userorder } = useContext(AppConsumer)
    console.log(userorder)
    console.log(userorder.order_items)

    return (
        <div className='max-w-[1400px] m-auto  p-10 flex flex-col items-center gap-6'>
            <div className=' flex flex-col items-center'>
                <p className='font-bold text-[36px]  text-center mb-0' style={{ color: '#1A1A1A' }}>Your order is placed!</p>
                <p className='font-medium text-[16px] text-center text-slate-600' style={{ color: '#777777' }}>Relax, we'll take it from here and get it to you soon.</p>
            </div>
            <div className=' grid grid-cols-2 shadow-lg'>
                <div className=' p-6 '>
                    <p className='font-bold text-[28px]  text-center mb-6' style={{ color: '#1A1A1A' }}>Ordered items</p>
                    {
                        userorder.order_items.length > 0 ?
                            (

                                userorder.order_items.map((item) => (
                                    // <p>{item.title}</p>
                                    <div className='flex gap-3 justify-evenly items-center mb-4'>
                                        <img src={item.img} alt="ii" className='w-[80px] rounded-xl' />
                                        <p className='font-semibold text-[16px]'>{item.title}</p>
                                        <p className='font-semibold text-[16px]'>{item.qty}</p>
                                        <p className='p-2 text-green-600   font-bold text-[16px]'>₹{item.price}</p>
                                    </div>
                                ))

                            )
                            :
                            (<p className='font-bold text-[36px]  text-center mb-0' style={{ color: '#1A1A1A' }}>No Itmes </p>)
                    }

                    {/* {
                        userorder.order_items.length > 0 ? (
                            userorder.order_items.map((item, index) => (
                                <p key={index}>{item.title}</p>
                            ))
                        ) : (
                            <p>No Items</p>
                        )
                    } */}

                </div>

                <div className=' p-6'>
                    <p className='font-bold text-[28px]  text-center mb-6' style={{ color: '#1A1A1A' }}>Order Details</p>
                    <p className='font-semibold' style={{color: '#555555'}}> <span className='text-black font-semibold'>Order ID : </span> {userorder.order_ID}</p>
                    <p className='font-semibold' style={{color: '#555555'}}> <span className='text-black font-semibold'>Payment ID : </span> {userorder.payment_ID}</p>
                    <p className='font-semibold' style={{color: '#555555'}}> <span className='text-black font-semibold'>Payment Status : </span> {userorder.payStatus}</p>
                    <p className='font-semibold' style={{color: '#555555'}}> <span className='text-black font-semibold'>Order Data : </span> {userorder.orderDate}</p>
                    <p className='font-semibold' style={{color: '#555555'}}> <span className='text-black font-semibold'>Name : </span> {userorder.user_shipping[0].fullname}</p>
                    <p className='font-semibold' style={{color: '#555555'}}> <span className='text-black font-semibold'>Mobile Number : </span> {userorder.user_shipping[0].number}</p>
                    <p className='font-semibold' style={{color: '#555555'}}> <span className='text-black font-semibold'>Address : </span> {userorder.user_shipping[0].city}, {userorder.user_shipping[0].state}, {userorder.user_shipping[0].country}, {userorder.user_shipping[0].pincode}</p>

                    {/* <p className='font-semibold' style={{color: '#555555'}}> <span className='text-black font-semibold'>XYZ : </span> {userorder.user_shipping[0].country}</p> */}
                    <p className='font-semibold' style={{color: '#555555'}}> <span className='text-black font-semibold'>Landmark : </span> {userorder.user_shipping[0].address}</p>

                </div>
            </div>

            <div className='flex gap-4'>
                <button  className="bg-white text-black  hover:bg-black border-2 border-black  px-4 py-2 rounded-lg text-center">All Orders</button>
                <button onClick={()=>navigate("/")} className="bg-black text-white  hover:bg-white  px-4 py-2 rounded-lg text-center">Continue Shopping</button>
            </div>
        </div>
    )
}
// orderDate
// :
// "2024-12-02T06:17:43.989Z"
// order_ID
// :
// "order_PSCp24cLBfoA2N"
// order_amount
// :
// 15850
// order_items
// :
// (2) [{…}, {…}]
// payStatus
// :
// "paid"
// payment_ID
// :
// "pay_PSCp8KSYMZAWeQ"
// payment_signature
// :
// "62253fe2d168161d5604c329bcb40c5cf475f6320e5ce1f134c24d208410c9cb"
// user_ID
// :
// "674768f47f669167e4dfc8c5"
// user_shipping
// :
// [{…}]
// __v
// :
// 0
// _id
// :
// "674d51076441a1e99e7494c1"
// [[Prototype]]
// :
// Object

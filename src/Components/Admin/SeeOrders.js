import React, { useContext, useEffect, useState } from 'react'
import { AppConsumer } from '../../Context/AppContext'

export default function SeeOrders() {

    const { BACKEND_URL } = useContext(AppConsumer)
    const [orders, setOrders] = useState([])


    useEffect(() => {
        const fetch_all_orders = async () => {
            const token = localStorage.getItem("admintoken");
            console.log("Admin token to send to backend", token)
            try {
                const response = await fetch(`${BACKEND_URL}allorder`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // sending token to backend 

                    }
                })
                if (!response.ok) {
                    console.log("res not okay", response.statusText)
                }
                const data = await response.json()
                if (data.success) {
                    // window.alert("sare orders aa gye.")
                    // console.log("sare orders :", data.orders)
                    setOrders(data.orders)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        fetch_all_orders()
    },[])

    return (
        <div className=' max-w-[1400px] m-auto'>
            <div className='flex flex-col items-center p-6'>
                <p className='text-center text-black font-bold text-[30px] mb-0'>All Orders</p>
                <p className='font-medium text-center'>All the orders placed by the customers are shown here.</p>
            </div>



            <div className=' '>
                <div className='grid grid-cols-[25%_25%_40%_10%] bg-black text-white p-2 rounded-lg '>
                    <p className='font-bold'>Order & Payment  ID</p>
                    <p className='font-bold'>Amount</p>
                    <p className='font-bold'>Products </p>
                    <p className='font-bold'>Status </p>
                </div>
                <div className=''>
                    {
                        orders.length > 0 ? (
                            orders.map((item) => (
                                <div className='border-2 mb-3 mt-3 bg-slate-100 rounded-lg grid items-center  grid-cols-[25%_25%_40%_10%]'>
                                    <div>
                                        <p className='p-2  font-normal '><span className='font-bold'>OID:</span> {item.order_ID}</p>
                                        <p className='p-2 font-normal '><span className='font-bold'>PID:</span> {item.payment_ID}</p>
                                    </div>
                                    <div>
                                        <p className='p-2 font-normal text-green-600 '>{item.payStatus}</p>
                                        <p className='p-2 font-normal '>{item.order_amount}</p>
                                    </div>
                                    <div>
                                        {
                                            item.order_items.map((content) => (
                                                <div className='grid grid-cols-[30%_10%_20%] items-center p-2'>
                                                    <p className='font-normal '>{content.title}</p>
                                                    <p className='font-normal '>{content.qty}</p>
                                                    {/* <p className=''>{content.productId}</p> */}
                                                    <img src={content.img} alt="lolo" className='rounded-lg  w-[100px]' />

                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div>
                                        <span className='p-2 rounded-lg text-white bg-green-600'>Delivered</span>
                                    </div>


                                </div>
                            ))
                        ) : ("hy")
                    }

                </div>
            </div>

        </div>
    )
}

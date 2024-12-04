import React, { useContext, useEffect } from 'react'
import { AppConsumer } from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom';

export default function OrderSummery() {
  const navigate = useNavigate()
  const { usercart, grand_total, sumprice, fetch_address, hasaddress, BACKEND_URL, userid, token, setUsercart } = useContext(AppConsumer)
  console.log(usercart)
  // console.log(token)
  console.log(hasaddress)

  const handlePayment = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}payment`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: token, // sending token to backend 
        },
        // amount, cartItmes, userShipping, userId
        body: JSON.stringify({ amount: sumprice, cartItems: usercart, userShipping: hasaddress, userId: userid })
      })
      if (!response.ok) {
        console.log("res not okay", response.statusText)
      }
      const data = await response.json()
      console.log("payment route hitted succesfully")
      const { orerId, amount } = data
      console.log("Destructured data", orerId, amount)
      console.log(data)

      // Open Razorpay Checkout
      const options = {
        // key: 'Og3WlQQcVZ5qr1ZZP5UacAhu', // Replace with your Razorpay key_id
        key: 'rzp_test_gHH711O4gcSjCq', // Replace with your Razorpay key_id
        amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Acme Corp',
        description: 'Test Transaction',
        order_id: orerId, // This is the order_id created in the backend
        callback_url: 'http://localhost:3000/', // Your success URL
        handler: async function (response) {
          alert("Payment ID : " + response.razorpay_payment_id)
          alert("Order ID : " + response.razorpay_order_id)
          // alert("Signature : " + response.razorpay_signature)

          const payment_data = {
            order_ID: response.razorpay_order_id,
            payment_ID: response.razorpay_payment_id,
            payment_signature: response.razorpay_signature,
            order_amount: amount,
            order_items: usercart,
            user_ID: userid,
            user_shipping: hasaddress
          }
          try {

            const send_data = await fetch(`${BACKEND_URL}verifypayment`,
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  // Authorization: token, // sending token to backend 
                },
                // amount, cartItmes, userShipping, userId
                body: JSON.stringify(payment_data)
              })
            if (!send_data.ok) {
              console.log("res not okay", response.statusText)
            }

            const data = await send_data.json()
            console.log(data)
            if (data.success) {
              console.log("payment done succesfully")
              navigate("/orderconfirm")
            }


          }
          catch (error) {
            console.log("Payment failed....")
            console.log(error)
          }

        },
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();



    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='max-w-[1400px] m-auto p-6'>
      <p className='font-bold text-[36px]  text-center mb-1' style={{ color: '#1A1A1A' }}>Order Summery</p>
      <p className='font-medium text-[16px] text-center text-slate-600 mb-10' style={{ color: '#777777' }}>Review your order details below, including the items and total price. Ensure everything is correct before proceeding to payment!</p>
      <div className='grid grid-cols-2 m-auto gap-2 '>
        <div className=' p-3 shadow-xl'>
          {
            usercart.length > 0 ?
              (
                usercart.map((item) => (
                  <div className='flex gap-3 justify-evenly items-center mb-4'>
                    <img src={item.img} alt="ii" className='w-[80px] rounded-xl' />
                    <p className='font-semibold text-[16px]'>{item.title}</p>
                    <p className='font-semibold text-[16px]'>{item.qty}</p>
                    <p className='p-2 text-green-600   font-bold text-[16px]'>₹{item.price}</p>
                  </div>
                ))

              )

              : (
                <div>
                  <p >Empty User Cart</p>
                </div>
              )
          }
        </div>
        <div className=' flex flex-col gap-10 justify-center items-center shadow-xl'>
          <div className=''>
            <p className='font-semibold text-[20px] mb-3  text-center' style={{ color: '#1A1A1A' }}>Shipping Address <span onClick={() => navigate("/checkout")} className='bg-yellow-400 p-1 rounded-lg text-[16px] cursor-pointer'>Edit</span></p>
            <p style={{ color: '#1A1A1A' }} className='font-normal mb-0'>{hasaddress[0].fullname}</p>
            <p style={{ color: '#1A1A1A' }} className='font-normal mb-0'>{hasaddress[0].number}, {hasaddress[0].alt_number}</p>
            <p style={{ color: '#1A1A1A' }} className='font-normal mb-0'>{hasaddress[0].city}, {hasaddress[0].state}, {hasaddress[0].country}, {hasaddress[0].pincode}</p>
            <p style={{ color: '#1A1A1A' }} className='font-normal mb-0'>{hasaddress[0].address}</p>
          </div>
          <p className='font-bold text-[30px]  text-center mb-1 ' style={{ color: '#1A1A1A' }}>Grand Total :<span className='text-green-500'> ₹{sumprice}</span></p>
        </div>
      </div>
      <div className='flex'>
        <button onClick={() => navigate("/user/cart")} className=' mt-4 m-auto bg-black text-white  hover:bg-white hover:text-black p-3 rounded-lg '>Edit Cart</button>
        <button onClick={() => handlePayment()} className=' mt-4 m-auto bg-black text-white  hover:bg-white hover:text-black p-3 rounded-lg '>Proceed to Payment</button>
      </div>
    </div>
  )
}

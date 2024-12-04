import React, { useContext, useState } from 'react'
import { AppConsumer } from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom'
// import Address from '../../../../backend/db_modals/addressSchema'

export default function CheckOut() {
    const navigate = useNavigate()

    const { save_address, fetch_address, hasaddress, BACKEND_URL } = useContext(AppConsumer)
    // console.log(fetch_address)
    // const [address, setAddress] = useState({ fname: hasaddress[0].fullname || "", lname: hasaddress[0].fullname || "", city: hasaddress[0].city || "", state: hasaddress[0].state || "", pincode: hasaddress[0].pincode || "", country: hasaddress[0].country || "", mobile_no: hasaddress[0].number || "", alt_no: hasaddress[0].alt_nu || "", add: hasaddress[0].address || "" })
    const [address, setAddress] = useState(() => {
        if (hasaddress && hasaddress.length > 0) {
          return {
            fname: hasaddress[0].fullname || "",
            lname: hasaddress[0].fullname || "",
            city: hasaddress[0].city || "",
            state: hasaddress[0].state || "",
            pincode: hasaddress[0].pincode || "",
            country: hasaddress[0].country || "",
            mobile_no: hasaddress[0].number || "",
            alt_no: hasaddress[0].alt_number || "",
            add: hasaddress[0].address || "",
          };
        }
        return {
          fname: "",
          lname: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
          mobile_no: "",
          alt_no: "",
          add: "",
        };
      });
    
    const handle_data = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value })
    }

    const send_address = async (e) => {
        e.preventDefault()
        const { fname, lname, city, state, pincode, country, mobile_no, alt_no, add } = address
        if (!fname || !lname || !city || !state || !pincode || !country || !mobile_no || !alt_no || !add) {
            window.alert("Empty Feilds")
        }
        else {
            console.log(fname, lname, city, state, pincode, country, mobile_no, alt_no, add)
            try {
                const response = await save_address(fname, lname, city, state, pincode, country, mobile_no, alt_no, add)               
                if (response.success) {
                    console.log("Address saved.")
                    window.alert("Address saved.")
                    console.log(response)
                    navigate("/ordersummery")
                }
                else{
                    console.log("Address not saved.")
                    window.alert("Address not saved.")
                }
            }
            catch (error) {
                alert("Address Not Saved.")
                console.log(error)
            }
        }
    }

    const check_before_proceed = async ()=>{
       
        const { fname, lname, city, state, pincode, country, mobile_no, alt_no, add } = address
        if (!fname || !lname || !city || !state || !pincode || !country || !mobile_no || !alt_no || !add) {
            window.alert("Empty Feilds")
        }
        else{
            navigate("/ordersummery")
        }
    }

    




    return (
        <div className='max-w-[1400px] m-auto  p-10'>
            <p className='font-bold text-[36px]  text-center mb-1' style={{ color: '#1A1A1A' }}>Checkout</p>
            <p className='font-medium text-[16px] text-center text-slate-600' style={{ color: '#777777' }}> Provide your address to ensure a smooth and timely delivery of your products! </p>

            <div className=' flex flex-col gap-3'>
                <form onSubmit={send_address} className=' flex flex-col gap-3 p-3' style={{ color: '#555555' }}>
                    <div className='grid grid-cols-2 gap-3'>
                        <input onChange={handle_data} name="fname" value={address.fname} className='focus:outline-yellow-400 p-2 rounded-lg gap-3d-lg border-2' type="text" placeholder='First Name ' />
                        <input onChange={handle_data} name="lname" value={address.lname} className='focus:outline-yellow-400 p-2 rounded-lg border-2' type="text" placeholder='Last Name ' />
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <input onChange={handle_data} name="city" value={address.city} className='focus:outline-yellow-400 p-2 rounded-lg gap-3d-lg border-2' type="text" placeholder='City' />
                        <input onChange={handle_data} name="state" value={address.state} className='focus:outline-yellow-400 p-2 rounded-lg gap-3d-lg border-2' type="text" placeholder='State ' />
                        <input onChange={handle_data} name="pincode" value={address.pincode} className='focus:outline-yellow-400 p-2 rounded-lg border-2' type="text" placeholder='Pin Code' />
                        <input onChange={handle_data} name="country" value={address.country} className='focus:outline-yellow-400 p-2 rounded-lg gap-3d-lg border-2' type="text" placeholder='Country' />
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <input onChange={handle_data} name="mobile_no" value={address.mobile_no} className='focus:outline-yellow-400 p-2 rounded-lg gap-3d-lg border-2' type="text" placeholder='Phone Number' />
                        <input onChange={handle_data} name="alt_no" value={address.alt_no} className='focus:outline-yellow-400 p-2 rounded-lg border-2' type="text" placeholder='Alternate Phone Number' />

                    </div>
                    <div>
                        <textarea onChange={handle_data} name="add" value={address.add} placeholder='Shipping Address' className='focus:outline-yellow-400  h-[150px] border-2 rounded-lg p-2 w-full'></textarea>
                    </div>
                    <div className='flex justify-center gap-3'>
                        <input  onClick={()=>check_before_proceed()}  className='bg-black hover:bg-white text-white hover:text-black border-2 border-black p-3 rounded-lg transition-colors duration-300 ' type="submit" value="Proceed to Payment" placeholder='Alternate Phone Number' />
                        {
                            hasaddress.length > 0 ?
                             (
                                <input onClick={()=>navigate("/ordersummery")} className='hover:bg-black text-black hover:text-white  p-3 rounded-lg border-2 border-black' type="button" value="Use Old Address" placeholder='Alternate Phone Number' />

                             ) 

                            :("")
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

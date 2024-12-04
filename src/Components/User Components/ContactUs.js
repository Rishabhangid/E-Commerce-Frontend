import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppConsumer } from '../../Context/AppContext'

export default function ContactUs() {
    const navigate = useNavigate()
    const handleChange = (e) => { setContactdata({ ...contactdata, [e.target.name]: e.target.value }) }   // handling form data
    const [contactdata, setContactdata] = useState({ name: "", email: "", number: "", message: "" }) // form data
    const { login_user, BACKEND_URL } = useContext(AppConsumer)  // importing login function from context 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, number, message } = contactdata

        if (!name || !email || !number || !message) {
            window.alert("Empty Feilds")
        }
        else {
            console.log("User data to contact")
            console.log(name, email, number, message)
            try {
                const response = await fetch(`${BACKEND_URL}contact`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, number, message })
                })
                if (!response.ok) {
                    console.log("res not okay", response.statusText)
                }
                const data = await response.json()
                console.log(data)
                if(data.success){
                    window.alert("We will contact you.")
                }
                else{
                    window.alert("Try Later.") 
                }
                // return data

            }
            catch (error) {
                console.log(error)
            }
        }



    }





    return (
        <div className='border-2 flex flex-col items-center p-6'>
            <p className='font-bold text-[36px]  text-center mb-4' style={{ color: '#1A1A1A' }}>Contact Us</p>
            <p className='font-medium text-[16px] text-center text-slate-600' style={{ color: '#777777' }}>Have questions or need assistance? We’re here to help—reach out to us, and we’ll get back to you in no time!</p>
            <form className='flex flex-col gap-2 w-[600px] p-6' onSubmit={handleSubmit}>
                <input name="name" onChange={handleChange} value={contactdata.name} type="text" placeholder='Enter Name' className='w-[95vw] m-auto md:w-full  border-2 p-3 rounded-lg font-normal  focus:outline-yellow-500' style={{ color: '#555555' }} />
                <input name="email" onChange={handleChange} value={contactdata.email} type="email" placeholder='Email Address' className=' w-[95vw] m-auto md:w-full border-2 p-3 rounded-lg font-normal focus:outline-yellow-500' style={{ color: '#555555' }} />
                <input name="number" onChange={handleChange} value={contactdata.number} type="number" placeholder='Mobile Number' className=' w-[95vw] m-auto md:w-full border-2 p-3 rounded-lg font-normal focus:outline-yellow-500' style={{ color: '#555555' }} />
                <textarea placeholder='Enter your quory' name="message" onChange={handleChange} value={contactdata.message} className='w-[95vw] m-auto md:w-full border-2 p-3 rounded-lg font-normal focus:outline-yellow-500' style={{ color: '#555555' }} ></textarea>
                <input type="submit" value="Submit" className='w-[95vw] m-auto md:w-full bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg py-3' />

            </form>


        </div>
    )
}

import React, { useContext, useState } from 'react'
import LOGO from "../../img/logo.png" // impoorting logo
import {  useNavigate } from 'react-router-dom'
import { AppConsumer } from '../../Context/AppContext'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AdminLogin() {

  const notify = () => {
    toast.success("Admin successfully logged in.", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const navigate = useNavigate()
  const { BACKEND_URL, setToken, setAdmintoken } = useContext(AppConsumer)


  const [logindata, setLogindata] = useState({ email: "", password: "" }) // form data
  const handleChange = (e) => { setLogindata({ ...logindata, [e.target.name]: e.target.value }) }   // handling form data
  // login from submit handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = logindata
    console.log(email, password)

    try {
      const response = await fetch(`${BACKEND_URL}adminlogin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        console.log("res not okay", response.statusText)
      }
      const data = await response.json()
      if (data.success) {
        console.log(data.token)
        localStorage.setItem('admintoken', data.token)
        setAdmintoken(data.token)
        notify()
        // window.alert("Login Done")
        navigate("/adminpage")
      }
      else{
        window.alert("Login Failed")
      }

    }
    catch (error) {
      console.log(error)
    }

  }



  return (
    <div className='flex justify-center items-center h-screen border-2'>
      <div className=' flex flex-col justify-center items-center gap-1 p-3'>
        <img src={LOGO} alt="logo" className='w-[80px]' />
        <p className='text-[30px] font-extrabold mb-0' style={{ color: '#1A1A1A' }}>Admin Login</p>
        <p className='text-[18px] font-semibold' style={{ color: '#555555' }}>Do not share your credetials to anyone.</p>
        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
          <input name="email" onChange={handleChange} value={logindata.email} type="text" placeholder='Enter Email' className='  border-2 p-3 rounded-lg font-semibold' style={{ color: '#555555' }} />
          <input name="password" onChange={handleChange} value={logindata.password} type="password" placeholder='Enter Password' className='border-2 p-3 rounded-lg font-semibold' style={{ color: '#555555' }} />
          {/* <p style={{ color: '#555555' }} className='self-end'>Forgot Password</p> */}
          <input type="submit" value="Login" className='bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg py-3' />
        </form>
      </div>
    </div>
  )
}

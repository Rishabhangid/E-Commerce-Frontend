import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppConsumer } from '../../Context/AppContext' // importing the Consumer to use cintext data
import LOGO from "../../img/logo.png" // impoorting logo


export default function Login() {

  const navigate = useNavigate()
  const { login_user } = useContext(AppConsumer)  // importing login function from context 
  const [logindata, setLogindata] = useState({ email: "", password: "" }) // form data
  const handleChange = (e) => { setLogindata({ ...logindata, [e.target.name]: e.target.value }) }   // handling form data
  // login from submit handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = logindata
    console.log(email, password)
    const login = await login_user(email, password) //calling the function of context
    // if response status is true then
    if (login.success) {
      console.log("Logined done.")
      navigate("/")
    }
    else {
      console.log("errro some.")
    }
  }

  return (
    <div className='flex justify-center items-center h-screen border-2'>
      <div className=' flex flex-col justify-center items-center gap-1 p-3'>
        <img src={LOGO} alt="logo" className='w-[80px]' />
        <p className='text-[30px] font-extrabold mb-0' style={{ color: '#1A1A1A' }}>Welcome Back</p>
        <p className='text-[18px] font-semibold' style={{ color: '#555555' }}>Please login you account</p>
        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
          <input name="email" onChange={handleChange} value={logindata.email} type="text" placeholder='Enter Email' className='  border-2 p-3 rounded-lg font-semibold' style={{ color: '#555555' }} />
          <input name="password" onChange={handleChange} value={logindata.password} type="password" placeholder='Enter Password' className='border-2 p-3 rounded-lg font-semibold' style={{ color: '#555555' }} />
          {/* <p style={{ color: '#555555' }} className='self-end'>Forgot Password</p> */}
          <input type="submit" value="Login" className='bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg py-3' />
          <Link to="/register" style={{ color: '#555555' }} className='no-underline self-center'>Create New Account</Link>
        </form>
      </div>
    </div>
  )

}

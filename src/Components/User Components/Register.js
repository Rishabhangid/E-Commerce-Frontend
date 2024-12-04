import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppConsumer } from '../../Context/AppContext'
import LOGO from "../../img/logo.png"


export default function Register() {

  const navigate = useNavigate()
  const { register_user } = useContext(AppConsumer)
  const [inputdata, setInputdata] = useState({ name: "", email: "", password: "" })

  const handleChange = (e) => {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value })
    // console.log(inputdata)
  }
  const handleSubmit = async (e) => {
    const { name, email, password } = inputdata;
    // console.log(name, email, password)
    e.preventDefault()
    const register = await register_user(name, email, password)
    if (register.success) {
      console.log("user Registered")
      navigate("/login")
    }
  }

  return (
    <div className='flex justify-center items-center h-screen border-2'>
      <div className=' flex flex-col justify-center items-center gap-1 p-3'>
        <img src={LOGO} alt="logo" className='w-[80px]'/>
        <p className='text-[30px] font-extrabold mb-0' style={{ color: '#1A1A1A' }}> Get Started with Us </p>
        <p className='text-[18px] font-semibold' style={{ color: '#555555' }}> Create your account to shop for your favorites effortlessly  </p>
        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
          <input name="name" value={inputdata.name} onChange={handleChange} type="text" placeholder='Enter Name' className='  border-2 p-3 rounded-lg font-semibold' style={{ color: '#555555' }} />
          <input name="email" onChange={handleChange} value={inputdata.email} type="text" placeholder='Enter Email' className='  border-2 p-3 rounded-lg font-semibold' style={{ color: '#555555' }} />
          <input name="password" onChange={handleChange} value={inputdata.password} type="password" placeholder='Enter Password' className='border-2 p-3 rounded-lg font-semibold' style={{ color: '#555555' }} />
          <input type="submit" value="Register" className='bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg py-3'/>
          <Link to="/login" style={{ color: '#555555' }} className='no-underline self-center'>Already have account?</Link>
        </form>
      </div>
    </div>

  )
}

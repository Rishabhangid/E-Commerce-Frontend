import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";


export default function Job() {

    const [formdata, setFormdata] = useState({job_title:"",company_name:"",location:"",apply_data:"",email:"", number:"",statuss:""})
    const handledata = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmit =async(e)=>{
        e.preventDefault()
        const { job_title,company_name,location,apply_data,email, number,statuss } = formdata
        if(!job_title || !company_name ||  !location || !apply_data  || !email  || !number || !statuss )
        console.log(formdata)
    try{
        const res = await fetch("/fetchdata", {
            method:"POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({job_title,company_name,location,apply_data,email, number,statuss })
        })
    }
    catch(error){
        console.log(error)
    }


    }

    return (
        <div className='max-w-[1400px] m-auto p-6'>
            <p className='text-center font-bold text-[30px] mb-0'>Add Job Details Applied</p>
            <p className='text-center font-medium text-[20px] text-gray-500'>Enter the Information of the job you applied.</p>
            <form onSubmit={handleSubmit} className='grid grid-cols-3 border-2 bg-slate-300 rounded-lg p-6 gap-3'>
                <input value={formdata.job_title} onChange={handledata} name="job_title" className=' p-3 rounded-lg focus:outline-blue-700' type="text" placeholder='Job Title' />
                <input value={formdata.company_name} onChange={handledata} name="company_name" className=' p-3 rounded-lg focus:outline-blue-700' type="text" placeholder='Company Name' />
                <input value={formdata.location} onChange={handledata} name="location" className=' p-3 rounded-lg focus:outline-blue-700' type="text" placeholder='Location' />
                <input value={formdata.apply_data} onChange={handledata} name="apply_data" className=' p-3 rounded-lg focus:outline-blue-700' type="text" placeholder='Applied On' />
                <input value={formdata.email} onChange={handledata} name="email" className=' p-3 rounded-lg focus:outline-blue-700' type="text" placeholder='Comany Email' />
                <input value={formdata.number} onChange={handledata} name="number" className=' p-3 rounded-lg focus:outline-blue-700' type="text" placeholder='Compony Number' />
                <input value={formdata.statuss} onChange={handledata} name="statuss" className=' col-span-3 p-3 rounded-lg focus:outline-blue-700' type="text" placeholder='Status' />
                <input className='col-span-3 flex justify-center bg-blue-700  text-white hover:bg-white hover:text-blue-500 p-3 rounded-lg focus:outline-blue-700' type="submit" value='Save' />
            </form>

            <div className=' p-3'>isme 
                <div className='p-3 grid grid-cols-5 gap-4 font-semibold bg-black text-white justify-center items-center'>
                    <p className=''>Company Details</p>
                    <p className=''>Date Applied</p>
                    <p className=''>Application Status</p>
                    <p className=''>Contact Details</p>
                    {/* <p className=''>Company Number</p> */}
                    <p className=''>Actions</p>
                </div>


                <div className='text-[16px] p-3 shadow-lg grid grid-cols-5 gap-4 justify-center items-center'>
                    <div className=''>
                        <p className=' font-semibold mb-0'>Web Developer</p>
                        <p className=' mb-0'>Wensenor</p>
                        <p className=''>Udaipur</p>
                    </div>
                    <p className=''>26 july 2024</p>
                    <p className=''>No respose</p>
                    <p className=''>cmpy@gmail.com 7073109971</p>
                    {/* <p className=''>7073109971</p> */}
                    <p className=''><MdDelete size={30}/>
                    </p>
                </div>
            </div>
        </div>
    )
}

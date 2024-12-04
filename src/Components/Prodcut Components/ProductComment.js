import React from 'react'
import { MdDelete } from "react-icons/md";


export default function ProductComment() {
  return (
    <div className='border-2 p-10 flex flex-col gap-10 items-center'>
        <form className='flex gap-2 justify-center'>
            <input type="text" placeholder='Enter Comment' className='border-2 p-3 w-[800px] rounded-lg focus:outline-yellow-400'/>
            <input type="submit" value="Comment" className='border-2 border-black p-3 rounded-lg bg-black text-white'/>
        </form>

        <div>
            <div className='bg-slate-100 w-[900px] flex justify-center items-center'>
                <p className=' rounded-lg'>This product is very good, noce sound quality in this proce range, and also good lookinf</p>
                <MdDelete size={30}/>

            </div>
        </div>
    </div>
  )
}

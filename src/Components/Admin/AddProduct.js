import React, { useContext, useState } from 'react'
import { AppConsumer } from '../../Context/AppContext'

export default function AddProduct() {
    const { BACKEND_URL } = useContext(AppConsumer)
    const [productdata, setProductdata] = useState( { title:"",description:"", price:"", catagory:"", qty:"", image:"" } )

       // user register request to backend
       const add_product = async (e) => {
        const { title,description, price, catagory, qty, image } = productdata
        console.log(title,description, price, catagory, qty, image)
        try {
            const response = await fetch(`${BACKEND_URL}addproduct`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title,description, price, catagory, qty, image })
            })

            if (!response.ok) {
                console.log("res not okay", response.statusText)
            }
            const data = await response.json()
            console.log(data)

        }
        catch (error) {
            console.log(error)
        }

    }

  return (
    <div className='p-10 flex justify-center items-center'>
        <div className='p-2 '>
            <div>
            <p className='text-center text-black font-bold text-[30px] mb-0'>Add Product</p>
            <p className='font-medium text-center'>Add new product here</p>
            </div>
            <form className='flex flex-col  gap-3'>
                <input name="title" value={productdata.title} className=' focus:outline-yellow-400 border-2 w-[500px] p-2 rounded-lg' type="text" placeholder='Product Name'/>
                <input name="catagory" value={productdata.catagory} className='focus:outline-yellow-400 border-2 w-[500px] p-2 rounded-lg' type="text" placeholder='Product Catagory'/>
                <input name="price" value={productdata.price} className='focus:outline-yellow-400 border-2 w-[500px] p-2 rounded-lg' type="text" placeholder='Product Price'/>
                <input name="qty" value={productdata.qty} className='focus:outline-yellow-400 border-2 w-[500px] p-2 rounded-lg' type="text" placeholder='Product Quantity'/>
                <textarea name="description" value={productdata.description} className='h-[100px] focus:outline-yellow-400 border-2 w-[500px] p-2 rounded-lg' type="text" placeholder='Product Description'/>
                <label className='font-semibold mb-0 text-[12px]'>Upload Photo</label>
                <input className='focus:outline-yellow-400  w-[500px] p-2 rounded-lg' type="file" placeholder='Upload Photo'/>
                <input className='bg-black hover:bg-white hover:text-white  text-white border-2 w-[500px] p-2 rounded-lg' type="submit" value='Add Product'/>

            </form>
        </div>
    </div>
  )
}

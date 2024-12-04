import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppConsumer } from '../../Context/AppContext'
import RelatedProducts from './RelatedProducts'
import ProductComment from './ProductComment'

export default function ProductDetails() {
    const {add_to_cart}= useContext(AppConsumer)
    const [showdetails, setShowdetails] = useState([])
    const [isExpanded, setIsExpanded] = useState(false); // State to toggle description

    // const BACKEND_URL = useContext(AppConsumer)
    const { id } = useParams()
    console.log(id)
    const BACKEND_URL = "http://localhost:5000/"
    useEffect(() => {
        try {
            const get_product_data = async () => {
                const response = await fetch(`${String(BACKEND_URL)}getproduct/${id}`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                })
                if (!response.ok) {
                    console.log("res not okay", response.statusText)
                }
                const data = await response.json()
                if (response.status === 200) {
                    setShowdetails(data.find_product[0])
                    // console.log("productaa gya.")
                    console.log(data.find_product)
                    // console.log(showdetails)
                    // setAllproducts(data.fetch_all_products)
                }
            }
            get_product_data()
        }
        catch (error) {
            console.log(error)
        }

        

    }, [id, BACKEND_URL])
    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className='max-w-[1400px]  m-auto'>
            <div className='p-6'>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <img src={showdetails.image} alt="product img" className='w-[600px] rounded-xl' />
                    <div className=' p-2 flex flex-col justify-evenly'>
                        <div>
                            <p className='font-bold text-[36px] mb-0' style={{color: '#1A1A1A'}}>{showdetails.title}</p>
                            <p className='font-medium text-[18px]' style={{color: '#555555'}}>Catagory: {showdetails.catagory}</p>
                            <p className='font-medium text-[16px] text-slate-600' style={{color: '#777777'}}> {/* Truncated or full description based on state */}
                                {/* {item.description} */}
                                {isExpanded
                                    ? showdetails.description
                                    : `${showdetails.description?.substring(0, 400)}...`}
                                {/* Toggle button */}
                                {showdetails.description &&
                                    showdetails.description.length > 150 && (
                                        <button
                                            onClick={toggleDescription}
                                            className="text-blue-500 ml-2"
                                        >
                                            {isExpanded ? 'See Less' : 'See More'}
                                        </button>
                                    )}</p>
                        </div>
                        <div className=''>
                            <p className='font-bold text-[25px] text-green-500' >₹{showdetails.price}</p>
                            <div className='flex gap-3'>
                                <button onClick={() => add_to_cart(showdetails._id, showdetails.title, showdetails.price, showdetails.qty, showdetails.image)} className='transition duration-100 bg-yellow-400 hover:bg-white border-2  border-yellow-400 px-4 py-2 text-[16px] rounded-lg font-medium' style={{color: '#1A1A1A'}}>Add to Cart</button>
                                <button onClick={() => add_to_cart(showdetails._id, showdetails.title, showdetails.price, showdetails.qty, showdetails.image)} className='transition duration-100  border-2 border-yellow-400 hover:bg-yellow-400 p-2 text-[16px] rounded-lg font-medium' style={{color: '#1A1A1A'}}>Buy Now</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

           <RelatedProducts catagory={showdetails.catagory}/>
           {/* <ProductComment/> */}
        </div>
    )   
}

import React, { useContext } from 'react'
import { AppConsumer } from '../../Context/AppContext'
import { Link } from 'react-router-dom'

export default function RelatedProducts({ catagory }) {
    const { allProducts,  add_to_cart } = useContext(AppConsumer)
    if (!allProducts) {
        console.log("Loading.....")
    }
    console.log(allProducts)
    const related_products = allProducts.filter((item => item.catagory == catagory))
    console.log(related_products)
    return (
        <div className='p-6 mt-10'>
            <p className='font-bold text-[36px]  text-center mb-4' style={{ color: '#1A1A1A' }}>Realated Products</p>

            {
                related_products.length >0 ? (
                    <div className="flex flex-wrap justify-center gap-10 p-6 ">
                        {related_products.map((item) => (
                            <Link to={`/d/${item._id}`} key={item.id} className="no-underline text-black overflow-hidden shadow-sm rounded-lg  w-[250px] relative">
                                {/* Image Section */}
                                <div className="w-[250px] h-[250px] rounded-lg overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt="img"
                                        className="w-full h-[250px] rounded-lg object-cover transform transition-transform duration-200 hover:scale-110  "
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="p-3 flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-bold">{item.title}</p>
                                        <p className="text-lg font-bold text-green-600">{item.price}</p>
                                    </div>

                                    <Link onClick={() => add_to_cart(item._id, item.title, item.price, item.qty, item.image)} className="bg-black text-white no-underline hover:bg-white  px-4 py-2 rounded-lg text-center">
                                        Add to Cart
                                    </Link>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) :
                    (
                        <p className='font-medium text-[16px] text-center text-slate-600' style={{color: '#777777'}}> Oops! Looks like we couldn’t find any related products right now. Don’t worry, more exciting options are just a click away!</p>
                    )
            }
        </div>
    )

}

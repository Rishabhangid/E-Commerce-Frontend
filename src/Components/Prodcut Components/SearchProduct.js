import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppConsumer } from '../../Context/AppContext'

export default function SearchProduct() {
    const { find } = useParams()
    const { allProducts, add_to_cart } = useContext(AppConsumer)
    const [showsearch, setShowsearch]= useState([])
    console.log(find)

    useEffect(() => {
        const search_product = async () => {
            try {
                const result = allProducts.filter((item) => item.title.toLowerCase().includes(find?.toLowerCase() || ""))

                console.log(result)
                setShowsearch(result)
                
            }
            catch (error) {
                console.log(error)
            }
        }
        search_product()
    }, [find])




    return (
        <div className="flex flex-wrap justify-center gap-6 p-6" >
            {showsearch.map((item) => (
                <Link to={`/d/${item._id}`}  key={item.id} className=" no-underline text-black overflow-hidden shadow-sm rounded-lg  w-[250px] relative">
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
                            <p className="text-lg text-green-600 font-bold">{item.price}</p>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                        <Link onClick={() => add_to_cart(item._id, item.title, item.price, item.qty, item.image)} className="bg-black text-white no-underline hover:bg-white  px-4 py-2 rounded-lg text-center">
                            Add to Cart
                        </Link>
                    </div>
                </Link>
            ))}
        </div>
    )
}

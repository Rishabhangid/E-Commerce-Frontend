import React, { useContext, useEffect, useState } from 'react'
import { AppConsumer } from '../../Context/AppContext'

import { Link, Navigate, useNavigate } from 'react-router-dom';

import Carousel from 'react-bootstrap/Carousel';

import C1 from "../../img/111.jpg"
import C2 from "../../img/2.jpg"
import C3 from "../../img/11.jpg"




export default function ShowProducts() {
  const navigate = useNavigate()

  const [search, setSearch] = useState("")

  const { data, allProducts, filter_product, renderproduct, setRenderproduct, add_to_cart } = useContext(AppConsumer)
  if (!allProducts) {
    console.log("Loading.....")
  }
  console.log(allProducts)

  useEffect(() => {
    if (allProducts) {
      setRenderproduct(allProducts);
    }
  }, [allProducts]);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      window.alert("Empty.")
    }
    else {

      navigate(`/search/${search}`)
    }

  }

  const handle_add_to_cart = ()=>{}



  return (
    <div>

      {/* Carousal */}
      <div>
        <Carousel data-bs-theme="dark">
          <Carousel.Item className='mt-8'>
            <img
              className="d-block w-[70%] md:w-[95%] mt-10 bg-center h-[25vh] md:h-[80vh] bg-contain rounded-2xl m-auto"
              src={C1}
              alt="First slide"
            />
            {/* <Carousel.Caption>
              <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item className='mt-8'>
            <img
              className="d-block w-[70%] md:w-[95%] mt-10 bg-center h-[25vh] md:h-[80vh] bg-contain rounded-2xl m-auto"
              src={C2}
              alt="Second slide"
            />
            {/* <Carousel.Caption>
              <h5>Second slide label</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item className='mt-8'>

            <img
              className="d-block w-[70%] md:w-[95%] mt-10 bg-center h-[25vh] md:h-[80vh] bg-contain rounded-2xl m-auto"
              src={C3}
              alt="Third slide"
            />
            {/* <Carousel.Caption>
              <h5>Third slide label</h5>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption> */}
          </Carousel.Item>
        </Carousel>

      </div>

      <div>
        {/* Search Products */}
        <form className='flex justify-center items-center mt-6 p-4' onSubmit={handleSubmit}>
          <input type='text' placeholder='Seach Product' value={search} onChange={(e) => setSearch(e.target.value)} className='border-2 border-gray-100 font-normal focus:outline-yellow-500 w-[800px] p-3 rounded-tl-xl rounded-bl-xl ' style={{ color: '#555555' }} />
          <input type='submit' value='Search' className='border-2 border-gray-100 font-normal active:border-black  active:bg-black active:text-white w-[100px] p-3 bg-gray-100 rounded-e-xl' />
        </form>

        {/* Filter Products */}
        <div className=' flex justify-center items-center flex-wrap gap-4'>
          <button className='bg-gray-100 txt-[14px] md:text-[18] hover:bg-black  hover:text-white transition duration-300 ease-out p-3 rounded-lg font-medium' name="bycatagory" onClick={() => filter_product("bycatagory")}>Filter by Catagory</button>
          <button className='bg-gray-100 txt-[14px] md:text-[18] hover:bg-black hover:text-white  transition duration-300 ease-out   p-3 rounded-lg font-medium' name="byprice" onClick={() => filter_product("byprice")}>Filter by Price</button>
          <button className='bg-gray-100 txt-[14px] md:text-[18] hover:bg-black hover:text-white  transition duration-300 ease-out   p-3 rounded-lg font-medium' name="byprice" onClick={() => filter_product("allproducts")}>All Products</button>
        </div>
      </div>





      {/* Showing All Products */}
      <div className="flex flex-wrap justify-center gap-10 p-6 mt-16">
        {renderproduct.map((item) => (

          <div key={item.id} className="overflow-hidden shadow-sm rounded-lg  w-[250px] relative">
            {/* Image Section */}
            <Link to={`/d/${item._id}`} className="no-underline text-black">

              <div className="w-[250px] h-[250px] rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt="img"
                  className="w-full h-[250px] rounded-lg object-cover transform transition-transform duration-200 hover:scale-110  "
                />
              </div>
            </Link>

            {/* Content Section */}
            <div className="p-3 flex flex-col">
              <div className="flex justify-between items-center mb-0">
                <p className="text-lg font-bold ">{item.title}</p>
                <p className="text-lg font-bold text-green-500 ">{item.price}</p>
              </div>
              <p className="text-gray-600 text-[16px]">{item.catagory}</p>
              <button className="bg-black text-white hover:bg-gray-200 px-4 py-2 rounded-lg text-center" onClick={() => add_to_cart(item._id, item.title, item.price, item.qty, item.image)} >
                Add to Cart
              </button>
            </div>
          </div>

        ))}
      </div>
    </div>
  );

}


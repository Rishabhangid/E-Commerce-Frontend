import React, { useContext, useEffect } from 'react'
import { MdInventory2 } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";
import { IoLogOutSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import LOGO from "../../img/flogo.png"
import { AppConsumer } from '../../Context/AppContext';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





export default function AdminPage() {

    const notify = () => {
        toast.success("Admin successfully logged out.", {
          position: "top-center",
          autoClose: 3000,
        });
      };

    const { admintoken, setAdmintoken } = useContext(AppConsumer)

    // console.log("ADmin Token : ", admintoken)

    useEffect( ()=>{
        if(admintoken === ""){
            window.alert("Admin not loggined")
            navigate("/")
        }
        else{
            window.alert("Welcome Admin")
        }
    }, [] )



    const navigate = useNavigate()

    // request for user logout
    const logout_user = () => {
        try {
            setAdmintoken("")
            localStorage.removeItem("admintoken")
            console.log("Admin Logged Out.")
            notify()
            navigate("/")
        }
        catch (error) {
            console.log(error)
            return false
        }


        // navigate("/login")
    }
    return (
        <div className='p-10'>
                        {/* <ToastContainer/> */}

            <div className='flex flex-col items-center'>
                <p className='text-center font-bold text-[30px] mb-0'>Admin Page</p>
                <p className='font-semibold'>Hello this the admin page.</p>
            </div>

            <div className='flex gap-6 flex-wrap justify-center mt-6'>
                <div onClick={() => navigate("/allproducts")} className='flex gap-3 flex-col justify-center items-center border-2 w-[200px] h-[200px] rounded-lg bg-black text-white'>
                    <MdInventory2 size={30} />

                    <p className='font-bold'>See All Products</p>
                </div>
                <div onClick={() => navigate("/addproduct")} className='flex gap-3 flex-col justify-center items-center border-2 w-[200px] h-[200px] rounded-lg bg-black text-white'>
                    <MdAddBox size={30} />

                    <p className='font-bold'>Add Product</p>
                </div>
                <div onClick={() => navigate("/seeorders")} className='flex gap-3 flex-col justify-center items-center border-2 w-[200px] h-[200px] rounded-lg bg-black text-white'>
                    <MdLocalShipping size={30} />

                    <p className='font-bold'>See Orders</p>
                </div>

                <div onClick={() => logout_user()} className='flex gap-3 flex-col justify-center items-center border-2 w-[200px] h-[200px] rounded-lg bg-black text-white'>
                    <IoLogOutSharp size={30} />


                    <p className='font-bold'>Logout</p>
                </div>
            </div>

            <div className=' p-10 flex justify-center mt-10'>
                <img src={LOGO} alt="imgg" className='w-[300px]' />
            </div>


        </div>
    )
}


// See products- Edit butin in it - delete btn in it
//         Add Product
//         see orders
//         logout
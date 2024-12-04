import React, { useContext } from 'react'
import { AppConsumer } from '../../Context/AppContext'
import USER_IMAGE from "../../img/user.png"
import { useNavigate } from 'react-router-dom'

export default function UserProfile() {

    const navigate = useNavigate()
    const { userdata } = useContext(AppConsumer)
    // console.log(userdata) 
    const { logout_user, isauthenticated } = useContext(AppConsumer)

    const user_logged_out = () => {
        const confirm_logout = window.confirm("Are you sure to log out?")
        if (confirm_logout) {
            const result = logout_user();
            console.log("Logout result:", result); // Debug log
            if (result) {
                console.log("Navigating to login");
                navigate("/login");
            } else {
                console.error("Logout failed");
            }
        }
    };

    return (
        <div className='flex justify-center items-center p-4 mt-10'>
            <div className='flex flex-col justify-center items-center  p-6 border-yellow-400 rounded-lg'>
                <img src={USER_IMAGE} alt="logo" className='w-[150px]' />
                <p className='font-bold text-[28px] mb-0'>{userdata.name}</p>
                <p className='font-semibold text-[18x]'>{userdata.email}</p>
                <div className='flex flex-col gap-4'>
                    <button className='bg-yellow-400 hover:bg-yellow-500 px-3 py-2 rounded-lg font-medium'>Update Profile</button>
                    <button className='border-2 border-yellow-400 hover:bg-yellow-400 px-2 py-2  rounded-lg font-medium' onClick={() => user_logged_out()}>LogOut</button>
                </div>
            </div>
        </div>
    )
}

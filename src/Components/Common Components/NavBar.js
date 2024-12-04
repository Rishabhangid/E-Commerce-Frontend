import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

import LOGO from "../../img/flogo.png"
import { AppConsumer } from '../../Context/AppContext';

// E4CE00



export default function NavBar() {
    const navigate = useNavigate()
    const { logout_user, isauthenticated } = useContext(AppConsumer)


    const user_logged_out = () => {
        const result = logout_user();
        console.log("Logout result:", result); // Debug log
        if (result) {
            console.log("Navigating to login");
            navigate("/login");
        } else {
            console.error("Logout failed");
        }
    };

    const for_verified_user = () => {

        return (

            <Container className=''>
                {/* LOGO */}
                <Navbar.Brand href="#home" className='flex justify-center '>
                    <img onClick={()=>navigate("/")} src={LOGO} alt="logo" className='w-[250px]' />
                    {/* <p className='text-[22px]'>ThunderCart</p> */}
                </Navbar.Brand>
                {/* MENU */}
                <div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="me-auto flex justify-center items-center gap-2">
                            {/* <Nav.Link as={Link} to="/login">Login</Nav.Link> */}
                            <Nav.Link as={Link} to="/">Shop</Nav.Link>
                            <Nav.Link as={Link} to="/user/cart">Cart</Nav.Link>
                            <Nav.Link as={Link} to="/contact" >Contact Ous</Nav.Link>
                            {/* <Nav.Link onClick={() => user_logged_out()}>Logout</Nav.Link> */}
                            <DropdownButton
                                align="end"
                                title={<FaUserAlt />}
                                id="dropdown-menu-align-end" menuVariant="dark" variant="secondary" className='no-caret custom-dropdown'
                            >
                                <Dropdown.Item as={Link} to="/user/profile">Profile</Dropdown.Item>
                                <Dropdown.Item eventKey="3" as={Link} to="/contact">Having Issues?</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="4" onClick={() => user_logged_out()}>Logout</Dropdown.Item>
                            </DropdownButton>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Container>

        )

    }

    const non_verified_user = () => {
        return (
            <Container className=''>
                {/* LOGO */}
                <Navbar.Brand href="#home" className='flex justify-center '>
                    <img src={LOGO} alt="logo" className='w-[250px]' />
                    {/* <p className='text-[22px]'>ThunderCart</p> */}
                </Navbar.Brand>
                {/* MENU */}
                <div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="me-auto flex justify-center items-center gap-2">
                            {/* <Nav.Link as={Link} to="/">Shop</Nav.Link> */}
                            <Nav.Link as={Link} to="/contact" >Contact Ous</Nav.Link>

                            <Nav.Link as={Link} to="/login" className='hover:text-yellow-400'>Login</Nav.Link>
                            {/* <Nav.Link as={Link} to="/">Cart</Nav.Link> */}
                            {/* <Nav.Link href="#link">Profile</Nav.Link> */}
                            {/* <Nav.Link onClick={() => user_logged_out()}>Logouttt</Nav.Link> */}
                            {/* <DropdownButton
                                align="end"
                                title={<FaUserAlt />}
                                id="dropdown-menu-align-end" menuVariant="dark" variant="secondary" className='no-caret custom-dropdown'
                            >
                                <Dropdown.Item eventKey="1">Profile</Dropdown.Item>
                                <Dropdown.Item eventKey="3">Having Issues?</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="4">Logout</Dropdown.Item>
                            </DropdownButton> */}
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Container>
        )


    }



return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top p-3 shadow-sm">
        {isauthenticated ? for_verified_user() : non_verified_user()}
    </Navbar>
)
}


// <Container className=''>
// {/* LOGO */}
// <Navbar.Brand href="#home" className='flex justify-center '>
//     <img src={LOGO} alt="logo" className='w-[250px]' />
//     {/* <p className='text-[22px]'>ThunderCart</p> */}
// </Navbar.Brand>
// {/* MENU */}
// <div>
//     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     <Navbar.Collapse id="basic-navbar-nav">

//         <Nav className="me-auto flex justify-center items-center gap-2">
//             <Nav.Link as={Link} to="/login">Login</Nav.Link>
//             <Nav.Link as={Link} to="/">Cart</Nav.Link>
//             <Nav.Link href="#link">Profile</Nav.Link>
//             <Nav.Link onClick={() => user_logged_out()}>Logout</Nav.Link>
//             <DropdownButton
//                 align="end"
//                 title={<FaUserAlt />}
//                 id="dropdown-menu-align-end" menuVariant="dark" variant="secondary" className='no-caret custom-dropdown'
//             >
//                 <Dropdown.Item eventKey="1">Profile</Dropdown.Item>
//                 <Dropdown.Item eventKey="3">Having Issues?</Dropdown.Item>
//                 <Dropdown.Divider />
//                 <Dropdown.Item eventKey="4">Logout</Dropdown.Item>
//             </DropdownButton>
//         </Nav>
//     </Navbar.Collapse>
// </div>
// </Container>

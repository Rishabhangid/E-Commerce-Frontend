// import logo from './logo.svg';
// import './App.css';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


// import Button from 'react-bootstrap/Button';
// import Login from './Components/User Components/Login';
// import Register from './Components/User Components/Register';
// import NavBar from './Components/Common Components/NavBar';
// import ShowProducts from './Components/Prodcut Components/ShowProducts';
// import ProductDetails from './Components/Prodcut Components/ProductDetails';
// import Footer from './Components/Common Components/Footer';
// import SearchProduct from './Components/Prodcut Components/SearchProduct';
// import UserProfile from './Components/User Components/UserProfile';
// import ContactUs from './Components/User Components/ContactUs';
// import UserCart from './Components/User Components/UserCart';
// import ProductComment from './Components/Prodcut Components/ProductComment';
// import CheckOut from './Components/Prodcut Components/CheckOut';
// import OrderSummery from './Components/Prodcut Components/OrderSummery';
// import OrderConfirm from './Components/Prodcut Components/OrderConfirm';
// import AdminLogin from './Components/Admin/AdminLogin';
// import Job from './Components/Admin/Job';
// import AdminPage from './Components/Admin/AdminPage';


// function App() {
//   return (
//     <BrowserRouter>
//     <NavBar/>
//     <Routes>
//       <Route path="/login" element={<Login/>}/>
//       <Route path="/register" element={<Register/>}/>
//       <Route path="/" element={<ShowProducts/>}/>
//       <Route path="/d/:id" element={<ProductDetails/>}/>
//       <Route path="/search/:find" element={<SearchProduct/>}/>
//       <Route path="/user/profile" element={<UserProfile/>}/>
//       <Route path="/contact" element={<ContactUs/>}/>
//       <Route path="/user/cart" element={<UserCart/>}/>
//       <Route path="/comment" element={<ProductComment/>}/>
//       <Route path="/checkout" element={<CheckOut/>}/>
//       <Route path="/ordersummery" element={<OrderSummery/>}/>
//       <Route path="/orderconfirm" element={<OrderConfirm/>}/>

//       <Route path="/adminlogin" element={<AdminLogin/>}/>
//       <Route path="/job" element={<Job/>}/>
//       <Route path="/adminpage" element={<AdminPage/>}/>
//     </Routes>
//     <Footer/>
//     </BrowserRouter>
//   );
// }

// export default App;
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './Components/Common Components/NavBar';
import Footer from './Components/Common Components/Footer';
import Login from './Components/User Components/Login';
import Register from './Components/User Components/Register';
import ShowProducts from './Components/Prodcut Components/ShowProducts';
import ProductDetails from './Components/Prodcut Components/ProductDetails';
import SearchProduct from './Components/Prodcut Components/SearchProduct';
import UserProfile from './Components/User Components/UserProfile';
import ContactUs from './Components/User Components/ContactUs';
import UserCart from './Components/User Components/UserCart';
import ProductComment from './Components/Prodcut Components/ProductComment';
import CheckOut from './Components/Prodcut Components/CheckOut';
import OrderSummery from './Components/Prodcut Components/OrderSummery';
import OrderConfirm from './Components/Prodcut Components/OrderConfirm';
import AdminLogin from './Components/Admin/AdminLogin';
import Job from './Components/Admin/Job';
import AdminPage from './Components/Admin/AdminPage';
import AllProducts from './Components/Admin/AllProducts';
import AddProduct from './Components/Admin/AddProduct';
import SeeOrders from './Components/Admin/SeeOrders';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppContent() {
  const location = useLocation();

  // Routes where NavBar and Footer should be hidden
  const hideNavBarAndFooterRoutes = ['/adminpage'];

  return (
    <>
     <ToastContainer />
      {/* Conditionally render NavBar */}
      {!hideNavBarAndFooterRoutes.includes(location.pathname) && <NavBar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ShowProducts />} />
        <Route path="/d/:id" element={<ProductDetails />} />
        <Route path="/search/:find" element={<SearchProduct />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/user/cart" element={<UserCart />} />
        <Route path="/comment" element={<ProductComment />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/ordersummery" element={<OrderSummery />} />
        <Route path="/orderconfirm" element={<OrderConfirm />} />

        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/job" element={<Job />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/addproduct" element={<AddProduct/>} />
        <Route path="/seeorders" element={<SeeOrders/>} />
      </Routes>

      {/* Conditionally render Footer */}
      {!hideNavBarAndFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

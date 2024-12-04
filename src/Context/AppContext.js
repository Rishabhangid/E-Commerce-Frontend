import React, { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // cant use usenavigate in context file 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppConsumer = createContext(); // making Consumer

// Provideer
const AppProvider = ({ children }) => {

    // fetching all products in useffect and adding in it to display products at "Show Products", "Related Products"
    const [allProducts, setAllproducts] = useState([])
    // stroing the user token in it after successfull login, to use everywhere in app
    const [token, setToken] = useState("")
    // toggling navbar according to it "true or false", if logged in then true else false
    const [isauthenticated, setIsauthenticated] = useState(false)
    // using it to display product and appling on it so that real data "allProducts" dont get disturbed
    const [renderproduct, setRenderproduct] = useState([])
    // storing user data fetched from bckend to send to user profile page.
    const [userdata, setUserdata] = useState([])
    // stroing user cart fetching from BACKEND
    const [usercart, setUsercart] = useState([])
    // 
    const [userid, setUserid] = useState("")
    // storing loggined user address if exist
    const [hasaddress, setHasaddress] = useState([])
    // storing user recent order to show
    const [userorder, setUserorder] = useState([]) 
    // Admin Token
    const [admintoken, setAdmintoken] = useState("")

    // backend url 
    // const BACKEND_URL = "http://localhost:5000/"
    const BACKEND_URL = "https://e-commerce-website-rjb6.onrender.com/"
    // dummy data
    const dataa = 10

    // fetching all products from backend to show
    useEffect(() => {
        // fetching all products from backend to show and storing all in "allProducts"
        const getAllProducts = async (req, res) => {
            try {
                const response = await fetch(`${BACKEND_URL}fetchallproducts`, {
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

                    // console.log("sara data aa gya.")
                    // console.log("Context :", data)

                    setAllproducts(data.fetch_all_products)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        getAllProducts()
        // fetching user info with token whenever page is refreshed.
        // userProfile()
    }, [])

    // user register request to backend
    const register_user = async (name, email, password) => {
        console.log(email, name, password)
        try {
            const response = await fetch(`${BACKEND_URL}registerUser`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            })

            if (!response.ok) {
                console.log("res not okay", response.statusText)
            }
            const data = await response.json()
            // returning data because at register page, will check it "success" status to check.
            return data

        }
        catch (error) {
            console.log(error)
        }

    }

    // user login request to backend
    const login_user = async (email, password) => {
        // console.log(email, password)
        try {
            const response = await fetch(`${BACKEND_URL}loginUser`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            if (!response.ok) {
                console.log("res not okay", response.statusText)
            }
            const data = await response.json()
            // id user logged in successfully, then it will get token form backend and stroing token to usestate
            setToken(data.token)
            // storing in local storage
            localStorage.setItem('jwtoken', data.token)
            // on successfull login set it "true" to toggle navbar
            setIsauthenticated(true)
            // returning to confirm at login page
            return data

        }
        catch (error) {
            console.log(error)
        }

    }

    // testing
    // console.log("toekn", token)
    // console.log(localStorage.getItem("jwtoken"))

    // filter product function : takes operation what to do, on the basis of that filtering it.  
    const filter_product = (filter_type) => {
        // console.log(filter_type)
        if (filter_type === "bycatagory") {
            const product_by_catagory = allProducts.filter((product) => product.catagory === "Phone")
            // console.log(product_by_catagory)
            setRenderproduct(product_by_catagory)

        }
        else if (filter_type === "allproducts") {
            setRenderproduct(allProducts)
        }
        else if (filter_type === "byprice") {
            const product_by_price = allProducts.sort((a, b) => a.price - b.price)
            // console.log(product_by_price)
            setRenderproduct(product_by_price)
        }
    }

    // making request to backend to get logged in user data + fixed navigation bar getting reset to flase "default" on refresh.
    useEffect(() => {
        const userProfile = async () => {
            const token = localStorage.getItem("jwtoken"); // getting token from local storage
            if (token) {
                try {
                    const response = await fetch(`${BACKEND_URL}getuser`, {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`, // sending token to backend 
                        },
                        credentials: 'include',
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUserdata(data.userinfo);
                        setIsauthenticated(true); //for navigation bar for issue reset...
                    } else {
                        setIsauthenticated(false);
                    }
                } catch (error) {
                    console.error("Error verifying user:", error);
                    setIsauthenticated(false);
                }
            }
            // setLoading(false); // Stop loading after verification
        };

        userProfile();
        fetch_user_cart();
        fetch_address();
        fetch_user_recent_order();
    }, []);

    // request for user logout
    const logout_user = () => {
        try {
            setIsauthenticated(false)
            setToken("")
            localStorage.removeItem("usertoken")
            return true

        }
        catch (error) {
            console.log(error)
            return false
        }


        // navigate("/login")
    }

    // Add to cart request to Backend
    const add_to_cart = async (productId, title, price, qty, img) => {
        const notify = () => {
            toast.success("Item added to cart succesfully.", {
              position: "top-center",
              autoClose: 3000,
            });
          };
        const token = localStorage.getItem("jwtoken");
        if(!token){
            window.alert("Login First")
        }
        else{
            console.log("add to cart data to send")
            console.log(productId, title, price, qty, img)
            try {
                const response = await fetch(`${BACKEND_URL}addtocart`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // sending token to backend 
    
                    },
                    body: JSON.stringify({ productId, title, price, qty, img })
                })
                if (!response.ok) {
                    console.log("res not okay", response.statusText)
                }
                const data = await response.json()
                // window.alert("Item Added to Cart")
                notify()
                return data
    
            }
            catch (error) {
                console.log(error)
            }
        }
       


    }

    // Add to cart request to Backend


    const fetch_user_cart = async () => {
        const token = localStorage.getItem("jwtoken");
        try {
            const response = await fetch(`${BACKEND_URL}usercart`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // sending token to backend 
                },
                // body : JSON.stringify({})
            })
            if (!response.ok) {
                console.log("res not okay", response.statusText)
            }
            const data = await response.json()
            // console.log("USER CART")
            // console.log(data.find_cart.items)
            // console.log(data.find_cart.userId)
            setUserid(data.find_cart.userId)
            setUsercart(data.find_cart.items)
            return data

        }
        catch (error) {
            console.log(error)
        }


    }

    let sumprice = 0;
    let grand_total = usercart.map((item) => sumprice += item.price)


    // productId, action, title, price, qty, img aa rha he
    const update_cart = async (productId, action, title, price, qty, img) => {
        const product_id = productId
        let user_id = userid
        console.log("to backend", product_id, action, user_id, title, price, qty, img)


        try {
            const response = await fetch(`${BACKEND_URL}updatecart`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${token}`, // sending token to backend 
                },
                body: JSON.stringify({ product_id, action, user_id, title, price, qty, img })
            })
            if (!response.ok) {
                console.log("res not okay", response.statusText)
            }
            const data = await response.json()
            // console.log("Updated cart")
            // console.log(data)
            // setUsercart(data.save_changes.items)
            setUsercart(data.cart.items);

            return data

        }
        catch (error) {
            console.log(error)
        }

    }

    // deleting a particulat users cart product
    const delete_product = async (id) => {
        const token = localStorage.getItem("jwtoken");


        // console.log("product id to delete", id)
        // console.log("token", token)


        try {
            const response = await fetch(`${BACKEND_URL}removefromcart/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // sending token to backend 
                }
            })
            if (!response.ok) {
                console.log("res not okay", response.statusText)
            }
            const data = await response.json()
            console.log("Product deleted")
            console.log(data)
            // setUsercart(data.save_changes.items)
            // setUsercart(data.cart.items);
            return data
            // fetch_user_cart();

        }
        catch (error) {
            console.log(error)
        }

    }

    // deletinh useres full cart
    const clear_cart = async () => {
        const token = localStorage.getItem("jwtoken");
        // console.log("token of user whose cart is to be delete", token)


        try {
            const response = await fetch(`${BACKEND_URL}deletecart`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // sending token to backend 
                }
            })
            if (!response.ok) {
                console.log("res not okay", response.statusText)
            }
            const data = await response.json()
            window.alert("Cart deleted")
            // console.log(data)
            // setUsercart(data.save_changes.items)
            setUsercart(data);
            return data

        }
        catch (error) {
            console.log(error)
        }

    }

    // saving users address in the backend
    const save_address = async (fname, lname, city, state, pincode, country, mobile_no, alt_no, add) => {
        const token = localStorage.getItem("jwtoken");
        console.log("token of user whose cart is to be delete", token)
        console.log("Address", fname, lname, city, state, pincode, country, mobile_no, alt_no, add)


        try {
            const response = await fetch(`${BACKEND_URL}postaddress`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // sending token to backend 
                },
                body: JSON.stringify({ fullname: fname + lname, address: add, city: city, state: state, pincode: pincode, country: country, number: mobile_no, alt_number: alt_no, address: add })
            })
            console.log(response)
            if (!response.ok) {
                console.log("res not okay", response.statusText)
            }
            const data = await response.json()
          
            return data

        }
        catch (error) {
            console.log(error)
        }

    }

    // trying to fetch users address from backend if already exist
    const fetch_address = async () => {
        const token = localStorage.getItem("jwtoken");
        // console.log("token of user whose cart is to be delete", token)

        try {
            const response = await fetch(`${BACKEND_URL}getaddress`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // sending token to backend 
                }
            })
            if (!response.ok) {
                console.log("res not okay", response.statusText)
            }
            const data = await response.json()
            // console.log("Address fetched succesfully.")
            // console.log(data)
            setHasaddress(data.address)
            // setUsercart(data.save_changes.items)
            // setUsercart(data);
            return data

        }
        catch (error) {
            console.log(error)
        }

    }

    // trying to fetch users address from backend if already exist
    const fetch_user_recent_order = async () => {
        const token = localStorage.getItem("jwtoken");
        // console.log("token of user whose cart is to backend", token)

        try {
            const response = await fetch(`${BACKEND_URL}sendorder`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // sending token to backend 
                }
            })
            if (!response.ok) {
                console.log("res not okay", response.statusText)
            }
            const data = await response.json()
            // console.log("Order fetched succesfully.")
            // console.log(data)
            setUserorder(data)
            // setHasaddress(data.address)
            // setUsercart(data.save_changes.items)
            // setUsercart(data);
            return data

        }
        catch (error) {
            console.log(error)
        }

    }



    // combining all things to send
    // const allItems = { dataa, allProducts, BACKEND_URL, register_user, login_user, token, isauthenticated, filter_product, renderproduct, setRenderproduct, logout_user }

    return (
        <AppConsumer.Provider value={{ dataa, allProducts, BACKEND_URL, register_user, login_user, token, isauthenticated, filter_product, renderproduct, setRenderproduct, logout_user, userdata, add_to_cart, usercart, update_cart, delete_product, clear_cart, save_address, fetch_address, hasaddress, grand_total, sumprice ,userid, setUsercart, userorder, setAdmintoken ,  }}>
            {children}
        </AppConsumer.Provider>
    )
}

// Provider se Pure app ko wrap krenge or Cunsumer se data use krenge
export { AppConsumer, AppProvider };


import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import Img from '../assets/logo1.jpg'
import { FaBars, FaShoppingBag } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { UseCart } from './CartProvider'
const Navbar = () => {
    let [open,setOpen]=useState(false)
    const{cartItems}=UseCart()

    const handleClick=()=>{
         setOpen(!open)
    }

    useEffect(()=>{
        const handleResize=()=>{
            if(window.innerWidth>786){
                setOpen(false)
            }
        };
        window.addEventListener("resize",handleResize);
        return () => window.removeEventListener("resize",handleResize);
    }, []);
  return (
    <>
    <div className="container">
        <div className="img">
            <img src={Img} alt="logo" />
        </div>
        <div className={open ? "nav-links-responsive" : "nav-links"}>
            <NavLink className="links">HOME</NavLink>
            <NavLink className="links" to="beauty">BEAUTY</NavLink>
            <NavLink className="links" to="eletricals">ELETRICALS</NavLink>
            <NavLink className="links" to="womens">WOMENS </NavLink>
            <NavLink className="links" to="mens">MENS </NavLink>
            <NavLink className=" links signout">LogOut</NavLink>
            
        </div>
        <div className="cart">
            <NavLink className='shopping-cart' to="cart"><FaCartShopping/>{cartItems.length}</NavLink>
        </div>
        
        <div className="menubar">
          <NavLink onClick={handleClick}>{open ? "X" : <FaBars/> }</NavLink>
            
        </div>
    </div>
    </>
  )
}

export default Navbar
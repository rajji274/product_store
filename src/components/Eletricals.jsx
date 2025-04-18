import React, { useEffect, useState } from 'react'
import './beauty.css'
import { UseCart } from './CartProvider';


function Eletricals() {
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    const [userInput,setUserInput]=useState("");
    const {addToCart}=UseCart();

    useEffect(()=>{
        const fetchProducts = async ()=>{
            try{
                const [smartPhonesRes,mobileAccessoriesRes,laptopsRes]=await Promise.all([
                    fetch( "https://dummyjson.com/products/category/smartphones"),
                    fetch("https://dummyjson.com/products/category/mobile-accessories"),
                    fetch("https://dummyjson.com/products/category/laptops"),
                ]);
                const smartPhonesData=smartPhonesRes.json(),
            }

        }

    })

  return (
    <div>



    </div>
  )
}

export default Eletricals
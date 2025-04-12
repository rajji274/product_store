import React, { useEffect, useState } from 'react'
import './beauty.css'
import { UseCart } from './CartProvider';
import { Link } from 'react-router-dom';


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
                const smartPhonesData=await smartPhonesRes.json();
                const mobileAccessriesData=await mobileAccessoriesRes.json();
                const laptopData=await laptopsRes.json();

                const combineData=[...smartPhonesData.products, ...mobileAccessriesData.products, ...laptopData.products]
                 setProducts(combineData)
            
            }catch(error){
                console.error("Error fetching here:", error)
            }finally{
                setLoading(false)
            }

        };
        fetchProducts();
    },[]);
    const filteredProducts = products.filter(product => {
        if (userInput === "") return true;
        return product.title.toLowerCase().includes(userInput.toLowerCase());
    });
  return (
    <div>
        <div className="input-card">
            <input type="search" 
            placeholder='Search Product Here..'
            value={userInput} 
            onChange={(e)=>setUserInput(e.target.value)}
            style={{width:"600px",height:"60px"}}
            />
        </div>
        {
            loading ? (
                <div className="loading-page">
                    <h2 className="page-load">Loading...</h2>
                </div>
            ):filteredProducts.length > 0 ? (
                <div className="beauty-wrapper">
                    {
                        filteredProducts.map(product =>(
                            <div className="container-beauty" key={product.id}>
                                <img src={product.thumbnail} alt={product.title} />
                                <p className="title">{product.title}</p>
                                <span className="rating">Ratings  {product.rating}</span>
                                <p className="price">$ {product.price}</p>
                                <button className="add-to-cart" onClick={()=>addToCart(product)}>Add To Cart</button>
                            </div>


                        ))
                    }
                </div>
            ):(
                <div className="no-product">
                    <h3 className="no-data">No Products Found</h3>
                </div>
            )
        }



    </div>
  )
}

export default Eletricals
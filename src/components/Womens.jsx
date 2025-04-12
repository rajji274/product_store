import React, { useEffect, useState } from 'react'
import './beauty.css'
import { UseCart } from './CartProvider'
import { Link } from 'react-router-dom'

function Womens() {
    const [products,setProducts]=useState([]);
    const[loading,setLaoding]=useState(true);
    const[userInput,setUserInput]=useState("");
    const {addToCart}=UseCart()

    useEffect(()=>{
       const fetchProducts=async ()=>{
        try{
            const [womensBags,womensDress,womensJewellary,womensWatches,womensShoes]=await Promise.all([
                fetch('https://dummyjson.com/products/category/womens-bags'),
                fetch("https://dummyjson.com/products/category/womens-dresses"),
                fetch("https://dummyjson.com/products/category/womens-jewellery"),
                fetch("https://dummyjson.com/products/category/womens-watches"),
                fetch("https://dummyjson.com/products/category/womens-shoes"),
            ]);
            const womensBagsData=await womensBags.json();
            const womensDressData=await womensDress.json();
            const womensJewellaryData=await womensJewellary.json();
            const womensWatchesData=await womensWatches.json();
            const womensShoesData=await womensShoes.json();

            const combinedData=[...womensBagsData.products, ...womensDressData.products, ...womensJewellaryData.products, ...womensWatchesData.products, ...womensShoesData.products];
            setProducts(combinedData)
        }catch(error){
            console.error("Error Fetched data:", error);
        }finally {
            setLaoding(false)
        }
       };
       fetchProducts();


    },[]);
    const filteredProducts=products.filter(product => {
        if(userInput==="")
            return true;
        return product.title.toLowerCase().includes(userInput.toLowerCase());
    
    })
  return (
    <div>
       <div className="input-card">
        <input type="search"
        placeholder='Search Products Here...'
        value={userInput} 
        onChange={(e)=>setUserInput(e.target.value)}
        style={{width:"600px", height:"60px"}}/>
       </div>

       {
        loading ?(
                <div className="loading-page">
                    <h2 className="page-load">Loading...</h2>
                </div>
            ): filteredProducts.length > 0 ? (
                <div className="beauty-wrapper">
                    {filteredProducts.map(product =>(
                            <div className="container-beauty" key={product.id}>
                                 <img src={product.thumbnail} alt={product.title} />
                                 <p className="title">{product.title}</p>
                                 <span className="rating">Rating   {product.rating}</span>
                                 <p className="price">$  {product.price}</p>
                                 <button className="add-to-cart" onClick={()=>addToCart(product)}>Add To Cart</button>
                             <Link className='product-link' to={`/product/${product.id}`}>View Details</Link>
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

export default Womens
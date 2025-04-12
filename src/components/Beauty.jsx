
import React, { useEffect, useState } from 'react';
import './beauty.css';
import { UseCart } from './CartProvider';
import { Link } from 'react-router-dom';

function Beauty() {
    const [products, setProducts] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(true);
    const {addToCart}=UseCart();

    useEffect(() => {
        const fetchProducts=async ()=>{
            try{
                const [beautyRes,FragranceRes , skinCareRes]=await Promise.all([
                    fetch('https://dummyjson.com/products/category/beauty'),
                    fetch('https://dummyjson.com/products/category/fragrances'),
                    fetch('https://dummyjson.com/products/category/skin-care'),

                ]);
                const beautyData=await beautyRes.json();
                const FragranceData=await FragranceRes.json();
                const skinCareData=await skinCareRes.json();
                const combinedProducts=[...beautyData.products, ...FragranceData.products, ...skinCareData.products];
                setProducts(combinedProducts);
            }
            catch(error) {
                console.error("Error fetching Products:", error)
            }
            finally {
                setLoading(false);
            }
       };
       fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        userInput === "" || product.title.toLowerCase().includes(userInput.toLowerCase())
    );

    return (
        <div>
            <div className="input-card">
                <input
                    type="search"
                    placeholder="Search products..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    style={{ width: "600px", height: "60px" }}
                />
            </div>

            {loading ? (
                <div className="loading-page">
                    <h2 className='page-load'>Loading...</h2>
                </div>
            ) : filteredProducts.length > 0 ? (
                <div className="beauty-wrapper">
                    {filteredProducts.map(product => (
                        <div className="container-beauty" key={product.id}>
                            <img src={product.thumbnail} alt={product.title} />
                            <p className="title">{product.title}</p>
                            <span className="rating">Rating {product.rating}</span>
                            <p className="price">${product.price}</p>
                            <button className="add-to-cart" onClick={()=>addToCart(product)}>Add to cart</button>
                        <Link className='product-link' to={`/product/${product.id}`}>View Details</Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-product">
                    <h3 className="no-data">No Products Found</h3>
                </div>
            )}
        </div>
    );
}

export default Beauty;

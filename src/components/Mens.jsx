import React, { useEffect, useState } from 'react';
import './beauty.css'
import {Link} from 'react-router-dom'
import { UseCart } from './CartProvider';
function Mens() {
    const [products, setProducts] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(true);
    const {addToCart}=UseCart()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [shirtsRes, shoesRes, watchesRes] = await Promise.all([
                    fetch('https://dummyjson.com/products/category/mens-shirts'),
                    fetch('https://dummyjson.com/products/category/mens-shoes'),
                    fetch('https://dummyjson.com/products/category/mens-watches'),
                ]);

                const shirtsData = await shirtsRes.json();
                const shoesData = await shoesRes.json();
                const watchData = await watchesRes.json();

                const combinedProducts = [...shirtsData.products, ...shoesData.products, ...watchData.products];
                setProducts(combinedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        if (userInput === "") return true;
        return product.title.toLowerCase().includes(userInput.toLowerCase());
    });

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
            {
                loading ? (
                    <div className="loading-page">
                        <h2 className='page-load'>Loading...</h2>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="beauty-wrapper">
                       { filteredProducts.map(product => (
                        <div className="container-beauty" key={product.id}>
                           <img src={product.thumbnail} alt={product.title} />
                            <p className="title">{product.title}</p>
                            {/* <p className="description">{product.description}</p> */}
                            <span className="rating">Rating {product.rating}</span>
                            <p className="price">${product.price} </p>
                            <button className="add-to-cart" onClick={()=>addToCart(product)}>Add To Cart</button>
                            <Link className='product-link' to={`/product/${product.id}`}>View Details</Link>
                        </div>
                    ))}
                    </div>
                ) : (
                    <div className="no-product">
                        <h3 className="no-data">No Products Found</h3>
                    </div>
                )
            }
        </div>
    );
}

export default Mens;

import React, { useContext, useState } from 'react'
import { createContext } from 'react'

const CartContext=createContext();

export const UseCart=()=>
    useContext(CartContext);

function CartProvider({children}) {
    const [cartItems, setCartItems]=useState([]);
    // const addToCart=(product)=>{
    //     setCartItems((prev)=>[...prev,product])
    // };

    const addToCart = (product) => {
        setCartItems((prevItems) => {
          const existingItem = prevItems.find(item => item.id === product.id);
          if (existingItem) {
            return prevItems.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          } else {
            return [...prevItems, { ...product, quantity: 1 }];
          }
        });
      };
      


    // const removeFromCart=(id)=>{
    //     setCartItems((prev)=>prev.filter((item)=>item.id!==id))
    // };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => {
          return prevItems
            .map(item => {
              if (item.id === id) {
                if (item.quantity > 1) {
                  return { ...item, quantity: item.quantity - 1 };
                } else {
                  return null; // remove it if quantity is 1
                }
              }
              return item;
            })
            .filter(Boolean); // remove nulls
        });
      };
      

    const clearCart=()=>setCartItems([]);
    const gstRate = 0.18;
    // const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const gst = total * gstRate;
    const grandTotal = total + gst;
  return (
    <CartContext.Provider
    value={{cartItems,addToCart,removeFromCart,clearCart,total,gst,grandTotal}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

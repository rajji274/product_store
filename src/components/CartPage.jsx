// src/components/CartPage.js
import React from 'react'
import { UseCart } from './CartProvider'

const CartPage = () => {
  const { cartItems, removeFromCart, total, gst, grandTotal } = UseCart()

  return (
    <div className="cart-page">
      
      {cartItems.length === 0 ? (
        <p className='empty-cart' style={{textAlign:"center",padding:"2vh 2.5vw", fontSize:"40px", color:"red"}}>Your Cart is Empty</p>
      ) : (
        <>
          <ul >
          <h2>Your Cart</h2>
            {cartItems.map((item) => (
              <li key={item.id} style={{border:"1px solid black",width:"400px", height:"fit-content",padding:"1vh 1.5vw",margin:"5px 7px"}}>
                <img src={item.thumbnail} alt={item.title} style={{width:"300px",height:"250px",objectFit:"cover"}}/>  {item.title} 
                {item.description}
                - ₹{item.price} x {item.quantity}      
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}

          </ul>
          <hr />
          <p>SubTotal: ₹{total.toFixed(2)}</p>
          <p>GST (18%): ₹{gst.toFixed(2)}</p>
          <p><strong>Total: ₹{grandTotal.toFixed(2)}</strong></p>
        </>
      )}
    </div>
  )
}

export default CartPage

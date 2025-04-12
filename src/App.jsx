import { useState } from 'react'

import Navbar from './components/Navbar'
import Beauty from './components/Beauty'
import { Route, Router, Routes } from 'react-router-dom'
import Mens from './components/Mens'
import CartProvider from './components/CartProvider'
import CartPage from './components/CartPage'
import Womens from './components/Womens'
import Eletricals from './components/Eletricals'
import ProductDetail from './components/ProductDetails'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CartProvider>
    <Navbar/>
     {/* <GetData/> */}
     <Routes>
      <Route path='beauty' element={<Beauty/>}/>;
      <Route path='mens' element={<Mens/>}/>;
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path='cart' element={<CartPage/>}/>
      <Route path='womens' element={<Womens/>}/>
      <Route path='eletricals' element={<Eletricals/>}/>
     
     </Routes>
    </CartProvider>
    </>
  )
}

export default App

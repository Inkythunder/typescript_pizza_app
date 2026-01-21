import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Pizzas from "./pages/Pizzas.tsx";
import Pizza from "./pages/Pizza.tsx";
import Navbar from './components/Navbar';
import Cart from "./pages/Cart.tsx";
import {useState} from "react";
import {CartItemDetails} from "./types.ts";
import { v4 as uuidv4 } from 'uuid';
import {ShoppingCart} from "./types.ts";
import Checkout from "./pages/Checkout.tsx";

function App() {

  const [cartContents, setCartContents] = useState<ShoppingCart>({});

  function addToCart(itemDetails: CartItemDetails) {

    const cartId = uuidv4();

    setCartContents(prevState => {
      const newState: ShoppingCart = {};
      Object.assign(newState, prevState);
      newState[cartId] = itemDetails;
      return newState;
    });
    console.log(itemDetails.pizzaId + " added")
  }

  function removeFromCart(cartId: string) {
    setCartContents(prevCart => {
      const newCart: ShoppingCart = {};
      Object.assign(newCart, prevCart);
      delete newCart[cartId];
      return newCart;
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pizzas" element={<Pizzas addToCart={addToCart} />} />
          <Route path="/pizza/:id" element={<Pizza addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                cartContents={cartContents}/>}
              />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
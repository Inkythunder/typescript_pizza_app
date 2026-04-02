import {Route, Routes, useNavigate} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Pizzas from "./pages/Pizzas.tsx";
import Pizza from "./pages/Pizza.tsx";
import Navbar from './components/Navbar';
import Cart from "./pages/Cart.tsx";
import {createContext, useEffect, useState} from "react";
import {CartItemDetails, PizzaDetails, ShoppingCart, ToppingDetails} from "./types.ts";
import {v4 as uuidv4} from 'uuid';
import Checkout from "./pages/Checkout.tsx";

export interface PizzaListResponse {
  allPizzas: Record<string, PizzaDetails>;
  allToppings: Record<string, ToppingDetails>;
}

export interface OrderFormData {
  customer_name: string;
  email: string;
  phone: string;
  timeslot: string;
}

export const PizzaListContext = createContext<PizzaListResponse | null>(null);

function App() {

  const navigate = useNavigate();

  const [cartContents, setCartContents] = useState<ShoppingCart>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : {};
  });
  const [pizzaList, setPizzasList] = useState<PizzaListResponse | null>(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartContents));
  }, [cartContents]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/pizzas");
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      setPizzasList(result);
    };

    fetchData().catch(console.error);

  }, [])

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

  async function checkout(formData: OrderFormData) {
    const orderItems = Object.entries(cartContents).map(([cartId, item]) => ({
      id: cartId,
      base_pizza_id: item.pizzaId,
      extra_toppings: item.customisations || [],
    }));

    const totalPrice = Object.values(cartContents).reduce((sum, item) => {
      const pizza = pizzaList?.allPizzas[item.pizzaId];
      return sum + (pizza ? Number(pizza.price) : 0);
    }, 0);

    const response = await fetch("/api/place_order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        total_price: totalPrice,
        customer_name: formData.customer_name,
        email: formData.email,
        phone: formData.phone,
        timeslot: formData.timeslot,
        order_items: orderItems,
      }),
    });

    if (!response.ok) {
      alert("Error placing order");
      return;
    }

    setCartContents({});
    alert("Your order has been placed!");
    navigate("/");
  }

  return (
    <PizzaListContext.Provider value={pizzaList}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pizzas" element={<Pizzas addToCart={addToCart} />} />
            <Route path="/pizza/:id" element={<Pizza addToCart={addToCart} />} />
            <Route path="/cart" element={
                <Cart
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  cartContents={cartContents}/>}
            />
            <Route path="/checkout" element={<Checkout checkout={checkout}/>} />
          </Routes>
        </main>
      </div>
    </PizzaListContext.Provider>
  )
}

export default App
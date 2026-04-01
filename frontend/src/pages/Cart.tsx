import {Link} from "react-router-dom";
import {ShoppingCart, CartItemDetails} from "../types.ts";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {PizzaListContext} from "../App.tsx";

function Cart({addToCart, removeFromCart, cartContents} :
              {addToCart: (item: CartItemDetails) => void,
                removeFromCart: (id: string) => void,
                cartContents: ShoppingCart}) {

  const cartElements = [];

  const cartIdList = Object.keys(cartContents);
  if (cartIdList.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p>Your cart is empty.</p>
        <Link to="/">back to pizzas</Link>
      </div>
    );
  }

  const pizzaList = useContext(PizzaListContext);

  if(!pizzaList) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p>Pizza list loading...</p>
      </div>
    );
  }

  let price = 0;

  for (const cartId of cartIdList) {

    const cartItem = cartContents[cartId];
    const currentPizza = pizzaList.allPizzas[cartItem.pizzaId];
    const currentPizzaToppings = cartItem.customisations;

    price += parseInt(currentPizza.price);

    cartElements.push(
      <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-600">
          {currentPizza.name}
        </h1>
        <p>
          {currentPizzaToppings?.join(', ')}
        </p>
        <p className="mt-4 text-gray-600">
          £{currentPizza.price}
        </p>
        <Link to={"/pizza/" + cartItem.pizzaId} className="text-blue-600 hover:text-blue-800">
          Pizza Details
        </Link>
        <br/>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => addToCart(cartItem.cartId)}
        >
          Add to cart
        </button>
        <br/>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => removeFromCart(cartId)}
        >
          Remove from cart
        </button>
      </div>
    )
  }

  let totalPriceElement = [];
  const navigate = useNavigate();

  if(price > 0) {
    totalPriceElement.push(
      <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
        Total: £{price}
        <br/>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => navigate('/checkout')}>
          Go To Checkout
        </button>

      </div>
    )
  }

  return (
    <div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        {cartElements}
      </div>
      {totalPriceElement}
    </div>
  )
}

export default Cart
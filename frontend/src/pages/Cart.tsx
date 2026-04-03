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
      <div key={cartId} className="mt-8 bg-white p-8 rounded-lg shadow-md flex items-center gap-6">
        <Link to={"/pizza/" + cartItem.pizzaId}>
          <img
            src={currentPizza.image_url}
            alt={currentPizza.name}
            className="w-32 h-32 object-cover rounded-lg"
          />
        </Link>
        <div className="flex flex-col">
          <Link to={"/pizza/" + cartItem.pizzaId} className="text-3xl font-bold text-blue-600 hover:text-blue-800">
            {currentPizza.name}
          </Link>
          <p className="text-gray-600">
            £{(Number(currentPizza.price) / 100).toFixed(2)}
          </p>
          {currentPizzaToppings && currentPizzaToppings.length > 0 && (
            <p className="text-gray-500">
              Extra: {currentPizzaToppings.join(', ')}
            </p>
          )}
        </div>
        <div className="ml-auto flex flex-col gap-2">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => addToCart(cartItem)}
          >
            Add to cart
          </button>
          <button
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
            onClick={() => removeFromCart(cartId)}
          >
            Remove from cart
          </button>
        </div>
      </div>
    )
  }

  let totalPriceElement = [];
  const navigate = useNavigate();

  if(price > 0) {
    totalPriceElement.push(
      <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
        Total: £{(price / 100).toFixed(2)}
        <br/>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => navigate('/checkout')}>
          Go To Checkout
        </button>

      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {cartElements}
      </div>
      {totalPriceElement}
    </div>
  )
}

export default Cart
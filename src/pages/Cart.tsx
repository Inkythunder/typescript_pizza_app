import {CartItemDetails, PIZZAS} from "../sampleData.ts";
import {Link} from "react-router-dom";
import {ShoppingCart} from "../App.tsx";

function Cart({addToCart, removeFromCart, cartContents} :
              {addToCart: (item: CartItemDetails) => void,
                removeFromCart: (id: string) => void,
                cartContents: ShoppingCart}) {
  const cartElements = [];


  //for of, loop through keys, use keys to get pizza details?


  const cartIdList = Object.keys(cartContents);

  console.log(cartIdList)
  for (const cartId of cartIdList) {
    console.log(cartId)

    const cartItem = cartContents[cartId];
    const currentPizza = PIZZAS[cartItem.pizzaId];

    cartElements.push(
      <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-600">
          {currentPizza.name}
        </h1>
        <p className="mt-4 text-gray-600">
          {currentPizza.price}
        </p>
        <Link to={"/pizza/" + cartItem.pizzaId} className="text-blue-600 hover:text-blue-800">
          Pizza Details
        </Link>
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
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      {cartElements}
    </div>
  )
}

export default Cart
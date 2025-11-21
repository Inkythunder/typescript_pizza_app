import {PIZZAS} from "../sampleData.ts";
import {CartItemDetails} from "../types.ts";
import {Link} from "react-router-dom";

function Pizzas({addToCart} :{addToCart: (item: CartItemDetails) => void}) {
  const pizzaElements = [];

  for (const id in PIZZAS) {
    const pizza = PIZZAS[id];
    pizzaElements.push(
      <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-600">
          {pizza.name}
        </h1>
        <p className="mt-4 text-gray-600">
          {pizza.price}
        </p>
        <Link to={"/pizza/" + id} className="text-blue-600 hover:text-blue-800">
          Pizza Details
        </Link>
        <br/>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => addToCart({pizzaId: id})}
        >
          Add to cart
        </button>
      </div>
    )

  }
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      {pizzaElements}
    </div>
  )
}

export default Pizzas
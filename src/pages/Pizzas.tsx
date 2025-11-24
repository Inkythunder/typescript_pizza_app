import {PIZZAS} from "../sampleData.ts";
import {CartItemDetails} from "../types.ts";
import {Link} from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton.tsx";

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
        <AddToCartButton onClick={() => addToCart({pizzaId: id})}/>
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
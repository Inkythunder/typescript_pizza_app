import {CartItemDetails} from "../types.ts";
import {Link} from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton.tsx";
import {useContext} from "react";
import {PizzaListContext} from "../App.tsx";

function Pizzas({addToCart}: { addToCart: (item: CartItemDetails) => void }) {
  const pizzaElements = [];
  const pizzaList = useContext(PizzaListContext);

  if(!pizzaList) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p>Pizza list loading...</p>
      </div>
    );
  }

  for (const id in pizzaList.allPizzas) {

    const pizza = pizzaList.allPizzas[id];

    pizzaElements.push(
      <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
        //TODO make image appear here
        <h1 className="text-3xl font-bold text-blue-600">
          {pizza.name}
        </h1>
        <p className="mt-4 text-gray-600">
          £{(Number(pizza.price) / 100).toFixed(2)}
        </p>
        <p className="mt-4 text-gray-600">
          {pizza.description}
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
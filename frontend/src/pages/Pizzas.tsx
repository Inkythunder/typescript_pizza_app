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
      <Link to={"/pizza/" + id} key={id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow block">
        <img src={`/${pizza.image_url}`} alt={pizza.name} className="w-full h-48 object-cover rounded-lg" />
        <h1 className="mt-3 text-2xl font-bold text-blue-600">
          {pizza.name}
        </h1>
        <p className="mt-2 text-gray-600">
          £{(Number(pizza.price) / 100).toFixed(2)}
        </p>
        <p className="mt-2 text-gray-600">
          {pizza.description}
        </p>
        <div onClick={(e) => e.preventDefault()}>
          <AddToCartButton onClick={() => addToCart({pizzaId: id})}/>
        </div>
      </Link>
    )

  }
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pizzaElements}
      </div>
    </div>
  )
}

export default Pizzas
import {useParams} from "react-router-dom";
import {useContext, useState} from "react";
import AddToCartButton from "../components/AddToCartButton.tsx";
import {CartItemDetails} from "../types.ts";
import {PizzaListContext} from "../App.tsx";


function Pizza({addToCart} :{addToCart: (item: CartItemDetails) => void}) {

  const pizzaList = useContext(PizzaListContext);

  const {id} = useParams();
  if (!id) {
    throw Error("No peets bro")
  }

  if(!pizzaList) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p>Pizza list loading...</p>
      </div>
    );
  }

  const [addedToppings, setAddedToppings] = useState<string[]>([]);

  return (

    <div className="max-w-6xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md flex gap-8">
        <img src={`/${pizzaList.allPizzas[id].image_url}`} alt={pizzaList.allPizzas[id].name} className="w-1/3 object-cover rounded-lg flex-shrink-0" />
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-blue-600">
            {pizzaList.allPizzas[id].name}
          </h1>
          <p className="text-gray-600">
            {pizzaList.allPizzas[id].description}
          </p>
          <p className="text-gray-600">
            Price: £{(Number(pizzaList.allPizzas[id].price) / 100).toFixed(2)}
          </p>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Additional Toppings</h2>
            <div>
              <form className="grid grid-cols-4 gap-2">
                {
                  Object.values(pizzaList.allToppings).map((topping) => {
                    return <label key={topping.id} htmlFor={topping.name}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer border transition-colors ${
                        addedToppings.includes(topping.name)
                          ? 'bg-blue-50 border-blue-300'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={topping.name}
                        checked={addedToppings.includes(topping.name)}
                        className="w-4 h-4 accent-blue-600"
                        onChange={(event) => {
                          if (event.target.checked) {
                            setAddedToppings(prevState => [...prevState, topping.name]);
                          } else {
                            setAddedToppings(prevState => prevState.filter(
                              (removedTopping) => topping.name != removedTopping
                            ));
                          }
                        }}
                      />
                      <span className="text-sm text-gray-700">{topping.name}</span>
                    </label>
                  })
                }
              </form>
              <AddToCartButton onClick={() => addToCart({pizzaId: id, customisations: addedToppings})} redirectTo={'/pizzas'}/>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Pizza
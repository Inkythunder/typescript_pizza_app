import {PIZZAS, TOPPINGS} from "../sampleData.ts";
import {useParams} from "react-router-dom";
import {useState} from "react";
import AddToCartButton from "../components/AddToCartButton.tsx";
import {CartItemDetails} from "../types.ts";

function Pizza({addToCart} :{addToCart: (item: CartItemDetails) => void}) {

  const {id} = useParams();
  if (!id) {
    throw Error("No peets bro")
  }

  const [addedToppings, setAddedToppings] = useState<string[]>([]);

  return (

    <div className="bg-white p-8 rounded-lg shadow-md flex gap-6 items-center">
      <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center text-gray-400">
        Image
      </div>
      <div>
        <h1 className="text-3xl font-bold text-blue-600">
          {PIZZAS[id].name}
        </h1>
        <p className="mt-4 text-gray-600">
          Price: {PIZZAS[id].price}
        </p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Additional Toppings</h2>
        <div className="space-y-2">
          <form>
            {
              TOPPINGS.map((topping) => {
                return <div>
                  <input
                    type="checkbox"
                    id={topping}
                    checked={addedToppings.includes(topping)}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setAddedToppings(prevState => [...prevState, topping]);
                      } else {
                        setAddedToppings(prevState => prevState.filter(
                          (removedTopping) => topping != removedTopping
                        ));
                      }
                    }}
                  />
                  <label htmlFor={topping}>{topping}</label>
                </div>
              })
            }
          </form>
          <AddToCartButton onClick={() => addToCart({pizzaId: id})} redirectTo={'/pizzas'}/>
        </div>
      </div>
    </div>


  )
}

export default Pizza
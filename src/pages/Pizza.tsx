import {PIZZAS} from "../sampleData.ts";
import {useParams} from "react-router-dom";

function Pizza() {

  const {id} = useParams();
  if (!id) {
    throw Error("No peets bro")
  }

  return (

    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-blue-600">
        {PIZZAS[id].name}
      </h1>
      <p className="mt-4 text-gray-600">
        Price: {PIZZAS[id].price}
      </p>
    </div>
  )
}

export default Pizza

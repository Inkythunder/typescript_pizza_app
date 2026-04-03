import {Link} from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center" style={{minHeight: "calc(100vh - 120px)"}}>
      <h1 className="text-5xl font-bold text-gray-800 mb-12">Luigi's Pizza</h1>
      <Link
        to="/pizzas"
        className="animate-bounce bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold py-6 px-12 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        Order Now
      </Link>
    </div>
  )
}

export default Home

import {Link} from "react-router-dom";

function Navbar({ cartCount }: { cartCount: number }) {
  return (
    <nav className="bg-white shadow p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="m-2 text-blue-600 hover:text-blue-800">
            Home
          </Link>
          <Link to="/pizzas" className="m-2 text-blue-600 hover:text-blue-800">
            Pizzas
          </Link>
        </div>
        <Link to="/cart" className="m-2 text-blue-600 hover:text-blue-800 relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar;
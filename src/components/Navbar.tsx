import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-white shadow p-4">
            <Link to="/" className="m-2 text-blue-600 hover:text-blue-800">
                Home
            </Link>
            <Link to="/about" className="m-2 text-blue-600 hover:text-blue-800">
                About
            </Link>
            <Link to="/pizzas" className="m-2 text-blue-600 hover:text-blue-800">
                Pizzas
            </Link>
            <Link to="/cart" className="m-2 text-blue-600 hover:text-blue-800">
                Cart
            </Link>

        </nav>
    )
}

export default Navbar;
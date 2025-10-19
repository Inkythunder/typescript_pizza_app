import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Pizzas from "./pages/Pizzas.tsx";
import Pizza from "./pages/Pizza.tsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4">
        <Link to="/" className="mr-4 text-blue-600 hover:text-blue-800">
          Home
        </Link>
        <Link to="/about" className="mr-4 text-blue-600 hover:text-blue-800">
          About
        </Link>
        <Link to="/pizzas" className="text-blue-600 hover:text-blue-800">
          Pizzas
        </Link>
      </nav>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pizzas" element={<Pizzas />} />
          <Route path="/pizza/:id" element={<Pizza />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import './Header.css'

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const { cartCount } = useCart()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Element SAS</h1>
        </Link>

        <nav className="main-nav">
          <Link to="/category/1" className="nav-link">Hombre</Link>
          <Link to="/category/2" className="nav-link">Mujer</Link>
          <Link to="/products" className="nav-link">Todos los Productos</Link>
        </nav>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login" className="auth-link">Iniciar Sesión</Link>
          <Link to="/register" className="auth-link">Registrarse</Link>
          <Link to="/cart" className="cart-link">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header

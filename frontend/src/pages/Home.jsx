import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import './Home.css'
import apiService from '../services/api'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true)
      try {
        const products = await apiService.getFeaturedProducts(4)
        setFeaturedProducts(products)
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Element SAS</h1>
          <p>Ropa deportiva de alta calidad para atletas como tú</p>
          <Link to="/products" className="cta-button">
            Ver Productos
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2>Compra por Categoría</h2>
          <div className="categories-grid">
            <Link to="/category/1" className="category-card">
              <div className="category-image">
                <img src="/img/hombre-category.jpg" alt="Ropa Deportiva Hombre" />
              </div>
              <h3>Hombre</h3>
              <p>Camisetas, pantalonetas, pantalones y zapatillas</p>
            </Link>
            
            <Link to="/category/2" className="category-card">
              <div className="category-image">
                <img src="/img/mujer-category.jpg" alt="Ropa Deportiva Mujer" />
              </div>
              <h3>Mujer</h3>
              <p>Camisetas, tops, faldas, licras y zapatillas</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container">
          <h2>Productos Destacados</h2>
          {loading ? (
            <div className="loading">Cargando productos...</div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="view-all">
            <Link to="/products" className="view-all-button">
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>¿Por qué elegirnos?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🚚</div>
              <h3>Envío Gratis</h3>
              <p>En compras superiores a $150.000</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔄</div>
              <h3>Devoluciones Fáciles</h3>
              <p>30 días para devoluciones sin preguntas</p>
            </div>
            <div className="feature">
              <div className="feature-icon">⭐</div>
              <h3>Calidad Premium</h3>
              <p>Solo marcas reconocidas mundialmente</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🏆</div>
              <h3>Para Atletas</h3>
              <p>Diseñado para el máximo rendimiento</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

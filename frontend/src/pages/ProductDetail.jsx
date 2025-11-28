import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './ProductDetail.css'
import apiService from '../services/api'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const data = await apiService.getProduct(id)
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => setAddedToCart(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [addedToCart])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getSizes = (categoryId) => {
    // Return different sizes based on category
    if ([6, 11].includes(categoryId)) { // Shoes
      return ['36', '37', '38', '39', '40', '41', '42', '43', '44']
    }
    return ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla')
      return
    }
    addToCart(product, selectedSize, quantity)
    setAddedToCart(true)
  }

  if (loading) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="loading">Cargando producto...</div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="not-found">
            <h2>Producto no encontrado</h2>
            <Link to="/products" className="back-link">Volver a productos</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="product-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <Link to="/products">Productos</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-content">
          {/* Product Image */}
          <div className="product-image-section">
            <div className="main-image">
              <img 
                src={product.image_url || '/placeholder-image.svg'} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = '/placeholder-image.svg'
                }}
              />
              {product.is_new && <span className="new-badge">Nuevo</span>}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-price">
              {formatPrice(product.price)}
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {/* Size Selection */}
            <div className="size-selection">
              <h3>Talla</h3>
              <div className="sizes-grid">
                {getSizes(product.category_id).map(size => (
                  <button
                    key={size}
                    className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="quantity-selection">
              <h3>Cantidad</h3>
              <div className="quantity-controls">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button 
              className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={addedToCart}
            >
              {addedToCart ? 'Agregado!' : 'Agregar al Carrito'}
            </button>

            {/* Product Features */}
            <div className="product-features">
              <h3>Características</h3>
              <ul>
                <li>Material de alta calidad</li>
                <li>Diseño ergonómico</li>
                <li>Tecnología transpirable</li>
                <li>Resistente al desgaste</li>
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="shipping-info">
              <h3>Información de Envío</h3>
              <div className="shipping-item">
                <span className="icon">🚚</span>
                <div>
                  <strong>Envío gratis</strong>
                  <p>En compras superiores a $150.000</p>
                </div>
              </div>
              <div className="shipping-item">
                <span className="icon">🔄</span>
                <div>
                  <strong>Devoluciones gratis</strong>
                  <p>30 días para devoluciones</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

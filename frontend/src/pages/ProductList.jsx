import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import './ProductList.css'
import { products as localProducts } from '../data/products'


const ProductList = () => {
  const { categoryId } = useParams()
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('search')
  
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    priceRange: '',
    sortBy: 'name'
  })

useEffect(() => {
  setLoading(true)

  // 1. Empezamos con todos los productos locales
  let filtered = [...localProducts]

  // 2. Filtrar por categoría
  if (categoryId) {
    filtered = filtered.filter(p => p.category === categoryId)
  }

  // 3. Buscar por texto
  if (searchTerm) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // 4. Filtrar por rango de precio
  if (filters.priceRange) {
    if (filters.priceRange === "under-100k") {
      filtered = filtered.filter(p => p.price < 100000)
    }
    if (filters.priceRange === "100k-200k") {
      filtered = filtered.filter(p => p.price >= 100000 && p.price <= 200000)
    }
    if (filters.priceRange === "200k-300k") {
      filtered = filtered.filter(p => p.price >= 200000 && p.price <= 300000)
    }
    if (filters.priceRange === "over-300k") {
      filtered = filtered.filter(p => p.price > 300000)
    }
  }

  // 5. Ordenar
  if (filters.sortBy === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name))
  }
  if (filters.sortBy === "price-low") {
    filtered.sort((a, b) => a.price - b.price)
  }
  if (filters.sortBy === "price-high") {
    filtered.sort((a, b) => b.price - a.price)
  }

  setProducts(filtered)
  setLoading(false)
}, [categoryId, searchTerm, filters])

  const getCategoryTitle = () => {
    if (searchTerm) return `Resultados para "${searchTerm}"`
  if (categoryId === 'deportiva') return 'Ropa Deportiva'
if (categoryId === 'elegante') return 'Ropa Elegante'
  return 'Todos los Productos'
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  return (
    <div className="product-list">
      <div className="container">
        <div className="page-header">
          <h1>{getCategoryTitle()}</h1>
          <p>{products.length} productos encontrados</p>
        </div>

        <div className="content-wrapper">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <h3>Filtros</h3>
            
            <div className="filter-group">
              <h4>Precio</h4>
              <select 
                value={filters.priceRange} 
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              >
                <option value="">Todos los precios</option>
                <option value="under-100k">Menos de $100.000</option>
                <option value="100k-200k">$100.000 - $200.000</option>
                <option value="200k-300k">$200.000 - $300.000</option>
                <option value="over-300k">Más de $300.000</option>
              </select>
            </div>

            <div className="filter-group">
              <h4>Ordenar por</h4>
              <select 
                value={filters.sortBy} 
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <option value="name">Nombre</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
              </select>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="products-content">
            {loading ? (
              <div className="loading">Cargando productos...</div>
            ) : products.length === 0 ? (
              <div className="no-products">
                <h3>No se encontraron productos</h3>
                <p>Intenta ajustar los filtros o buscar con otros términos.</p>
              </div>
            ) : (
              <div className="products-grid">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default ProductList

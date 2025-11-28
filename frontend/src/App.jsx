import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import Returns from './pages/Returns'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Terms from './pages/Terms' // Import the new Terms component
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/category/:categoryId" element={<ProductList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/terms" element={<Terms />} /> {/* Add the new route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

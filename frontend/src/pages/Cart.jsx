import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Tu Carrito</h1>
        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.size}`} className="cart-item">
                  <img src={item.image_url} alt={item.name} />
                  <div className="item-details">
                    <h2>{item.name}</h2>
                    <p>Talla: {item.size}</p>
                    <p>Precio: {formatPrice(item.price)}</p>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.size)} className="remove-btn">Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h2>Resumen del Pedido</h2>
              <p>Total: <strong>{formatPrice(cartTotal)}</strong></p>
              <Link to="/checkout" className="btn btn-primary">Proceder al Pago</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

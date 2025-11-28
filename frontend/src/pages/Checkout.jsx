import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();

  const handleCheckout = (e) => {
    e.preventDefault();
    alert('¡Gracias por tu compra!');
    clearCart();
    // Redirect to home or order confirmation page
    window.location.href = '/';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        <div className="checkout-content">
          <div className="order-summary">
            <h2>Resumen de tu Orden</h2>
            {cartItems.map(item => (
              <div key={`${item.id}-${item.size}`} className="summary-item">
                <span>{item.name} (x{item.quantity})</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <hr />
            <div className="summary-total">
              <span>Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
          </div>
          <form className="checkout-form" onSubmit={handleCheckout}>
            <h2>Información de Envío</h2>
            <input type="text" placeholder="Nombre Completo" required />
            <input type="text" placeholder="Dirección" required />
            <input type="text" placeholder="Ciudad" required />
            <input type="text" placeholder="País" required />
            <h2>Información de Pago</h2>
            <input type="text" placeholder="Número de Tarjeta" required />
            <input type="text" placeholder="MM/AA" required />
            <input type="text" placeholder="CVC" required />
            <button type="submit" className="btn btn-primary">Pagar Ahora</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

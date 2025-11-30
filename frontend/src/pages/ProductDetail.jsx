import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === parseInt(id));

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
  };

  const [selectedSize, setSelectedSize] = useState("");

  if (!product) {
    return <h2>Producto no encontrado</h2>;
  }

  return (
    <div className="product-detail container">
      <div className="detail-left">
        <img src={product.image_url} alt={product.name} />
      </div>

      <div className="detail-right">
        <h1>{product.name}</h1>
        <p className="price">${product.price.toLocaleString("es-CO")}</p>
        <p className="description">{product.description}</p>

        <div className="size-selector">
          <h4>Tallas disponibles</h4>
          <div className="sizes">
            {product.sizes.map(size => (
              <button
                key={size}
                className={selectedSize === size ? "active" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          className="add-to-cart"
          onClick={handleAddToCart}
          disabled={!selectedSize}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;


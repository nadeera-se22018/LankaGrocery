import { Link } from 'react-router-dom';
import Rating from './Rating'; 
import useWishlistStore from '../store/wishlistStore';

const Product = ({ product }) => {

  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlistStore();
  const isFavorite = wishlistItems.some((item) => item._id === product._id);

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden premium-shadow premium-card-hover relative flex flex-col h-full transition-all duration-300">

      <button 
        onClick={() => isFavorite ? removeFromWishlist(product._id) : addToWishlist(product)}
        className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur rounded-full shadow-sm hover:scale-110 transition"
      >
        <svg className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <Link to={`/product/${product._id}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
          onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=Lanka+Grocery'}
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600 line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="mb-4">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-green-700">Rs. {product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
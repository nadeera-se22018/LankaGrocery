import { Link } from 'react-router-dom';
import Rating from './Rating';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore'; // Wishlist එකත් import කරගත්තා
import toast from 'react-hot-toast';

const Product = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlistStore();
  const isFavorite = wishlistItems.some((item) => item._id === product._id);

  const addToCartHandler = (e) => {
    e.preventDefault();
    if (product.countInStock > 0) {
      addToCart({ ...product, qty: 1 });
      toast.success(`${product.name} added to cart! 🛒`);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 premium-shadow premium-card-hover group flex flex-col h-full relative overflow-hidden border border-slate-100 transition-all duration-300">
      
      <div className="absolute top-6 left-6 z-10">
        <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          Fresh
        </span>
      </div>

      <button 
        onClick={(e) => {
          e.preventDefault(); 
          isFavorite ? removeFromWishlist(product._id) : addToWishlist(product);
        }}
        className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full shadow-sm hover:scale-110 transition"
      >
        <svg className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      
      <Link to={`/product/${product._id}`} className="relative h-48 rounded-xl overflow-hidden mb-4 bg-slate-50 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500"
          onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=Lanka+Grocery'}
        />
        
        {product.countInStock === 0 && (
           <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-20">
             <span className="bg-slate-800 text-white px-4 py-1.5 rounded-full text-xs font-bold premium-shadow">Out of Stock</span>
           </div>
        )}
      </Link>

      <div className="flex flex-col flex-grow">
        <div className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wide">{product.category}</div>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-slate-800 hover:text-green-600 line-clamp-2 leading-tight mb-2 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mb-4 mt-auto">
          <Rating value={product.rating} text={`${product.numReviews} rev`} />
        </div>

        <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100">
          <span className="text-xl font-black text-green-700">Rs. {product.price.toFixed(2)}</span>
          
          <button 
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className={`w-10 h-10 z-20 rounded-full flex items-center justify-center transition-all transform active:scale-95 ${
              product.countInStock > 0 
                ? 'bg-green-100 text-green-700 hover:bg-green-600 hover:text-white hover:shadow-md' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
            title="Add to Cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
};

export default Product;
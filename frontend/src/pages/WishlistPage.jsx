import { Link } from 'react-router-dom';
import Product from '../components/Product';
import useWishlistStore from '../store/wishlistStore';

const WishlistPage = () => {
  const { wishlistItems } = useWishlistStore();

  return (
    <div className="max-w-7xl mx-auto py-8">
      
      <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-slate-200">
        <span className="text-4xl">❤️</span>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
          My Wishlist
        </h1>
        <span className="bg-slate-200 text-slate-700 py-1 px-3 rounded-full text-sm font-bold ml-2">
          {wishlistItems.length} Items
        </span>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="glass premium-shadow rounded-2xl p-12 text-center max-w-2xl mx-auto mt-10">
          <div className="text-6xl mb-6 animate-bounce">💔</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Your Wishlist is Empty!</h2>
          <p className="text-slate-600 mb-8">
            Looks like you haven't added any fresh products to your wishlist yet.
            Let's find something delicious!
          </p>
          <Link 
            to="/" 
            className="inline-block bg-green-600 text-white font-bold py-3 px-8 rounded-full premium-shadow hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            Start Shopping &rarr;
          </Link>
        </div>
      ) : (
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
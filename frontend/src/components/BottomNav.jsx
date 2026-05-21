import { Link, useLocation } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import useWishlistStore from '../store/wishlistStore'; // Wishlist එක අලුතෙන් Import කරා

const BottomNav = () => {
  const location = useLocation();
  const cartItems = useCartStore((state) => state.cartItems);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const { userInfo } = useAuthStore();
  
  const wishlistItems = useWishlistStore((state) => state.wishlistItems);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 flex justify-around items-center h-16 z-40 pb-safe shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
      
      <Link to="/" className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive('/') ? 'text-green-600' : 'text-slate-500 hover:text-green-500'}`}>
        <svg className="w-6 h-6" fill={isActive('/') ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={isActive('/') ? "0" : "2"}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className="text-[10px] font-bold">Home</span>
      </Link>

      <Link to="/wishlist" className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-colors ${isActive('/wishlist') ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}>
        <div className="relative">
          <svg className="w-6 h-6" fill={isActive('/wishlist') ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={isActive('/wishlist') ? "0" : "2"}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {wishlistItems.length > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white">
              {wishlistItems.length}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold">Wishlist</span>
      </Link>

      <Link to="/cart" className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-colors ${isActive('/cart') ? 'text-green-600' : 'text-slate-500 hover:text-green-500'}`}>
        <div className="relative">
          <svg className="w-6 h-6" fill={isActive('/cart') ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={isActive('/cart') ? "0" : "2"}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartItemCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-green-600 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white">
              {cartItemCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold">Cart</span>
      </Link>

      <Link to={userInfo ? "/profile" : "/login"} className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive('/profile') || isActive('/login') ? 'text-green-600' : 'text-slate-500 hover:text-green-500'}`}>
        <svg className="w-6 h-6" fill={isActive('/profile') ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={isActive('/profile') ? "0" : "2"}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="text-[10px] font-bold">{userInfo ? 'Profile' : 'Login'}</span>
      </Link>

    </div>
  );
};

export default BottomNav;
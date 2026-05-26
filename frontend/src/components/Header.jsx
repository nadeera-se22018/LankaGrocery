import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import useWishlistStore from '../store/wishlistStore'; 

const Header = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [isBrandsExpanded, setIsBrandsExpanded] = useState(false);

  const cartItems = useCartStore((state) => state.cartItems);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const wishlistItems = useWishlistStore((state) => state.wishlistItems);

  const { userInfo, logout } = useAuthStore();

  useEffect(() => {
    const fetchCategoriesAndBrands = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          axios.get('/api/products/categories'),
          axios.get('/api/products/brands'),
        ]);
        setCategories(catRes.data);
        setBrands(brandRes.data);
      } catch (error) {
        console.error('Error fetching categories/brands:', error);
      }
    };
    fetchCategoriesAndBrands();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setIsCategoriesExpanded(false);
      setIsBrandsExpanded(false);
    }
  };

  const logoutHandler = () => {
    logout();
    navigate('/login');
    setIsDropdownOpen(false);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setIsMobileSearchOpen(false);
    } else {
      navigate('/');
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        
        <Link to="/" className="flex items-center space-x-2 group">
          <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🛒</span>
          <span className="text-2xl font-black bg-gradient-premium bg-clip-text text-transparent tracking-tight">
            LankaGrocery
          </span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={searchHandler} className="w-full relative group">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search for fresh products..."
              className="w-full bg-slate-100/50 border border-slate-200 text-slate-800 rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all shadow-inner group-hover:shadow-sm"
            />
            <svg className="w-5 h-5 absolute left-4 top-3 text-slate-400 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button type="submit" className="hidden">Search</button>
          </form>
        </div>

        <nav className="flex items-center space-x-6">
          
          <Link to="/wishlist" className="text-slate-600 hover:text-red-500 transition-colors relative hidden sm:flex items-center group">
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center premium-shadow border-2 border-white">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Search Toggle Icon for Mobile View */}
          <button 
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden text-slate-600 hover:text-green-600 transition-colors flex items-center group focus:outline-none"
            aria-label="Toggle Search"
          >
            <svg className="w-7 h-7 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileSearchOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              )}
            </svg>
          </button>

          <Link to="/cart" className="text-slate-600 hover:text-green-600 transition-colors relative flex items-center group">
            <svg className="w-7 h-7 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center premium-shadow border-2 border-white">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          {userInfo ? (
            <div className="relative">
              <button 
                onClick={toggleDropdown}
                className="flex items-center space-x-2 text-slate-700 hover:text-green-600 font-semibold transition focus:outline-none"
              >
                <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-sm border border-green-200">
                  {userInfo.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:block">Hi, {userInfo.name.split(' ')[0]}</span>
                <svg className="w-5 h-5 hidden md:block text-slate-500 hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl py-2 border border-slate-100 z-50 max-h-[85vh] overflow-y-auto">
                  <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-green-600 transition font-medium">My Profile</Link>
                  
                  {userInfo.isAdmin && (
                    <>
                      <div className="border-t border-slate-100 my-1"></div>
                      <div className="px-4 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">Admin</div>
                      <Link to="/admin/orders" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-green-600 transition">Orders</Link>
                      <Link to="/admin/products" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-green-600 transition">Products</Link>
                      <Link to="/admin/users" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-green-600 transition">Users</Link>
                    </>
                  )}
                  
                  {/* Categories Section */}
                  <div className="border-t border-slate-100 my-1"></div>
                  <div>
                    <button 
                      onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
                      className="w-full flex items-center justify-between px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-green-600 transition text-left focus:outline-none"
                    >
                      <span>Categories</span>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${isCategoriesExpanded ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isCategoriesExpanded && (
                      <div className="bg-slate-50/50 py-1.5 px-3 space-y-0.5 max-h-48 overflow-y-auto border-y border-slate-50">
                        {categories.length === 0 ? (
                          <div className="px-4 py-1 text-xs text-slate-400 italic">Loading categories...</div>
                        ) : (
                          categories.map((cat, idx) => (
                            <Link
                              key={idx}
                              to={`/category/${cat}`}
                              onClick={() => setIsDropdownOpen(false)}
                              className="block px-4 py-1.5 text-xs text-slate-600 hover:text-green-600 hover:bg-green-50/50 rounded-lg transition font-medium"
                            >
                              {cat}
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </div>

                  {/* Brands Section */}
                  <div className="border-t border-slate-100 my-1"></div>
                  <div>
                    <button 
                      onClick={() => setIsBrandsExpanded(!isBrandsExpanded)}
                      className="w-full flex items-center justify-between px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-green-600 transition text-left focus:outline-none"
                    >
                      <span>Brands</span>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${isBrandsExpanded ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isBrandsExpanded && (
                      <div className="bg-slate-50/50 py-1.5 px-3 space-y-0.5 max-h-48 overflow-y-auto border-y border-slate-50">
                        {brands.length === 0 ? (
                          <div className="px-4 py-1 text-xs text-slate-400 italic">Loading brands...</div>
                        ) : (
                          brands.map((brand, idx) => (
                            <Link
                              key={idx}
                              to={`/brand/${brand}`}
                              onClick={() => setIsDropdownOpen(false)}
                              className="block px-4 py-1.5 text-xs text-slate-600 hover:text-green-600 hover:bg-green-50/50 rounded-lg transition font-medium"
                            >
                              {brand}
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-100 my-1"></div>
                  <button onClick={logoutHandler} className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition font-medium">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-700 transition premium-shadow hover:shadow-lg transform hover:-translate-y-0.5 duration-200">
              Sign In
            </Link>
          )}

        </nav>
      </div>

      {/* Mobile Search Bar below the navbar */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-4 pb-4 animate-fade-in">
          <form onSubmit={searchHandler} className="w-full relative group">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search for fresh products..."
              className="w-full bg-slate-100/50 border border-slate-200 text-slate-800 rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all shadow-inner"
              autoFocus
            />
            <svg className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button type="submit" className="hidden">Search</button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
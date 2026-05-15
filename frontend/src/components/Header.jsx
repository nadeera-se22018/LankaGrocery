import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import SearchBox from './SearchBox';

const Header = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.cartItems);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const { userInfo, logout } = useAuthStore();

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider">
          🛒 LankaGrocery
        </Link>

        <div className="w-full md:w-auto">
          <SearchBox />
        </div>

        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link to="/cart" className="hover:text-green-200 transition relative flex items-center">
                Cart
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </li>
            
            {userInfo ? (
              <li className="flex items-center space-x-4">
                <Link to="/profile" className="font-semibold text-green-100 hover:text-white hover:underline transition">
                  Hi, {userInfo.name.split(' ')[0]}
                </Link>

                {userInfo.isAdmin && (
                  <div className="flex space-x-3 border-l border-green-500 pl-4 ml-2">
                    <Link to="/admin/users" className="text-sm font-medium bg-green-700 hover:bg-green-800 px-2 py-1 rounded transition">
                      Users
                    </Link>
                    <Link to="/admin/orders" className="text-sm font-medium bg-green-700 hover:bg-green-800 px-2 py-1 rounded transition">
                      Orders
                    </Link>
                    <Link to="/admin/products" className="text-sm font-medium bg-green-700 hover:bg-green-800 px-2 py-1 rounded transition">
                      Products
                    </Link>
                  </div>
                )}

                <button 
                  onClick={logoutHandler}
                  className="bg-green-700 hover:bg-green-800 px-3 py-1 rounded transition text-sm font-bold"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" className="hover:text-green-200 transition font-bold">Login</Link>
              </li>
            )}

          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
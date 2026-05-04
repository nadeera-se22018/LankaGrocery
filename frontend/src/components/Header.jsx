import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';

const Header = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider">
          🛒 LankaGrocery
        </Link>
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
            <li>
              <Link to="/login" className="hover:text-green-200 transition">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
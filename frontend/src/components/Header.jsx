import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider">
          🛒 LankaGrocery
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/cart" className="hover:text-green-200 transition">Cart</Link>
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
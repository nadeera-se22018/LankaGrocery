import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';

const CartPage = () => {
  const navigate = useNavigate();
  
  const cartItems = useCartStore((state) => state.cartItems) || [];
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart 🛒</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="md:col-span-3">
          {cartItems?.length === 0 ? (
            <div className="bg-blue-50 text-blue-700 p-4 rounded-lg flex items-center justify-between">
              <span>Your cart is empty!</span>
              <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Go Back to Shop
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems?.map((item) => (
                <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-4 w-2/5">
                    <img src={item?.image} alt={item?.name} className="w-16 h-16 object-cover rounded" />
                    <Link to={`/product/${item._id}`} className="text-lg font-semibold text-gray-800 hover:text-green-600 truncate">
                      {item?.name}
                    </Link>
                  </div>
                  
                  <div className="w-1/5 text-lg font-bold text-green-700">
                    Rs. {Number(item?.price || 0).toFixed(2)}
                  </div>

                  <div className="w-1/5">
                    <select 
                      value={item?.qty} 
                      onChange={(e) => addToCart({ ...item, qty: Number(e.target.value) })}
                      className="border rounded p-2 focus:outline-green-500 w-full"
                    >
                      {[...Array(Math.max(0, Number(item?.countInStock || 0))).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-1/5 text-right">
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50 transition"
                      title="Remove from Cart"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-1">
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white sticky top-4">
            <h2 className="text-xl font-bold mb-4 border-b pb-4">Order Summary</h2>
            
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Total Items:</span>
              <span className="font-bold">
                {cartItems?.reduce((acc, item) => acc + Number(item?.qty || 0), 0)}
              </span>
            </div>
            
            <div className="flex justify-between mb-6 border-b pb-4">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-bold text-xl text-green-700">
                Rs. {cartItems?.reduce((acc, item) => acc + (Number(item?.qty || 0) * Number(item?.price || 0)), 0).toFixed(2)}
              </span>
            </div>

            <button 
              onClick={checkoutHandler}
              className={`w-full py-3 rounded text-white font-bold transition ${
                cartItems?.length === 0 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 shadow-md'
              }`}
              disabled={cartItems?.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import useCartStore from '../store/cartStore';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  
  const { cartItems, shippingAddress, paymentMethod, clearCartItems, syncCart } = useCartStore();

  useEffect(() => {
    syncCart();
  }, [syncCart]);

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }
  }, [shippingAddress, paymentMethod, navigate]);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = Number(addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)));
  const shippingPrice = addDecimals(itemsPrice > 5000 ? 0 : 350); 
  const taxPrice = addDecimals(0); 
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

  const placeOrderHandler = async () => {
    try {
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      clearCartItems();
      toast.success('Order placed successfully! 🎉');
      navigate(`/order/${data._id}`); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not place the order');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">Shipping Details</h2>
            <p className="text-gray-600">
              <strong className="font-semibold text-gray-800">Address: </strong>
              {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">Payment Method</h2>
            <p className="text-gray-600">
              <strong className="font-semibold text-gray-800">Method: </strong>
              {paymentMethod}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">Order Items</h2>
            {cartItems.length === 0 ? (
              <div className="text-red-500 bg-red-50/50 p-4 rounded">Your cart is empty</div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center space-x-4 w-2/3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <Link to={`/product/${item._id}`} className="text-gray-800 font-medium hover:text-green-600 truncate">
                        {item.name}
                      </Link>
                    </div>
                    <div className="w-1/3 text-right text-gray-600 font-medium">
                      {item.qty} x Rs. {item.price.toFixed(2)} = <span className="text-gray-800 font-bold">Rs. {(item.qty * item.price).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 sticky top-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items:</span>
                <span className="font-medium">Rs. {itemsPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span className="font-medium">Rs. {shippingPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax:</span>
                <span className="font-medium">Rs. {taxPrice}</span>
              </div>
              <div className="flex justify-between text-gray-800 text-xl font-bold pt-4 border-t border-gray-200">
                <span>Total:</span>
                <span className="text-green-700">Rs. {totalPrice}</span>
              </div>
            </div>

            <button
              type="button"
              disabled={cartItems.length === 0}
              onClick={placeOrderHandler}
              className={`w-full py-3 rounded text-white font-bold transition duration-300 shadow-md ${
                cartItems.length === 0 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              Place Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlaceOrderPage;
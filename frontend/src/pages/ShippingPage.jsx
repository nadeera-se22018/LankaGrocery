import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = () => {
  const navigate = useNavigate();
  
  const { shippingAddress, saveShippingAddress } = useCartStore();

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || 'Sri Lanka');

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    navigate('/payment'); 
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <CheckoutSteps step1 step2 />

      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Shipping Address 🚚</h1>
        
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Street Address</label>
            <input 
              type="text" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="123 Main Street"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">City</label>
              <input 
                type="text" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Colombo"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Postal Code</label>
              <input 
                type="text" 
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="00100"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Country</label>
            <input 
              type="text" 
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-gray-50"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 transition duration-300 shadow-md mt-6"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingPage;
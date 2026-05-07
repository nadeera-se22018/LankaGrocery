import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { shippingAddress, paymentMethod, savePaymentMethod } = useCartStore();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const [payment, setPayment] = useState(paymentMethod || 'Cash on Delivery');

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(payment);
    navigate('/placeorder'); 
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <CheckoutSteps step1 step2 step3 />

      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 mt-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Payment Method 💳</h1>
        
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-gray-600 font-medium text-lg mb-2">Select Method</label>
            
            <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={payment === 'Cash on Delivery'}
                onChange={(e) => setPayment(e.target.value)}
                className="w-5 h-5 text-green-600 focus:ring-green-500 cursor-pointer"
              />
              <label htmlFor="cod" className="ml-3 text-gray-800 font-medium text-lg cursor-pointer flex-grow">
                Cash on Delivery (COD)
              </label>
            </div>

            <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
              <input
                type="radio"
                id="card"
                name="paymentMethod"
                value="Credit/Debit Card"
                checked={payment === 'Credit/Debit Card'}
                onChange={(e) => setPayment(e.target.value)}
                className="w-5 h-5 text-green-600 focus:ring-green-500 cursor-pointer"
              />
              <label htmlFor="card" className="ml-3 text-gray-800 font-medium text-lg cursor-pointer flex-grow">
                Credit / Debit Card
              </label>
            </div>

             <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
              <input
                type="radio"
                id="lankaqr"
                name="paymentMethod"
                value="LankaQR"
                checked={payment === 'LankaQR'}
                onChange={(e) => setPayment(e.target.value)}
                className="w-5 h-5 text-green-600 focus:ring-green-500 cursor-pointer"
              />
              <label htmlFor="lankaqr" className="ml-3 text-gray-800 font-medium text-lg cursor-pointer flex-grow">
                LankaQR Payment
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 transition duration-300 shadow-md mt-6"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
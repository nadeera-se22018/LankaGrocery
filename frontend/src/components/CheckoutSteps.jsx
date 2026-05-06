import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex justify-center mb-8 space-x-4 md:space-x-8">
      <div>
        {step1 ? (
          <Link to="/login" className="text-green-600 font-bold border-b-2 border-green-600 pb-1">Sign In</Link>
        ) : (
          <span className="text-gray-400">Sign In</span>
        )}
      </div>
      <div className="text-gray-300">❯</div>
      
      <div>
        {step2 ? (
          <Link to="/shipping" className="text-green-600 font-bold border-b-2 border-green-600 pb-1">Shipping</Link>
        ) : (
          <span className="text-gray-400">Shipping</span>
        )}
      </div>
      <div className="text-gray-300">❯</div>
      
      <div>
        {step3 ? (
          <Link to="/payment" className="text-green-600 font-bold border-b-2 border-green-600 pb-1">Payment</Link>
        ) : (
          <span className="text-gray-400">Payment</span>
        )}
      </div>
      <div className="text-gray-300">❯</div>
      
      <div>
        {step4 ? (
          <Link to="/placeorder" className="text-green-600 font-bold border-b-2 border-green-600 pb-1">Place Order</Link>
        ) : (
          <span className="text-gray-400">Place Order</span>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
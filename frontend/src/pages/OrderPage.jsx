import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { QRCode } from 'react-qr-code'; 
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDeliver, setLoadingDeliver] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false); 

  const { userInfo } = useAuthStore();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const fetchOrder = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/orders/${orderId}`);
      setOrder(data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not load the order');
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  useEffect(() => {
    const loadPayPalScript = async () => {
      try {
        const { data } = await axios.get('/api/config/paypal');
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': data.clientId,
            currency: 'USD', 
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      } catch (error) {
        toast.error('Could not load the PayPal');
      }
    };

    if (order && !order.isPaid && order.paymentMethod === 'Credit/Debit Card') {
      if (!window.paypal) {
        loadPayPalScript();
      }
    }
  }, [order, paypalDispatch]);

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        setLoadingPay(true);
        await axios.put(`/api/orders/${orderId}/pay`, details);
        fetchOrder();
        toast.success('Payment successful! 🎉');
        setLoadingPay(false);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Could not update the payment');
        setLoadingPay(false);
      }
    });
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  const createOrder = (data, actions) => {
    const exchangeRate = 300; 
    const totalInUSD = (order.totalPrice / exchangeRate).toFixed(2);

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalInUSD, 
          },
        },
      ],
    });
  };

  const simulateLankaQRPayment = async () => {
    try {
      setLoadingPay(true);
      const details = {
        id: `LQR-${Date.now()}`,
        status: 'COMPLETED',
        update_time: new Date().toISOString(),
        payer: { email_address: order.user.email },
      };
      
      await axios.put(`/api/orders/${orderId}/pay`, details);
      fetchOrder();
      toast.success('LankaQR Payment Successful! 🇱🇰🎉');
      setLoadingPay(false);
    } catch (error) {
      toast.error('Failed LankaQR payment');
      setLoadingPay(false);
    }
  };

  const deliverOrderHandler = async () => {
    try {
      setLoadingDeliver(true);
      await axios.put(`/api/orders/${orderId}/deliver`);
      toast.success('Order Marked as Delivered! 🚚');
      fetchOrder();
      setLoadingDeliver(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not Update');
      setLoadingDeliver(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-2xl font-bold text-gray-500 animate-pulse">Loading Order Details...</div>;
  }

  if (!order) {
    return <div className="text-center mt-20 text-2xl text-red-500 font-bold">Order Not Found!</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 truncate">
        Order ID: <span className="text-gray-500 font-medium text-xl">{order._id}</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">Shipping Details</h2>
            <p className="text-gray-600 mb-2">
              <strong className="font-semibold text-gray-800">Name: </strong> {order.user.name}
            </p>
            <p className="text-gray-600 mb-4">
              <strong className="font-semibold text-gray-800">Email: </strong> {order.user.email}
            </p>
            <p className="text-gray-600 mb-4">
              <strong className="font-semibold text-gray-800">Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            
            {order.isDelivered ? (
              <div className="bg-green-100/80 text-green-800 p-4 rounded-lg font-medium border border-green-200">
                Delivered on {order.deliveredAt.substring(0, 10)}
              </div>
            ) : (
              <div className="bg-red-100/80 text-red-800 p-4 rounded-lg font-medium border border-red-200">
                Not Delivered Yet
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">Payment Method</h2>
            <p className="text-gray-600 mb-4">
              <strong className="font-semibold text-gray-800">Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <div className="bg-green-100/80 text-green-800 p-4 rounded-lg font-medium border border-green-200">
                Paid on {order.paidAt.substring(0, 10)}
              </div>
            ) : (
              <div className="bg-red-100/80 text-red-800 p-4 rounded-lg font-medium border border-red-200">
                Not Paid Yet
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center space-x-4 w-2/3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <Link to={`/product/${item.product}`} className="text-gray-800 font-medium hover:text-green-600 truncate">
                      {item.name}
                    </Link>
                  </div>
                  <div className="w-1/3 text-right text-gray-600 font-medium">
                    {item.qty} x Rs. {item.price.toFixed(2)} = <span className="text-gray-800 font-bold">Rs. {(item.qty * item.price).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 sticky top-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items:</span>
                <span className="font-medium">Rs. {order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span className="font-medium">Rs. {order.shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax:</span>
                <span className="font-medium">Rs. {order.taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-800 text-xl font-bold pt-4 border-t border-gray-200">
                <span>Total:</span>
                <span className="text-green-700">Rs. {order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            {!order.isPaid && order.paymentMethod === 'Cash on Delivery' && userInfo._id === order.user._id && (
               <div className="bg-yellow-50/80 border border-yellow-200 text-yellow-800 p-4 rounded-lg text-center text-sm font-medium">
                 Please pay Rs. {order.totalPrice.toFixed(2)} to the delivery agent.
               </div>
            )}

            {!order.isPaid && order.paymentMethod === 'Credit/Debit Card' && userInfo._id === order.user._id && (
                <div className="mt-4">
                    <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm mb-3 border border-blue-200">
                      ℹ️ International payments are processed in USD. 
                      <br/>
                      <strong>Equivalent Amount: ${(order.totalPrice / 300).toFixed(2)} USD</strong>
                    </div>
                    {isPending ? (
                        <div className="text-center text-gray-500 font-medium animate-pulse">Loading PayPal...</div>
                    ) : (
                        <div className="z-0 relative">
                          <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} />
                        </div>
                    )}
                </div>
            )}

            {!order.isPaid && order.paymentMethod === 'LankaQR' && userInfo._id === order.user._id && (
               <div className="mt-4 bg-gray-50 border border-gray-200 p-6 rounded-xl text-center shadow-inner">
                 <h3 className="font-bold text-gray-800 mb-2 text-lg">Pay with LankaQR 🇱🇰</h3>
                 <p className="text-xs text-gray-600 mb-4">Scan using ComBank, HNB, BOC or any supported app.</p>
                 
                 <div className="flex justify-center mb-4 bg-white p-3 rounded-xl inline-block mx-auto border border-gray-300 shadow-sm">
                    <QRCode 
                      value={`LANKAQR|MERCHANT:LankaGrocery|ORDER:${order._id}|AMOUNT:${order.totalPrice.toFixed(2)}`} 
                      size={150} 
                      level="H" 
                    />
                 </div>
                 
                 <p className="text-xs text-gray-500 mb-4 italic">
                   Note: This is a simulated demo. In production, a bank webhook approves this.
                 </p>
                 
                 <button
                   onClick={simulateLankaQRPayment}
                   disabled={loadingPay}
                   className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-bold transition shadow-md flex justify-center items-center"
                 >
                    {loadingPay ? 'Processing...' : 'Simulate App Scan (Demo)'}
                 </button>
               </div>
            )}

            {userInfo && userInfo.isAdmin && !order.isDelivered && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <button
                  type="button"
                  className="w-full bg-gray-800 text-white font-bold py-3 rounded hover:bg-gray-900 transition shadow-md"
                  onClick={deliverOrderHandler}
                  disabled={loadingDeliver}
                >
                  {loadingDeliver ? 'Updating Status...' : 'Mark As Delivered'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
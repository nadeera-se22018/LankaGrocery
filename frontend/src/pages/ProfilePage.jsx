import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';

const CountdownTimer = ({ order, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(order.createdAt).getTime() + 30 * 60 * 1000 - Date.now();
      if (difference <= 0) {
        setTimeLeft('00:00');
        onExpire(order._id);
        return false;
      }
      const mins = Math.floor((difference / 1000 / 60) % 60);
      const secs = Math.floor((difference / 1000) % 60);
      setTimeLeft(`${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`);
      return true;
    };

    const active = calculateTime();
    if (!active) return;

    const timer = setInterval(() => {
      const active = calculateTime();
      if (!active) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [order, onExpire]);

  return <span className="font-semibold text-amber-600 animate-pulse">{timeLeft}</span>;
};

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [orders, setOrders] = useState([]);

  const { userInfo, updateProfile } = useAuthStore();
  const { addToCart } = useCartStore();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders/myorders');
      const filtered = data.filter(order => {
        if (!order.isPaid && order.paymentMethod !== 'Cash on Delivery') {
          const difference = new Date(order.createdAt).getTime() + 30 * 60 * 1000 - Date.now();
          return difference > 0;
        }
        return true;
      });
      setOrders(filtered);
    } catch (error) {
      toast.error('Could not load orders');
    }
  };

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
    fetchMyOrders();
  }, [userInfo]);

  const handleExpireOrder = async (orderId) => {
    try {
      const { data } = await axios.put(`/api/orders/${orderId}/expire`);
      if (data.items && data.items.length > 0) {
        data.items.forEach(item => {
          addToCart(item);
        });
        toast.error(`Order ${orderId.substring(0, 10)}... has expired. Items returned to cart.`, {
          duration: 6000
        });
      }
      fetchMyOrders();
    } catch (error) {
      console.log("Error expiring order: " + error.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Did not match both passwords!');
      return;
    }

    try {
      await updateProfile({ name, email, password });
      toast.success('Profile updated successfully! 🛠️');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h2>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-gray-50"
                  readOnly 
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">New Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Confirm Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition shadow-sm mt-4"
              >
                Update
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
          {orders.length === 0 ? (
            <div className="bg-blue-50/80 text-blue-800 p-4 rounded-lg font-medium border border-blue-200">
              You haven't placed any orders yet. 
              <Link to="/" className="ml-2 font-bold hover:underline">Start Shopping!</Link>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Paid</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Time Left</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Delivered</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50/80 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order._id.substring(0, 10)}...</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.createdAt.substring(0, 10)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-700">Rs. {order.totalPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.isPaid ? (
                          <span className="text-green-600 font-bold">Yes</span>
                        ) : (
                           <span className="text-red-500 font-bold text-xl">⨯</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {!order.isPaid && order.paymentMethod !== 'Cash on Delivery' ? (
                          <CountdownTimer order={order} onExpire={handleExpireOrder} />
                        ) : (
                          <span className="text-gray-400 font-normal">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.isDelivered ? (
                          <span className="text-green-600 font-bold">Yes</span>
                        ) : (
                           <span className="text-red-500 font-bold text-xl">⨯</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link to={`/order/${order._id}`} className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-3 py-1 rounded transition">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
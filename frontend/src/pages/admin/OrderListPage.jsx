import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders');
        setOrders(data);
        setLoading(false);
      } catch (error) {
        toast.error('Could not load the orders');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-2xl font-bold text-gray-500 animate-pulse">Loading All Orders...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage All Orders 📦</h1>
      
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Total</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Paid</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Delivered</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50/80 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id.substring(0, 8)}...</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.user && order.user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.createdAt.substring(0, 10)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-700">Rs. {order.totalPrice.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.isPaid ? (
                    <span className="bg-green-100/80 text-green-800 px-2 py-1 rounded text-xs font-bold">Paid</span>
                  ) : (
                    <span className="bg-red-100/80 text-red-800 px-2 py-1 rounded text-xs font-bold">No</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.isDelivered ? (
                    <span className="bg-green-100/80 text-green-800 px-2 py-1 rounded text-xs font-bold">Delivered</span>
                  ) : (
                    <span className="bg-red-100/80 text-red-800 px-2 py-1 rounded text-xs font-bold">No</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/order/${order._id}`} className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded transition font-bold">
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderListPage;
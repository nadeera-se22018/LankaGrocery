import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/users');
      setUsers(data);
      setLoading(false);
    } catch (error) {
      toast.error('Could not load the users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure to delete the user?')) {
      try {
        await axios.delete(`/api/users/${id}`);
        toast.success('User deleted successfully! 🗑️');
        fetchUsers(); 
      } catch (error) {
        toast.error(error.response?.data?.message || 'Could not delete');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-2xl font-bold text-gray-500 animate-pulse">Loading Users...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Users 👥</h1>
      
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Admin</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50/80 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user._id.substring(0, 8)}...</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline">
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.isAdmin ? (
                    <span className="text-green-600 font-bold text-lg">✔</span>
                  ) : (
                    <span className="text-red-500 font-bold text-xl">⨯</span>
                  )}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center space-x-3">
                  <Link
                    to={`/admin/user/${user._id}/edit`}
                    className="bg-blue-100/80 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded transition font-bold"
                  >
                    Edit
                  </Link>

                  {!user.isAdmin && (
                    <button
                      onClick={() => deleteHandler(user._id)}
                      className="bg-red-100/80 text-red-700 hover:bg-red-200 px-3 py-1 rounded transition font-bold shadow-sm"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListPage;
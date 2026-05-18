import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserEditPage = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/api/users/${userId}`);
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        setLoading(false);
      } catch (error) {
        toast.error('Could not get User details');
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoadingUpdate(true);
      await axios.put(`/api/users/${userId}`, { name, email, isAdmin });
      toast.success('User updated successfully! 👤');
      setLoadingUpdate(false);
      navigate('/admin/users'); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update');
      setLoadingUpdate(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-2xl font-bold text-gray-500 animate-pulse">Loading User Data...</div>;
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <Link to="/admin/users" className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded mb-6 hover:bg-gray-300/80 transition font-medium">
        &larr; Go Back
      </Link>

      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Edit User Details</h1>
        
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="isadmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="w-5 h-5 text-green-600 rounded focus:ring-green-500 cursor-pointer"
            />
            <label htmlFor="isadmin" className="ml-3 text-gray-800 font-bold cursor-pointer">
              Is Admin (Give full system access)
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loadingUpdate}
            className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700/90 transition shadow-md mt-6"
          >
            {loadingUpdate ? 'Updating...' : 'Update User'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEditPage;
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCreate, setLoadingCreate] = useState(false);
  
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      toast.error('Could not load the products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        toast.success('Product deleted successfully! 🗑️');
        fetchProducts(); 
      } catch (error) {
        toast.error(error.response?.data?.message || 'Could not delete');
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Create new dummy product?')) {
      try {
        setLoadingCreate(true);
        const { data } = await axios.post('/api/products', {});
        toast.success('Dummy Product created! 🎉');
        setLoadingCreate(false);
        navigate(`/admin/product/${data._id}/edit`);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Could not create');
        setLoadingCreate(false);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-2xl font-bold text-gray-500 animate-pulse">Loading Products...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Products 🥬</h1>
        <button 
          onClick={createProductHandler}
          disabled={loadingCreate}
          className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition shadow-md flex items-center"
        >
          {loadingCreate ? 'Creating...' : '+ Create Product'}
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Brand</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50/80 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product._id.substring(0, 8)}...</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-700">Rs. {product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.brand}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center space-x-3">
                  <Link 
                    to={`/admin/product/${product._id}/edit`} 
                    className="bg-blue-100/80 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded transition font-bold"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => deleteHandler(product._id)}
                    className="bg-red-100/80 text-red-700 hover:bg-red-200 px-3 py-1 rounded transition font-bold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListPage;
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);
        setLoading(false);
      } catch (error) {
        toast.error('Could not get product details');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoadingUpdate(true);
      await axios.put(`/api/products/${productId}`, {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      });
      toast.success('Product updated successfully! ✅');
      setLoadingUpdate(false);
      navigate('/admin/products'); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update');
      setLoadingUpdate(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-2xl font-bold text-gray-500 animate-pulse">Loading Product Data...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Link to="/admin/products" className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded mb-6 hover:bg-gray-300/80 transition font-medium">
        &larr; Go Back
      </Link>

      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Edit Product ✏️</h1>
        
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-600 font-medium mb-1">Price (Rs)</label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Stock Count</label>
              <input 
                type="number" 
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Image URL (Unsplash Link)</label>
            <input 
              type="text" 
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="https://images.unsplash.com/..."
              required
            />
            {image && (
                <div className="mt-2">
                    <img src={image} alt="Preview" className="h-32 rounded object-cover shadow-sm" onError={(e) => e.target.style.display='none'} />
                </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-600 font-medium mb-1">Brand</label>
              <input 
                type="text" 
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Category</label>
              <input 
                type="text" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loadingUpdate}
            className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700/90 transition shadow-md mt-4"
          >
            {loadingUpdate ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductEditPage;
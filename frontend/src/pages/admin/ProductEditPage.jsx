import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getImageUrl } from '../../utils/imageUtil';

const BACKEND_STATIC_ASSETS_URL = 'http://localhost:5000';

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
  const [loadingUpload, setLoadingUpload] = useState(false);

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

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoadingUpload(true);
      const { data } = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(data.message);

      // If backend successfully uploaded it, save the returned relative path
      setImage(data.image);
      setLoadingUpload(false);
    } catch (error) {
      console.warn('Backend upload failed, falling back to client-side Base64 reader with canvas compression:', error);

      // Fallback: Read, resize, and compress the file locally to keep Base64 payload minimal (<100KB)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1920;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Use 0.88 quality and 1920px dimensions for high-resolution banner layouts without artifacts
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.88);
          setImage(compressedBase64);
          toast.success('High-quality image loaded successfully as Base64 fallback (Offline/Production Mode) ✅');
          setLoadingUpload(false);
        };
        img.onerror = () => {
          toast.error('Could not process the image locally');
          setLoadingUpload(false);
        };
      };
      reader.onerror = () => {
        toast.error('Could not read the image file');
        setLoadingUpload(false);
      };
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

          <div className="bg-gray-50/50 p-4 rounded-lg border border-gray-200">
            <label className="block text-gray-800 font-bold mb-2">Product Image</label>

            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 mb-3"
              placeholder="Enter Image URL or Upload below"
            />

            <input
              type="file"
              id="image-file"
              onChange={uploadFileHandler}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition cursor-pointer"
              accept="image/png, image/jpeg, image/webp"
            />
            {loadingUpload && <p className="text-sm text-green-600 mt-2 animate-pulse font-medium">Uploading image...</p>}

            {image && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                <img
                  src={getImageUrl(image)}
                  alt="Preview"
                  className="h-32 w-auto rounded-lg object-cover shadow-sm border border-gray-200"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150?text=No+Preview';
                  }}
                />
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
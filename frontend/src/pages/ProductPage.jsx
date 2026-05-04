import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  const { id: productId } = useParams();
  
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
      } catch (error) {
        console.error("Could not load the Product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div>
      <Link to="/" className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded mb-6 hover:bg-gray-300 transition">
        &larr; Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-1">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover rounded-lg shadow-md"
            onError={(e) => e.target.src = 'https://via.placeholder.com/400?text=Lanka+Grocery'}
          />
        </div>

        <div className="md:col-span-1 flex flex-col space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <hr className="border-gray-300" />
          <p className="text-xl text-green-700 font-semibold">Rs. {product.price?.toFixed(2)}</p>
          <hr className="border-gray-300" />
          <p className="text-gray-600">{product.description}</p>
          <p className="text-sm text-gray-500">Brand: {product.brand} | Category: {product.category}</p>
        </div>

        <div className="md:col-span-1">
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white">
            <div className="flex justify-between mb-4 pb-4 border-b">
              <span className="text-gray-600">Price:</span>
              <span className="font-bold text-lg">Rs. {product.price?.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between mb-6 pb-4 border-b">
              <span className="text-gray-600">Status:</span>
              <span className={product.countInStock > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <button 
              className={`w-full py-3 rounded text-white font-bold transition ${
                product.countInStock === 0 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
              disabled={product.countInStock === 0}
            >
              Add To Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductPage;
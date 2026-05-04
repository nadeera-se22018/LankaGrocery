import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useCartStore from '../store/cartStore'; 

const ProductPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate(); 
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1); 

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
      } catch (error) {
        console.error("Product eka load karanna bari una:", error);
      }
    };
    fetchProduct();
  }, [productId]);

const addToCartHandler = () => {
    addToCart({ ...product, qty });
    navigate('/cart'); 
  };

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
        </div>

        <div className="md:col-span-1">
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white">
            <div className="flex justify-between mb-4 pb-4 border-b">
              <span className="text-gray-600">Price:</span>
              <span className="font-bold text-lg">Rs. {product.price?.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between mb-4 pb-4 border-b">
              <span className="text-gray-600">Status:</span>
              <span className={product.countInStock > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex justify-between mb-6 pb-4 border-b items-center">
                <span className="text-gray-600">Qty:</span>
                <select 
                  value={qty} 
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="border rounded p-2 focus:outline-green-500"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button 
              onClick={addToCartHandler}
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
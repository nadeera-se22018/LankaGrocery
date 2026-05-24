import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import Rating from '../components/Rating'; 
import Meta from '../components/Meta';
import { getImageUrl } from '../utils/imageUtil';

const ProductPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({ reviews: [] }); 
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loadingReview, setLoadingReview] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const { userInfo } = useAuthStore(); 

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    } catch (error) {
      console.error("Could not load the product", error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchProduct();
    }, [productId]);

  const addToCartHandler = () => {
    addToCart({ ...product, qty });
    navigate('/cart');
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      setLoadingReview(true);
      await axios.post(`/api/products/${productId}/reviews`, { rating, comment });
      toast.success('Review submitted successfully! ⭐');
      setRating(0);
      setComment('');
      fetchProduct(); 
      setLoadingReview(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not review');
      setLoadingReview(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Link to="/" className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded mb-6 hover:bg-gray-300/80 transition font-medium">
        &larr; Back to Shop
      </Link>

      {product.name && (
        <Meta title={`${product.name} | LankaGrocery`} description={product.description} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        
        <div className="md:col-span-1">
          <img 
            src={getImageUrl(product.image)} 
            alt={product.name} 
            className="w-full h-auto object-cover rounded-lg shadow-md"
            onError={(e) => e.target.src = 'https://via.placeholder.com/400?text=Lanka+Grocery'}
          />
        </div>

        <div className="md:col-span-1 flex flex-col space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          
          {product.rating !== undefined && (
             <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          )}

          {product.brand && (
            <div className="text-sm font-medium text-gray-500">
              Brand: 
              <Link 
                to={`/brand/${product.brand}`} 
                className="text-green-600 font-bold ml-2 hover:underline transition-all"
                title={`View all products from ${product.brand}`}
              >
                {product.brand}
              </Link>
            </div>
          )}

          <hr className="border-gray-200" />
          <p className="text-2xl text-green-700 font-bold">Rs. {product.price?.toFixed(2)}</p>
          <hr className="border-gray-200" />
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        <div className="md:col-span-1">
          <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
            <div className="flex justify-between mb-4 pb-4 border-b">
              <span className="text-gray-600 font-medium">Price:</span>
              <span className="font-bold text-lg">Rs. {product.price?.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between mb-4 pb-4 border-b">
              <span className="text-gray-600 font-medium">Status:</span>
              <span className={product.countInStock > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex justify-between mb-6 pb-4 border-b items-center">
                <span className="text-gray-600 font-medium">Qty:</span>
                <select 
                  value={qty} 
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="border border-gray-300 rounded p-2 focus:outline-green-500 bg-gray-50"
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
              className={`w-full py-3 rounded text-white font-bold transition shadow-md ${
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

      <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Customer Reviews 💬</h2>
        
        {product.reviews && product.reviews.length === 0 && (
          <div className="bg-blue-50/80 text-blue-800 p-4 rounded-lg font-medium border border-blue-200 mb-6">
            No one reviewed this product yet. You be the first!
          </div>
        )}

        <div className="space-y-6 mb-8">
          {product.reviews && product.reviews.map((review) => (
            <div key={review._id} className="border-b border-gray-100 pb-4">
              <div className="flex justify-between items-center mb-2">
                <strong className="text-gray-800 font-semibold">{review.name}</strong>
                <span className="text-sm text-gray-500">{review.createdAt.substring(0, 10)}</span>
              </div>
              <Rating value={review.rating} />
              <p className="mt-2 text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Write a Customer Review</h3>
          {userInfo ? (
            <form onSubmit={submitReviewHandler} className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-gray-600 font-medium mb-1">Rating</label>
                <select 
                  value={rating} 
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-green-500 bg-gray-50"
                  required
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor 😞</option>
                  <option value="2">2 - Fair 😐</option>
                  <option value="3">3 - Good 🙂</option>
                  <option value="4">4 - Very Good 😄</option>
                  <option value="5">5 - Excellent 😍</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Comment</label>
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="3"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-green-500"
                  required
                ></textarea>
              </div>
              <button 
                disabled={loadingReview}
                type="submit" 
                className="bg-green-600 text-white font-bold py-2 px-6 rounded hover:bg-green-700 transition shadow-sm"
              >
                {loadingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          ) : (
            <div className="bg-yellow-50/80 text-yellow-800 p-4 rounded-lg font-medium border border-yellow-200">
              Please <Link to="/login" className="font-bold underline hover:text-yellow-900">Sign in</Link> to write a review.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
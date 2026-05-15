import { Link } from 'react-router-dom';
import Rating from './Rating'; 

const Product = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <Link to={`/product/${product._id}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
          onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=Lanka+Grocery'}
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600 line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="mb-4">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-green-700">Rs. {product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product/${product._id}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
          onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=Lanka+Grocery'}
        />
      </Link>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600 truncate">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-green-700">Rs. {product.price.toFixed(2)}</span>
          <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
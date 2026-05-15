import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import axios from 'axios';
import Product from '../components/Product';

const HomePage = () => {
  const { keyword } = useParams();
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = keyword ? `/api/products?keyword=${keyword}` : '/api/products';
        const { data } = await axios.get(url);
        setProducts(data);
      } catch (error) {
        console.error("Show error when try to get data", error);
      }
    };

    fetchProducts();
  }, [keyword]); 

  return (
    <div>
      {keyword && (
        <Link to="/" className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded mb-6 hover:bg-gray-300/80 transition font-medium">
          &larr; Go Back
        </Link>
      )}

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {keyword ? `Search Results for "${keyword}" 🔍` : 'Latest Fresh Products 🥬'}
      </h1>
      
      {products.length === 0 ? (
        <div className="bg-blue-50/80 text-blue-800 p-4 rounded-lg font-medium border border-blue-200">
          No products found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import Product from '../components/Product';
import Paginate from '../components/Paginate'; 
import ProductCarousel from '../components/ProductCarousel';

const HomePage = () => {
  const { keyword, pageNumber = 1 } = useParams();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products', {
          params: { keyword, pageNumber }
        });
        
        setProducts(data.products);
        setPage(data.page);
        setPages(data.pages);
        
        setLoading(false);
      } catch (error) {
        console.error("Get data error:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword, pageNumber]); 

  if (loading) return <div className="text-center mt-20 text-xl font-bold text-gray-500 animate-pulse">Loading Products...</div>;

  return (
    <div>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded mb-6 hover:bg-gray-300/80 transition font-medium">
          &larr; Go Back
        </Link>
      )}

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {keyword ? `Search Results for "${keyword}"` : 'Latest Fresh Products 🥬'}
      </h1>
      
      {products.length === 0 ? (
        <div className="bg-yellow-50/80 text-yellow-800 p-4 rounded border border-yellow-200">
          Could not find any product.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>

          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </div>
  );
};

export default HomePage;
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomePage = () => {
  const { keyword, pageNumber = 1, category } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/products/categories');
        setCategories(data);
      } catch (error) {
        console.error("Could not load the categories", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products', {
          params: { keyword, pageNumber, category }
        });
        setProducts(data.products);
        setPage(data.page);
        setPages(data.pages);
        setLoading(false);
      } catch (error) {
        console.error("Data error:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword, pageNumber, category]); 

  const categoryHandler = (catName) => {
    if (category === catName) {
      navigate('/'); 
    } else {
      navigate(`/category/${catName}`);
    }
  };

  if (loading && products.length === 0) return <div className="text-center mt-20 text-xl font-bold text-gray-500 animate-pulse">Loading Products...</div>;

  return (
    <div>
      {keyword ? <Meta title={`Search Results for ${keyword}`} /> : <Meta />}

     {!keyword && !category ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded mb-6 hover:bg-gray-300/80 transition font-medium">
          &larr; Go Back
        </Link>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Shop by Category 🏷️</h2>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => navigate('/')}
            className={`px-4 py-2 rounded-full font-medium transition shadow-sm border ${
              !category && !keyword 
                ? 'bg-green-600 text-white border-green-600' 
                : 'bg-white text-gray-700 border-gray-200 hover:bg-green-50/80'
            }`}
          >
            All Products
          </button>
          
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => categoryHandler(cat)}
              className={`px-4 py-2 rounded-full font-medium transition shadow-sm border ${
                category === cat 
                  ? 'bg-green-600 text-white border-green-600' 
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-green-50/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
        {keyword ? `Search Results for "${keyword}"` : category ? `${category} Products` : 'Latest Fresh Products 🥬'}
      </h1>
      
      {products.length === 0 ? (
        <div className="bg-yellow-50/80 text-yellow-800 p-4 rounded-xl border border-yellow-200 font-medium">
          There is no product match to this category
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} category={category ? category : ''} />
        </>
      )}
    </div>
  );
};

export default HomePage;
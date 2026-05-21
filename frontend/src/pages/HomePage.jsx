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
        console.error("Could not load the categories:", error);
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

  const getCategoryImage = (catName) => {
    const name = catName.toLowerCase();
    
    if (name === 'vegetables') return '/images/categories/vegetables.webp';
    if (name === 'fruits') return '/images/categories/fruits.webp';
    if (name === 'dairy') return '/images/categories/dairy.webp';
    if (name === 'drinks') return '/images/categories/drinks.webp';
    if (name === 'household items') return '/images/categories/household.webp';
    if (name === 'snacks') return '/images/categories/snacks.webp';
    if (name === 'meat & seafood') return '/images/categories/meat.webp';
    
    return '/images/categories/default.webp'; 
  };

  if (loading && products.length === 0) return <div className="text-center mt-20 text-xl font-bold text-slate-500 animate-pulse">Loading Products...</div>;

  return (
    <div>
      {keyword ? <Meta title={`Search Results for ${keyword}`} /> : <Meta />}

      {!keyword && !category ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="inline-block bg-white border border-slate-200 text-slate-700 px-5 py-2 rounded-full mb-8 hover:bg-slate-50 transition font-bold premium-shadow">
          &larr; Back to Home
        </Link>
      )}

      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Explore Categories</h2>
        </div>
        
        <div className="flex overflow-x-auto pb-4 gap-5 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          <button 
            onClick={() => navigate('/')}
            className={`snap-start flex-shrink-0 group flex flex-col items-center justify-center min-w-[120px] h-[130px] rounded-3xl transition-all duration-300 border-2 ${
              !category && !keyword 
                ? 'bg-green-50 border-green-500 premium-shadow scale-105' 
                : 'bg-white border-transparent hover:border-green-200 hover:-translate-y-1 shadow-sm'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl mb-2.5 overflow-hidden border border-slate-100 group-hover:scale-110 transition-transform duration-300 shadow-inner bg-slate-50 flex items-center justify-center">
              <svg className={`w-8 h-8 transition-colors duration-300 ${!category && !keyword ? 'text-green-600' : 'text-slate-400 group-hover:text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <span className={`text-xs font-extrabold tracking-tight ${!category && !keyword ? 'text-green-700' : 'text-slate-700'}`}>All Items</span>
          </button>
          
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => categoryHandler(cat)}
              className={`snap-start flex-shrink-0 group flex flex-col items-center justify-center min-w-[120px] h-[130px] rounded-3xl transition-all duration-300 border-2 ${
                category === cat 
                  ? 'bg-green-50 border-green-500 premium-shadow scale-105' 
                  : 'bg-white border-transparent hover:border-green-200 hover:-translate-y-1 shadow-sm'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl mb-2.5 overflow-hidden border border-slate-100 group-hover:scale-110 transition-transform duration-300 shadow-inner bg-white flex items-center justify-center">
                <img 
                  src={getCategoryImage(cat)} 
                  alt={cat} 
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = `https://via.placeholder.com/100?text=${cat}`}
                />
              </div>
              <span className={`text-xs font-extrabold truncate w-full px-2 text-center tracking-tight ${category === cat ? 'text-green-700' : 'text-slate-700'}`}>
                {cat}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
          {keyword ? `Search Results for "${keyword}"` : category ? `${category} Products` : 'Trending Now 🔥'}
        </h1>
      </div>
      
      {products.length === 0 ? (
        <div className="bg-yellow-50 text-yellow-800 p-6 rounded-2xl border border-yellow-200 font-bold text-center">
          No products found in this category.
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
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const { data } = await axios.get('/api/products/top');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        toast.error('Could not load the products');
        setLoading(false);
      }
    };
    fetchTopProducts();
  }, []);

  if (loading) return <div className="text-center my-12 animate-pulse text-slate-500 font-bold text-lg">Loading Amazing Deals...</div>;

  return (
    <div className="mb-12 rounded-3xl overflow-hidden premium-shadow border border-slate-100 relative group z-0">
      <Carousel 
        showThumbs={false} 
        autoPlay 
        infiniteLoop 
        showStatus={false}
        showArrows={true}
        interval={5000}     
        transitionTime={700}  
        className="rounded-3xl overflow-hidden"
      >
        {products.map((product) => (
          
          <div key={product._id} className="relative h-72 sm:h-96 md:h-[450px] w-full bg-slate-100">
            
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover object-center"
              onError={(e) => e.target.src = 'https://via.placeholder.com/1200x500?text=Lanka+Grocery'}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent flex flex-col justify-end text-left p-8 md:p-16">
              
              <div className="mb-4">
                <span className="bg-green-500/20 text-green-400 border border-green-500/50 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest inline-block shadow-lg">
                  Top Rated 🌟
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight drop-shadow-2xl leading-tight w-full md:w-2/3">
                {product.name}
              </h2>
              <p className="text-xl md:text-2xl text-green-400 font-bold mb-8 drop-shadow-md">
                Rs. {product.price.toFixed(2)}
              </p>
              
              <div>
                <Link 
                  to={`/product/${product._id}`}
                  className="inline-flex items-center justify-center bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 premium-shadow group/btn"
                >
                  <span>Shop Now</span>
                  <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
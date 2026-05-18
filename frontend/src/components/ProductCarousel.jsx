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
        toast.error('Could not load top products ');
        setLoading(false);
      }
    };
    fetchTopProducts();
  }, []);

  if (loading) return <div className="text-center my-4 animate-pulse">Loading Top Products...</div>;

  return (
    <div className="mb-10 rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <Carousel 
        showThumbs={false} 
        autoPlay 
        infiniteLoop 
        showStatus={false}
        className="bg-green-700"
      >
        {products.map((product) => (
          <div key={product._id} className="relative h-64 sm:h-80 md:h-96">
            <Link to={`/product/${product._id}`}>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover object-center opacity-80 hover:opacity-100 transition duration-500"
                onError={(e) => e.target.src = 'https://via.placeholder.com/1200x400?text=Lanka+Grocery'}
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white py-4 px-6 text-left hover:bg-black/70 transition">
                <h2 className="text-2xl font-bold truncate">{product.name}</h2>
                <p className="text-xl text-green-300 font-semibold mt-1">Rs. {product.price.toFixed(2)}</p>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
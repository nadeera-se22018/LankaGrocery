import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState(''); 

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      toast.error('Please enter a valid email address!');
      return;
    }
    
    toast.success('🎉 Subscribed successfully!');
    setEmail(''); 
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-850 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" onClick={handleScrollToTop} className="flex items-center space-x-2">
            <span className="text-3xl">🛒</span>
            <span className="text-2xl font-black text-white tracking-tight">
              Lanka<span className="text-green-500">Grocery</span>
            </span>
          </Link>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            Sri Lanka's premium online grocery store. We deliver 100% fresh, organic vegetables, fruits, and daily essentials straight to your doorstep.
          </p>
          <div className="flex space-x-4 pt-2 justify-center md:justify-start w-full">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-green-600 hover:text-white rounded-xl flex items-center justify-center transition-colors shadow-md">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.9 0-4 1.55-4 3.5V8z"/></svg>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-green-600 hover:text-white rounded-xl flex items-center justify-center transition-colors shadow-md">
              <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01"/></svg>
            </a>
            <a href="https://wa.me/94700000000" target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-green-600 hover:text-white rounded-xl flex items-center justify-center transition-colors shadow-md">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.454L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.067.953 11.5.953c-5.437 0-9.865 4.371-9.87 9.8a9.66 9.66 0 001.492 5.108l-1.022 3.728 3.824-.993z"/></svg>
            </a>
          </div>
        </div>

        <div className="space-y-4 text-center md:text-left">
          <h4 className="text-white font-bold text-lg tracking-tight border-b border-slate-800 pb-2 inline-block md:block">Quick Links</h4>
          <ul className="space-y-2.5 text-sm font-medium flex flex-col items-center md:items-start">
            <li><Link to="/" onClick={handleScrollToTop} className="hover:text-green-400 transition-colors flex items-center">&rarr; <span className="ml-2">Home Shop</span></Link></li>
            <li><Link to="/cart" onClick={handleScrollToTop} className="hover:text-green-400 transition-colors flex items-center">&rarr; <span className="ml-2">My Cart</span></Link></li>
            <li><Link to="/profile" onClick={handleScrollToTop} className="hover:text-green-400 transition-colors flex items-center">&rarr; <span className="ml-2">User Profile</span></Link></li>
          </ul>
        </div>

        <div className="space-y-4 text-center md:text-left">
          <h4 className="text-white font-bold text-lg tracking-tight border-b border-slate-800 pb-2 inline-block md:block">Popular Categories</h4>
          <ul className="space-y-2.5 text-sm font-medium flex flex-col items-center md:items-start">
            <li><Link to="/category/Vegetables" onClick={handleScrollToTop} className="hover:text-green-400 transition-colors flex items-center">🥬 <span className="ml-2">Fresh Vegetables</span></Link></li>
            <li><Link to="/category/Fruits" onClick={handleScrollToTop} className="hover:text-green-400 transition-colors flex items-center">🍎 <span className="ml-2">Fresh Fruits</span></Link></li>
            <li><Link to="/category/Snacks" onClick={handleScrollToTop} className="hover:text-green-400 transition-colors flex items-center">🍪 <span className="ml-2">Snacks</span></Link></li>
          </ul>
        </div>

        <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
          <h4 className="text-white font-bold text-lg tracking-tight border-b border-slate-800 pb-2 inline-block md:block w-full text-center md:text-left">Newsletter</h4>
          <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs">
            Subscribe to our weekly newsletter to get special discounts and updates on new farm arrivals!
          </p>
          <form onSubmit={submitHandler} className="flex flex-col space-y-2 w-full max-w-xs">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Address" 
              className="bg-slate-800 text-white border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 font-medium text-center md:text-left"
            />
            <button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-colors shadow-md"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-medium space-y-4 sm:space-y-0 text-center sm:text-left">
        <p>&copy; {currentYear} LankaGrocery. All rights reserved.</p>
        <div className="flex space-x-6 justify-center">
          <Link to="/" onClick={handleScrollToTop} className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
          <Link to="/" onClick={handleScrollToTop} className="hover:text-slate-400 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
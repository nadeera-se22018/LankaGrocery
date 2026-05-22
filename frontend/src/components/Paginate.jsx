import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '', category = '', brand = '' }) => {
  if (pages <= 1) return null;

  const getUrl = (pageNum) => {
    if (isAdmin) return `/admin/products/${pageNum}`;
    if (keyword) return `/search/${keyword}/page/${pageNum}`;
    if (category) return `/category/${category}/page/${pageNum}`;
    if (brand) return `/brand/${brand}/page/${pageNum}`;
    return `/page/${pageNum}`;
  };

  return (
    <div className="flex justify-center items-center space-x-3 sm:space-x-6 mt-12 mb-6">
      
      <Link
        to={getUrl(page - 1)}
        className={`flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold text-sm transition-all duration-300 premium-shadow ${
          page === 1
            ? 'bg-slate-100 text-slate-400 pointer-events-none shadow-none' 
            : 'bg-white text-slate-700 hover:bg-green-500 hover:text-white hover:-translate-y-1'
        }`}
      >
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Prev
      </Link>

      <div className="bg-slate-100 text-slate-600 px-5 py-2.5 rounded-full text-sm font-medium border border-slate-200">
        Page <span className="font-black text-slate-900 mx-1">{page}</span> of {pages}
      </div>

      <Link
        to={getUrl(page + 1)}
        className={`flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold text-sm transition-all duration-300 premium-shadow ${
          page === pages
            ? 'bg-slate-100 text-slate-400 pointer-events-none shadow-none' 
            : 'bg-white text-slate-700 hover:bg-green-500 hover:text-white hover:-translate-y-1'
        }`}
      >
        Next
        <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
      
    </div>
  );
};

export default Paginate;
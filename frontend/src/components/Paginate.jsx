import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, keyword = '' }) => {
  if (pages <= 1) return null;

  return (
    <div className="flex justify-center mt-10 space-x-2">
      {[...Array(pages).keys()].map((x) => (
        <Link
          key={x + 1}
          to={keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`}
          className={`px-4 py-2 border rounded-md transition font-bold shadow-sm ${
            x + 1 === page
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-white text-green-600 border-gray-200 hover:bg-green-50/80'
          }`}
        >
          {x + 1}
        </Link>
      ))}
    </div>
  );
};

export default Paginate;
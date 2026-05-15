import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex items-center mx-4">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search groceries..."
        className="w-full sm:w-64 px-4 py-1.5 rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 border-none"
      />
      <button 
        type="submit" 
        className="bg-green-800 text-white px-4 py-1.5 rounded-r-md hover:bg-green-900 transition font-medium"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
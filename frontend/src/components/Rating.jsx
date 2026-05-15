const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center space-x-1">
      <div className="flex text-yellow-400 text-lg">
        {[1, 2, 3, 4, 5].map((index) => (
          <span key={index}>
            {value >= index ? (
              <i className="fas fa-star">★</i> 
            ) : value >= index - 0.5 ? (
              <i className="fas fa-star-half-alt">⯨</i> 
            ) : (
              <i className="far fa-star text-gray-300">★</i> 
            )}
          </span>
        ))}
      </div>
      {text && <span className="text-sm text-gray-600 font-medium ml-2">{text}</span>}
    </div>
  );
};

export default Rating;
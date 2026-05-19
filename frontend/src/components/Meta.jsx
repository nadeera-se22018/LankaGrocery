import { Helmet } from 'react-helmet-async';

const Meta = ({ 
  title = 'Welcome to LankaGrocery | Best Fresh Food', 
  description = 'We sell the best and fresh products in Sri Lanka at affordable prices', 
  keywords = 'groceries, fresh food, sri lanka, buy online, organic' 
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default Meta;
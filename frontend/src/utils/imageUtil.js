/**
 * Sanitizes and resolves product image URLs.
 * Handles absolute localhost URLs from database, relative upload paths,
 * and external unsplash image URLs, pointing them to the correct backend host.
 * 
 * @param {string} imagePath - The raw image path from the database
 * @returns {string} The fully resolved image URL
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return 'https://via.placeholder.com/300?text=Lanka+Grocery';
  }

  // If it's a base64 data URL, return it directly
  if (imagePath.startsWith('data:')) {
    return imagePath;
  }

  // If it's an external HTTP/HTTPS URL (e.g., Unsplash) but not localhost:5000
  if (imagePath.startsWith('http') && !imagePath.includes('localhost:5000')) {
    return imagePath;
  }

  // If it's a localhost URL, extract the relative part
  let relativePath = imagePath;
  if (imagePath.includes('localhost:5000')) {
    relativePath = imagePath.split('localhost:5000')[1] || '';
  }

  // Use defined VITE_API_URL or fallback to the live production backend
  const backendUrl = import.meta.env.VITE_API_URL || 'https://lanka-grocery-backend.vercel.app';

  // Ensure relative path starts with a single slash
  const cleanPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;

  return `${backendUrl}${cleanPath}`;
};

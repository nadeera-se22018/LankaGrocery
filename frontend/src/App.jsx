import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import axios from 'axios';
import useAuthStore from './store/authStore';
import useCartStore from './store/cartStore';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import ProfilePage from './pages/ProfilePage';
import AdminRoute from './components/AdminRoute';
import OrderListPage from './pages/admin/OrderListPage';
import ProductListPage from './pages/admin/ProductListPage';
import ProductEditPage from './pages/admin/ProductEditPage';
import UserListPage from './pages/admin/UserListPage';
import UserEditPage from './pages/admin/UserEditPage';
import Chatbot from './components/Chatbot';
import WishlistPage from './pages/WishlistPage';
import BottomNav from './components/BottomNav';
import toast from 'react-hot-toast';

const App = () => {
  const { userInfo } = useAuthStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const syncCart = useCartStore((state) => state.syncCart);

  useEffect(() => {
    syncCart();
  }, [syncCart]);

  useEffect(() => {
    if (userInfo) {
      const checkExpiredOrders = async () => {
        try {
          const { data: orders } = await axios.get('/api/orders/myorders');
          const now = new Date();
          const thirtyMinutes = 30 * 60 * 1000;

          for (const order of orders) {
            if (!order.isPaid && order.paymentMethod !== 'Cash on Delivery') {
              const createdAtTime = new Date(order.createdAt).getTime();
              const timeDiff = now.getTime() - createdAtTime;

              if (timeDiff >= thirtyMinutes) {
                try {
                  const { data } = await axios.put(`/api/orders/${order._id}/expire`);
                  if (data.items && data.items.length > 0) {
                    data.items.forEach((item) => {
                      addToCart(item);
                    });
                    toast.error(`Order ${order._id.substring(0, 10)}... has expired. Items returned to cart with updated prices.`, {
                      duration: 6000
                    });
                  }
                } catch (err) {
                  console.log("Failed to expire order via global check: " + err.message);
                }
              }
            }
          }
        } catch (error) {
          console.log("Error checking expired orders globally: " + error.message);
        }
      };

      checkExpiredOrders();
      const interval = setInterval(checkExpiredOrders, 60000);
      return () => clearInterval(interval);
    }
  }, [userInfo, addToCart]);

  return (
    <Router>
      <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            borderRadius: '100px',
            background: '#ffffff',
            color: '#1e293b',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)', 
            fontWeight: '600',
            fontSize: '14px',
            padding: '12px 24px',
          },
          success: {
            style: { background: '#ecfdf5', color: '#047857', border: '1px solid #10b981' },
            iconTheme: { primary: '#10b981', secondary: '#fff' },
          },
          error: {
            style: { background: '#fef2f2', color: '#b91c1c', border: '1px solid #ef4444' },
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-6 pb-20 md:pb-6 animate-fade-in">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/page/:pageNumber" element={<HomePage />} />
            <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} />
            <Route path="/search/:keyword" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/category/:category" element={<HomePage />} />
            <Route path="/category/:category/page/:pageNumber" element={<HomePage />} />
            <Route path="/brand/:brand" element={<HomePage />} />
            <Route path="/brand/:brand/page/:pageNumber" element={<HomePage />} />

            <Route path="" element={<PrivateRoute />}>
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/order/:id" element={<OrderPage/>} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            <Route path="" element={<AdminRoute />}>
              <Route path="/admin/orders" element={<OrderListPage />} />
              <Route path="/admin/products" element={<ProductListPage />} />
              <Route path="/admin/products/:pageNumber" element={<ProductListPage />} />
              <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
              <Route path="/admin/users" element={<UserListPage />} />
              <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
            </Route>
            
          </Routes>
        </main>
        <Footer />
        <BottomNav />
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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

const App = () => {
  return (
    <Router>

      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/page/:pageNumber" element={<HomePage />} />
            <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} />
            <Route path="/search/:keyword" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/category/:category" element={<HomePage />} />
            <Route path="/category/:category/page/:pageNumber" element={<HomePage />} />

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
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;
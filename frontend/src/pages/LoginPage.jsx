import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';
import useAuthStore from '../store/authStore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo, login, setCredentials } = useAuthStore();

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login(email, password);

      toast.success('Successfully logged in! 🎉');

      navigate(redirect);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
  try {

    console.log(credentialResponse);

    const { data } = await axios.post(
      '/api/users/google',
      {
        credential: credentialResponse.credential,
      },
      {
        withCredentials: true,
      }
    );

    console.log(data);

    setCredentials(data);

    toast.success('Google Login Successful! 🎉');

    navigate(redirect);

  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.message || 'Google Auth failed'
    );
  }
};

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
          }}
        >
          <div className="bg-black/60 h-full flex items-center justify-center">
            <h2 className="text-white text-4xl font-bold text-center px-4">
              Welcome back to <br /> LankaGrocery
            </h2>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Sign In
          </h2>

          <form onSubmit={submitHandler} className="space-y-6">

            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 transition duration-300 shadow-md disabled:bg-gray-400"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>

            <span className="flex-shrink mx-4 text-gray-400 text-sm">
              OR
            </span>

            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() =>
                toast.error('Google Login Popup Closed or Failed')
              }
              theme="outline"
              size="large"
              shape="pill"
              text="continue_with"
              width="300"
            />
          </div>

          <p className="mt-6 text-gray-600 text-center">
            New Customer?{' '}
            <Link
              to={
                redirect
                  ? `/register?redirect=${redirect}`
                  : '/register'
              }
              className="text-green-600 font-bold hover:underline"
            >
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
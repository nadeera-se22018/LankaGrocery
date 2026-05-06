import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo, register } = useAuthStore();

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Did not match both passwords!');
      return;
    }

    try {
      await register(name, email, password);
      toast.success('Account created successfully! 🎉');
      navigate(redirect);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        
        <div className="w-full md:w-1/2 p-8 md:p-12 order-2 md:order-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Account</h2>
          
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-gray-600 font-medium mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Enter password"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Confirm password"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 transition duration-300 shadow-md mt-4"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-gray-600 text-center">
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-green-600 font-bold hover:underline">
              Login Here
            </Link>
          </p>
        </div>

        <div 
          className="hidden md:block w-1/2 bg-cover bg-center order-1 md:order-2"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}
        >
          <div className="bg-black/40 h-full flex flex-col justify-center px-8">
            <h2 className="text-white text-3xl font-bold mb-4">Fresh Groceries, <br/> Delivered to You</h2>
            <p className="text-gray-200">Join LankaGrocery today and experience the best quality products straight from local farms.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
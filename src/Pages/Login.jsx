import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting PIN:', pin); // Debugging

    try {
      const response = await axios.post('https://law-firm-management-system-1.onrender.com/api/pins/login', { pin });
      console.log('Response:', response.data); // Debugging

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error); // Debugging
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
              Enter 6-Digit PIN
            </label>
            <input
              type="password"
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength="6"
              placeholder="******"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
          <button
            type="button"
            className="w-full mt-4 text-blue-500 hover:underline"
            onClick={() => alert('PIN reminder feature coming soon!')}
          >
            Request PIN Reminder
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

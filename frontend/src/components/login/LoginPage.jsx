import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router's navigation hook
import axios from 'axios';
import './login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // React Router navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // 'http://localhost:8000/api/v1/users/login', 
        'https://tshirt-customization-backend.onrender.com/api/v1/users/login',
        { email, password },
        { 
          withCredentials: true // Enable sending/receiving cookies
        }
      );

      if (response.data.statusCode === 200) {
        alert('Login Successful! Redirecting...');
        navigate('/profile');
      }
    } catch (error) {
      // Improved error handling
      const errorMessage = error.response?.data?.message || 'Login Failed. Please check your credentials.';
      alert(errorMessage);
    }
  };

  return (
    <div className="login-page">
      <div className="login-image" />
      <div className="login-form-container">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label htmlFor="email" className="login-label">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div>
            <label htmlFor="password" className="login-label">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          Don't have an account? <a href="/register"> Register </a>here.
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

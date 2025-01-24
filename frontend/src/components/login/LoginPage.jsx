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
      const response = await axios.post('https://tshirt-customization-backend.onrender.com/api/v1/users/login', { email, password });
      //does not work
      // localStorage.setItem('token', response.data.token);
      // alert('Login Successful! Redirecting...');
      // navigate('/designs'); // Navigate to the designs page\
      
      //works   
      const { accessToken, refreshToken, user } = response.data.data;
      console.log(response.data.data);
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      alert('Login Successful! Redirecting...');
      navigate('/designs'); // Navigate to the designs page
    } catch (error) {
      alert('Login Failed. Please check your credentials.');
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

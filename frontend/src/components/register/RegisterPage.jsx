import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/register', { username, email, fullname, password });
      alert('Registration Successful! You can now log in.');
      navigate('/login');
    } catch (error) {
      alert('Registration Failed. Please check your information.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-image" />
      <div className="register-form-container">
        <h1 className="register-title">Register</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <div>
            <label htmlFor="username" className="register-label">Username</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="register-input"
            />
          </div>
          <div>
            <label htmlFor="email" className="register-label">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="register-input"
            />
          </div>
          <div>
            <label htmlFor="fullname" className="register-label">Full Name</label>
            <input
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="register-input"
            />
          </div>
          <div>
            <label htmlFor="password" className="register-label">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="register-input"
            />
          </div>
          <button type="submit" className="register-button">Register</button>
          <p>Already a member? <a href="/login">Click here to login</a></p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

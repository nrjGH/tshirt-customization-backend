import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './profile.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: '',
    fullname: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    
    navigate('/login');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (!token || !storedUser) {
          navigate('/login');
          return;
        }
  
        const parsedUser = JSON.parse(storedUser);
        setProfile(parsedUser);
      } catch (error) {
        console.error('Profile fetch failed:', error);
        navigate('/login');
      }
    };
  
    fetchUserData();
  }, [navigate]);

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1 className="profile-title">Profile</h1>
        <div className="profile-details">
          <div className="profile-item">
            <span className="profile-label">Username:</span>
            <span className="profile-value">{profile.username}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Full Name:</span>
            <span className="profile-value">{profile.fullname}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{profile.email}</span>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
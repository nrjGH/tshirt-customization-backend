import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './profile.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const verifyResponse = await axios.get(
        // 'http://localhost:8000/api/v1/users/verify',
        'https://tshirt-customization-backend.onrender.com/api/v1/users/verify',
        { withCredentials: true }
      );

      if (verifyResponse.data.statusCode === 200) {
        const response = await axios.get(
          // 'http://localhost:8000/api/v1/users/logout',
          'https://tshirt-customization-backend.onrender.com/api/v1/users/logout',
          {
            withCredentials: true,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.status === 200) {
          // Force navigation to login page
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          // 'http://localhost:8000/api/v1/users/verify',
          'https://tshirt-customization-backend.onrender.com/api/v1/users/verify',
          { withCredentials: true }
        );
        
        if (response.data.statusCode === 200) {
          setProfile(response.data.data.user);
        }
      } catch (error) {
        console.error('Profile fetch failed:', error);
        navigate('/login');
      }
    };
  
    fetchUserData();
  }, [navigate]);

  if (!profile) {
    return <div>Loading...</div>;
  }

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
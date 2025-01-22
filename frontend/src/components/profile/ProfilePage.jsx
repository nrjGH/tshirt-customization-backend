import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profile.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: '',
    fullname: '',
    email: '',
    totalDesigns: 0,
  });

  useEffect(() => {
    // Fetch user profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile'); // Adjust the endpoint based on your backend
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

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
          <div className="profile-item">
            <span className="profile-label">Total Designs Created:</span>
            <span className="profile-value">{profile.totalDesigns}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

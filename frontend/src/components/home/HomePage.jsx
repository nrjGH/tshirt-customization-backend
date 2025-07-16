import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="homepage-container">
      {/* Top Designs Section */}
      <section className="bg-secondary rounded-lg p-6">
        <h2 className="section-title">Top Designs</h2>
        <div className="designs-container">
          {/* Placeholder for top 3 trending designs */}
          <div className="design-card">
            <img 
            src="https://res.cloudinary.com/dl3atd6kf/image/upload/v1752689202/zg4r0ywegw3hzdquorty.png" alt="Design 1" className="design-image" />
            <h3 className="design-title">Design 1</h3>
          </div>
          <div className="design-card">
            <img src="https://res.cloudinary.com/dl3atd6kf/image/upload/v1737748991/cf6216fac15f7562cc2693d6549e2597_ryaij2.jpg" alt="Design 2" className="design-image" />
            <h3 className="design-title">Design 2</h3>
          </div>
          <div className="design-card">
            <img src="https://res.cloudinary.com/dl3atd6kf/image/upload/v1752689550/iwqrg4jwguvosw5pd3cs.png" alt="Design 3" className="design-image" />
            <h3 className="design-title">Design 3</h3>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="text-center space-y-6">
        <h1 className="main-title">Welcome to Shirt Customizer</h1>
        <p className="main-description">
          Dive into the world of custom apparel and explore endless possibilities for personalizing your wardrobe.
        </p>
        <p className="sub-description">
          Whether you're crafting a masterpiece for yourself, a team, or a brand, Shirt Customizer provides the best tools
          to bring your creativity to life. Join us today and be part of a vibrant, creative community.
        </p>
      </section>

      {/* Sign Up Section */}
      <section className="bg-accent rounded-lg p-6">
        <h2 className="section-title">Sign Up Now</h2>
        <p className="signup-description">
          Create your account today and gain access to exclusive designs, discounts, and a supportive community of creators.
        </p>
        <form className="signup-form">
          <button type="button" onClick={handleRegisterClick} className="signup-button">Join Shirt Customizer</button>
        </form>
      </section>
    </div>
  );
};

export default HomePage;

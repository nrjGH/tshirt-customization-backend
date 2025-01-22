import React from 'react';
import './home.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Top Designs Section */}
      <section className="bg-secondary rounded-lg p-6">
        <h2 className="section-title"></h2>
        <div className="designs-container">
          {/* Placeholder for top 3 trending designs */}
          <div className="design-card">
            <img src="/placeholder1.svg" alt="Design 1" className="design-image" />
            <h3 className="design-title"></h3>
          </div>
          <div className="design-card">
            <img src="/placeholder2.svg" alt="Design 2" className="design-image" />
            <h3 className="design-title"></h3>
          </div>
          <div className="design-card">
            <img src="/placeholder3.svg" alt="Design 3" className="design-image" />
            <h3 className="design-title"></h3>
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
          {/* <input type="email" placeholder="Enter your email" required className="signup-input" /> */}
          <button type="submit" className="signup-button">Join Shirt Customizer</button>
        </form>
      </section>
    </div>
  );
};

export default HomePage;

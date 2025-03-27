import React from 'react';
import { Link } from 'react-router-dom';  // Add this import
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-header">
                    <img src="https://res.cloudinary.com/dl3atd6kf/image/upload/v1737564544/logo_sc-removebg-preview_ipeifi.png"  className="footer-logo-image" />
                    <Link to="/" className="footer-logo">
                        <span className="footer-logo-text">Shirt Customizer</span>
                    </Link>
                    <p className="footer-description">
                        Your go-to platform for unique, personalized shirt designs since 2025.
                    </p>
                </div>
                <div className="footer-links">
                    <div className="footer-section">
                        <h3 className="footer-heading">About Us</h3>
                        <p className="footer-text">
                            Shirt Customizer: Your go-to platform for unique, personalized shirt designs since 2025.
                        </p>
                    </div>
                    <div className="footer-section">
                        <h3 className="footer-heading">Quick Links</h3>
                        <ul className="footer-list">
                            <li><Link to="/" className="footer-link">Home</Link></li>
                            <li><Link to="/designs" className="footer-link">Designs</Link></li>
                            <li><Link to="/about" className="footer-link">About</Link></li>
                            <li><Link to="/design" className="footer-link">Create Design</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3 className="footer-heading">Customer Service</h3>
                        <ul className="footer-list">
                            <li><a href="/faq" className="footer-link">FAQ</a></li>
                            <li><a href="/contact" className="footer-link">Contact Us</a></li>
                            <li><a href="/shipping" className="footer-link">Shipping Info</a></li>
                            <li><a href="/returns" className="footer-link">Returns Policy</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3 className="footer-heading">Connect With Us</h3>
                        <ul className="footer-list">
                            <li><a href="#" className="footer-link">Facebook</a></li>
                            <li><a href="#" className="footer-link">Twitter</a></li>
                            <li><a href="#" className="footer-link">Instagram</a></li>
                            <li><a href="#" className="footer-link">Pinterest</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 Shirt Customizer. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
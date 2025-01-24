import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import './header.css';
const Header = () => {
  const location = useLocation();

  // Mock user and cart data (replace with actual logic)
  const user = {};
  const cart = [];

  return (
    <header className="header">
      <nav className="header-nav">
        <Link to="/" className="header-logo">
          <img src="https://res.cloudinary.com/dl3atd6kf/image/upload/v1737564544/logo_sc-removebg-preview_ipeifi.png" alt="Logo" className="header-logo-image" />
          <span className="header-logo-text">Shirt Customizer</span>
        </Link>
        <ul className="header-links">
          <li>
            <Link
              to="/designs"
              className={`header-link ${location.pathname === '/designs' ? 'header-link-active' : ''}`}
            >
              Public Designs
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`header-link ${location.pathname === '/about' ? 'header-link-active' : ''}`}
            >
              About
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  to="/design"
                  className={`header-link ${location.pathname === '/design' ? 'header-link-active' : ''}`}
                >
                  Design
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className={`header-link ${location.pathname === '/profile' ? 'header-link-active' : ''}`}
                >
                  Profile
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className={`header-link ${location.pathname === '/login' ? 'header-link-active' : ''}`}
              >
                Login
              </Link>
            </li>
          )}
          <li>
            <Link to="/cart" className="header-cart">
              <ShoppingCart className="header-cart-icon" />
              {cart.length > 0 && (
                <span className="header-cart-count">{cart.length}</span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

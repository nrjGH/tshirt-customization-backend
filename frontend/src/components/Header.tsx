import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useStore } from '../../lib/store';
import { ShoppingCart } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const { user, logout, cart } = useStore();

  return (
    <header className="bg-secondary shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo-placeholder.svg" alt="Logo" className="w-10 h-10" />
          <span className="logo animate-fade-in text-primary">Shirt Customizer</span>
        </Link>
        <ul className="flex items-center space-x-6">
          <li>
            <Link to="/designs" className={`link-hover ${location.pathname === '/designs' ? 'text-primary' : 'text-foreground'}`}>
              Designs
            </Link>
          </li>
          <li>
            <Link to="/about" className={`link-hover ${location.pathname === '/about' ? 'text-primary' : 'text-foreground'}`}>
              About
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/design" className={`link-hover ${location.pathname === '/design' ? 'text-primary' : 'text-foreground'}`}>
                  Create
                </Link>
              </li>
              <li>
                <Link to="/profile" className={`link-hover ${location.pathname === '/profile' ? 'text-primary' : 'text-foreground'}`}>
                  Profile
                </Link>
              </li>
              <li>
                <Button variant="ghost" onClick={logout} className="btn-hover animate-scale">Logout</Button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className={`link-hover ${location.pathname === '/login' ? 'text-primary' : 'text-foreground'}`}>
                Login
              </Link>
            </li>
          )}
          <li>
            <Link to="/cart" className="relative animate-scale">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;


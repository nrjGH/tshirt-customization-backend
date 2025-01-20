import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-accent py-8 shadow-inner">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo-placeholder.svg" alt="Logo" className="w-10 h-10" />
            <span className="logo animate-fade-in text-primary">Shirt Customizer</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Your go-to platform for unique, personalized shirt designs since 2025.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-muted-foreground">
              Shirt Customizer: Your go-to platform for unique, personalized shirt designs since 2025.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/designs" className="text-sm hover:text-primary transition-colors">Designs</Link></li>
              <li><Link to="/about" className="text-sm hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/design" className="text-sm hover:text-primary transition-colors">Create Design</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-sm hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-sm hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-sm hover:text-primary transition-colors">Returns Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Facebook</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Twitter</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Pinterest</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-muted-foreground/10 text-center">
          <p>&copy; 2025 Shirt Customizer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


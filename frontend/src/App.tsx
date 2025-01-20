import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DesignsPage from '../app/designs/page';
import AboutPage from '../app/about/page';
import DesignToolPage from '../app/design/page';
import LoginPage from '../app/login/page';
import RegisterPage from '../app/register/page';
import ProfilePage from '../app/profile/page';
import CartPage from '../app/cart/page';
import { Toaster } from '../components/ui/toaster';

function App() {
  return (
    <Router>
      <div className="bg-gradient min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            
            <Route path="/designs" element={<DesignsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/design" element={<DesignToolPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;


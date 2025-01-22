import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import HomePage from './components/home/HomePage.jsx'; 
import DesignsPage from './components/designs/DesignPage.jsx';
import RegisterPage from './components/register/RegisterPage.jsx';
import AboutPage from './components/about/AboutPage.jsx';
import LoginPage from './components/login/LoginPage.jsx';
import DesignToolPage from './components/design/DesignToolPage.jsx';
import CartPage from './components/cart/CartPage.jsx';
import ProfilePage from './components/profile/ProfilePage.jsx';
// import other components like DesignsPage, AboutPage, etc. if needed

function App() {
  return (
    <Router>
      <div className="bg-gradient min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            {/* Uncomment and add your route components when needed */}
            <Route path="/designs" element={<DesignsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/design" element={<DesignToolPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            
            {/* Main Route */}
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        {/* <Toaster /> */}
      </div>
    </Router>
  );
}

export default App;

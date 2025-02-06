import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './cart.css';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get('https://tshirt-customization-backend.onrender.com/api/v1/users/verify', {
          withCredentials: true
        });
        
        if (response.data.statusCode === 200) {
          setProfile(response.data.data.user);
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        // alert('You need to be logged in to access this page');
        navigate('/login');
      }
    };
  
    verifyUser();
  }, [navigate]);

  const handleRemove = (id) => {
    console.log(`Removing item with ID: ${id}`);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <p>{item.name}</p>
            <p>{item.color}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleRemove(item.id)} className="cart-remove-button">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;

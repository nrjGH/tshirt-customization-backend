import './cart.css';

const CartPage = () => {
  const cart = [];

  const handleRemove = (id) => {
    console.log(`Removing item with ID: ${id}`);
  };

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

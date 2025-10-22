import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { OrderContext } from '../context/OrderContext.jsx';

const Order = () => {
  const { user } = useContext(AuthContext);
  const { cart, updateQuantity, removeFromCart, clearCart, getTotal } = useContext(OrderContext);
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  if (!user) {
    return (
      <div className="login-container">
        <div className="login-prompt">
          <h1>Please Log In to View Your Orders</h1>
          <p>You need to be logged in to access your order summary and place orders.</p>
          <button className="login-btn" onClick={() => navigate('/login')}>
            Log In
          </button>
          <button className="signup-btn" onClick={() => navigate('/signup')}>
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    alert('Order submitted successfully!');
    clearCart();
    setSubmitted(true);
  };

  const handleQuantityChange = (id, change) => {
    const item = cart.find((item) => item.id === id);
    const newQuantity = Math.max(1, item.quantity + change);
    updateQuantity(id, newQuantity);
  };

  if (submitted) {
    return (
      <div className="order-container">
        <div className="order-confirmation">
          <h1>☕ Order Confirmed!</h1>
          <p>Thank you for your order! Your coffee will be ready soon.</p>
          <button className="back-home" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-container">
      <h1 className="order-title">Your Order Summary</h1>
      {cart.length === 0 ? (
        <p className="empty-cart">
          Your cart is empty. <a href="/menu">Go to Menu</a>
        </p>
      ) : (
        <>
          <div className="order-card">
            {cart.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)} each</p>
                </div>

                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  />
                  <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>

                <div className="item-actions">
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                  <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}

            <hr />
            <h3 className="total">Total: ${getTotal().toFixed(2)}</h3>
          </div>

          <button className="submit-order" onClick={handleSubmit}>
            Submit Order
          </button>
        </>
      )}
    </div>
  );
};

export default Order;
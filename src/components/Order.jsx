import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { OrderContext } from '../context/OrderContext.jsx';

const Order = () => {
  const { user } = useContext(AuthContext);
  const { cart, updateQuantity, removeFromCart, addToCart, clearCart } = useContext(OrderContext);
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [sizes, setSizes] = useState({});
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [address, setAddress] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');

  const sizeAddOns = {
    "Tall (12 fl oz)": 0,
    "Grande (16 fl oz)": 20,
    "Venti (24 fl oz)": 40,
    "Trenta (30 fl oz)": 60,
  };

  const coffeeShops = [
    'Bean & Bean – Cabuyao City',
    'Bean & Bean – Sta. Rosa',
    'Bean & Bean – Calamba',
    'Bean & Bean – Binan',
  ];

  if (!user) {
    return (
      <div className="login-container">
        <div className="login-prompt">
          <h1>Please Log In to View Your Orders</h1>
          <p>You need to be logged in to access your order summary and place orders.</p>
          <button className="login-btn" onClick={() => navigate('/login')}>Log In</button>
          <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (deliveryOption === 'delivery' && !address.trim()) {
      alert('Please enter your delivery address.');
      return;
    }
    if (deliveryOption === 'pickup' && !pickupLocation) {
      alert('Please select your nearest coffee shop.');
      return;
    }

    const orderSummary = cart.map(item => {
      const size = sizes[item.id] || item.size || 'Tall (12 fl oz)';
      const adjustedPrice = item.price + sizeAddOns[size];
      return {
        name: item.name,
        size,
        quantity: item.quantity,
        totalPrice: (adjustedPrice * item.quantity).toFixed(2),
      };
    });

    console.log('Order submitted:', {
      orderSummary,
      deliveryOption,
      address,
      pickupLocation,
    });

    alert(`Order submitted successfully via ${deliveryOption.toUpperCase()}!`);
    clearCart();
    setSubmitted(true);
  };

  const handleQuantityChange = (id, change) => {
    const item = cart.find((item) => item.id === id);
    const newQuantity = Math.max(1, item.quantity + change);
    updateQuantity(id, newQuantity);
  };

  const handleSizeChange = (id, value) => {
    setSizes({ ...sizes, [id]: value });
  };

  const handleAddVariant = (item) => {
    // Create a new cart item for a different size of the same coffee
    const newVariant = {
      ...item,
      id: `${item.id}-${Date.now()}`, // unique id for new variant
      quantity: 1,
      size: 'Tall (12 fl oz)',
    };
    addToCart(newVariant);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const size = sizes[item.id] || item.size || 'Tall (12 fl oz)';
      const adjustedPrice = item.price + sizeAddOns[size];
      return total + adjustedPrice * item.quantity;
    }, 0);
  };

  if (submitted) {
    return (
      <div className="order-container">
        <div className="order-confirmation">
          <h1>☕ Order Confirmed!</h1>
          <p>Thank you for your order! Your coffee will be ready soon.</p>
          <button className="back-home" onClick={() => navigate('/')}>Back to Home</button>
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
            {cart.map((item) => {
              const selectedSize = sizes[item.id] || item.size || 'Tall (12 fl oz)';
              const adjustedPrice = item.price + sizeAddOns[selectedSize];

              return (
                <div key={item.id} className="order-item">
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>₱{adjustedPrice.toFixed(2)}</p>
                  </div>

                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                    />
                    <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                  </div>

                  <div className="form-group">
                    <label>Size:</label>
                    <select
                      value={selectedSize}
                      onChange={(e) => handleSizeChange(item.id, e.target.value)}
                    >
                      <option value="Tall (12 fl oz)">Tall (12 fl oz)</option>
                      <option value="Grande (16 fl oz)">Grande (16 fl oz)</option>
                      <option value="Venti (24 fl oz)">Venti (24 fl oz)</option>
                      <option value="Trenta (30 fl oz)">Trenta (30 fl oz)</option>
                    </select>
                  </div>

                  <div className="item-actions">
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                    <button
                      className="variant-btn"
                      onClick={() => handleAddVariant(item)}
                    >
                      + Add Another Size
                    </button>
                    <p className="item-total">
                      ₱{(adjustedPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}

            <hr />
            <div className="form-group delivery-options">
              <label>Order Type:</label>
              <div className="delivery-choice">
                <label>
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="pickup"
                    checked={deliveryOption === 'pickup'}
                    onChange={() => setDeliveryOption('pickup')}
                  />
                  Pick Up
                </label>
                <label>
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="delivery"
                    checked={deliveryOption === 'delivery'}
                    onChange={() => setDeliveryOption('delivery')}
                  />
                  Delivery
                </label>
              </div>
            </div>

            {deliveryOption === 'delivery' && (
              <div className="form-group">
                <label>Delivery Address:</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            )}

            {deliveryOption === 'pickup' && (
              <div className="form-group">
                <label>Nearest Coffee Shop:</label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                >
                  <option value="">Select a branch</option>
                  {coffeeShops.map((shop, index) => (
                    <option key={index} value={shop}>
                      {shop}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <h3 className="total">Total: ₱{calculateTotal().toFixed(2)}</h3>
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

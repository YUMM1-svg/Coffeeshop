import React, { useContext, useState } from 'react';
import { OrderContext } from '../context/OrderContext.jsx';

const menuItems = [
  {
    id: 1,
    name: 'Espresso',
    price: 3.5,
    image: 'https://images.pexels.com/photos/997656/pexels-photo-997656.jpeg',
  },
  {
    id: 2,
    name: 'Latte',
    price: 4.5,
    image: 'https://images.pexels.com/photos/894696/pexels-photo-894696.jpeg',
  },
  {
    id: 3,
    name: 'Cappuccino',
    price: 4.0,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
  },
  {
    id: 4,
    name: 'Americano',
    price: 3.0,
    image: 'https://images.pexels.com/photos/6207307/pexels-photo-6207307.jpeg',
  },
  {
    id: 5,
    name: 'Mocha',
    price: 5.0,
    image: 'https://images.pexels.com/photos/34384700/pexels-photo-34384700.jpeg',
  },
  {
    id: 6,
    name: 'Cold Brew',
    price: 4.5,
    image: 'https://images.pexels.com/photos/33029960/pexels-photo-33029960.jpeg',
  },
];

const Menu = () => {
  const { addToCart } = useContext(OrderContext);
  const [message, setMessage] = useState('');

  const handleAddToCart = (item) => {
    addToCart(item);
    setMessage(`${item.name} added to cart!`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">☕ Our Menu</h1>

      {message && <div className="cart-message">🛒 {message}</div>}

      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-card">
            <img src={item.image} alt={item.name} className="menu-image" />
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
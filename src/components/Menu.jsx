import React, { useContext, useState } from 'react';
import { OrderContext } from '../context/OrderContext.jsx';

const menuItems = [
  {
    id: 1,
    name: 'Espresso',
    price: 100,
    image: 'https://images.pexels.com/photos/997656/pexels-photo-997656.jpeg',
  },
  {
    id: 2,
    name: 'Latte',
    price: 120,
    image: 'https://images.pexels.com/photos/894696/pexels-photo-894696.jpeg',
  },
  {
    id: 3,
    name: 'Cappuccino',
    price: 110,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
  },
  {
    id: 4,
    name: 'Americano',
    price: 90,
    image: 'https://images.pexels.com/photos/6207307/pexels-photo-6207307.jpeg',
  },
  {
    id: 5,
    name: 'Mocha',
    price: 130,
    image: 'https://images.pexels.com/photos/34384700/pexels-photo-34384700.jpeg',
  },
  {
    id: 6,
    name: 'Cold Brew',
    price: 125,
    image: 'https://images.pexels.com/photos/33029960/pexels-photo-33029960.jpeg',
  },
];

const Menu = () => {
  const { addToCart } = useContext(OrderContext);
  const [message, setMessage] = useState('');
  const [reviews, setReviews] = useState({});
  const [newReview, setNewReview] = useState({});
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleAddToCart = (item) => {
    addToCart(item);
    setMessage(`${item.name} added to cart!`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleReviewChange = (itemId, field, value) => {
    setNewReview((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value,
      },
    }));
  };

  const handleSubmitReview = (itemId) => {
    const review = newReview[itemId];
    if (!review?.text || !review?.rating) {
      alert('Please enter both a rating and a review.');
      return;
    }

    const updated = {
      ...reviews,
      [itemId]: [...(reviews[itemId] || []), review],
    };

    setReviews(updated);
    setNewReview((prev) => ({ ...prev, [itemId]: { text: '', rating: '' } }));
    alert('Review submitted successfully!');
  };

  const averageRating = (itemId) => {
    const itemReviews = reviews[itemId] || [];
    if (itemReviews.length === 0) return 0;
    const sum = itemReviews.reduce((acc, r) => acc + parseInt(r.rating), 0);
    return (sum / itemReviews.length).toFixed(1);
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
            <p>₱{item.price.toFixed(2)}</p>
            <p>⭐ {averageRating(item.id)}/5</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
            <button
              onClick={() => setSelectedItemId(item.id)}
              className="review-icon"
            >
              ⭐
            </button>
          </div>
        ))}
      </div>

      {selectedItemId && (
        <div className="modal-overlay" onClick={() => setSelectedItemId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>Reviews for {menuItems.find((i) => i.id === selectedItemId).name}</h4>
            <div className="review-form">
              <select
                value={newReview[selectedItemId]?.rating || ''}
                onChange={(e) =>
                  handleReviewChange(selectedItemId, 'rating', e.target.value)
                }
              >
                <option value="">Rate</option>
                <option value="1">⭐ 1</option>
                <option value="2">⭐ 2</option>
                <option value="3">⭐ 3</option>
                <option value="4">⭐ 4</option>
                <option value="5">⭐ 5</option>
              </select>
              <textarea
                placeholder="Write your review..."
                value={newReview[selectedItemId]?.text || ''}
                onChange={(e) =>
                  handleReviewChange(selectedItemId, 'text', e.target.value)
                }
              />
              <button
                onClick={() => {
                  handleSubmitReview(selectedItemId);
                  setSelectedItemId(null);
                }}
              >
                Submit Review
              </button>
            </div>
            {reviews[selectedItemId] && reviews[selectedItemId].length > 0 && (
              <div className="reviews-list">
                <h5>Customer Reviews</h5>
                {reviews[selectedItemId].map((rev, index) => (
                  <div key={index} className="review">
                    <p>
                      <strong>⭐ {rev.rating}</strong> - {rev.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setSelectedItemId(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
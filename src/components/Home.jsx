import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Welcome to Bean & Bean Coffee Shop</h1>
          <p>We brew cups that hit you right in the feels — sometimes sweet, sometimes bitter, but always worth the sip.</p>
          <button className="button">Order Now</button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us container">
        <h2>Why Choose Us</h2>
        <p>
          At Bean & Bean, we blend the perfect cup of coffee with a creative atmosphere.
          Our beans are locally sourced, freshly roasted, and brewed with care — perfect
          for sparking inspiration and fueling your day.
        </p>
      </section>

      {/* Best Sellers */}
      <section className="best-sellers container">
        <h2>Best Sellers</h2>
        <div className="best-sellers-grid">
          <div className="product-card">
            <img
              src="https://images.pexels.com/photos/269126/pexels-photo-269126.jpeg"
              alt="Espresso"
            />
            <h3>Espresso</h3>
            <p>Bold and intense, our signature shot.</p>
          </div>
          <div className="product-card">
            <img
              src="https://images.pexels.com/photos/302896/pexels-photo-302896.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Latte"
            />
            <h3>Latte</h3>
            <p>Creamy and smooth, with a hint of vanilla.</p>
          </div>
          <div className="product-card">
            <img
              src="https://images.pexels.com/photos/9355964/pexels-photo-9355964.jpeg"
              alt="Cold Brew"
            />
            <h3>Cold Brew</h3>
            <p>Refreshing and chilled, perfect for hot days.</p>
          </div>
          <div className="product-card">
            <img
              src="https://images.pexels.com/photos/29054043/pexels-photo-29054043.jpeg"
              alt="Cappuccino"
            />
            <h3>Cappuccino</h3>
            <p>Frothy and classic, topped with cocoa.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

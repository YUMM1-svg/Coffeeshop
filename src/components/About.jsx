import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-overlay">
          <h1>About Bean & Bean Coffee Shop</h1>
          <p>
            Brewing more than just coffee — we serve comfort, creativity, and connection in every cup.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story container">
        <h2>Our Story</h2>
        <p>
          Founded in 2020, Bean & Bean began as a small neighborhood café with a big dream — 
          to bring people together over great coffee. Every bean we brew is locally sourced, 
          freshly roasted, and brewed with love. Whether you’re working, studying, or simply 
          catching up with friends, we’re here to make every sip special.
        </p>
      </section>

      {/* Mission and Vision Section */}
      <section className="about-mission container">
        <div className="mission-vision">
          <div className="mission-card">
            <h3>☕ Our Mission</h3>
            <p>
              To craft high-quality coffee that fuels creativity and brings people together in a 
              welcoming space filled with warmth and inspiration.
            </p>
          </div>
          <div className="mission-card">
            <h3>🌿 Our Vision</h3>
            <p>
              To be the go-to local café where every cup tells a story, every visit feels like home, 
              and every community member feels valued.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team container">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img
              src="https://images.pexels.com/photos/4349842/pexels-photo-4349842.jpeg"
              alt="Barista 1"
            />
            <h4>Alex</h4>
            <p>Head Barista</p>
          </div>
          <div className="team-member">
            <img
              src="https://images.pexels.com/photos/4353567/pexels-photo-4353567.jpeg"
              alt="Barista 2"
            />
            <h4>Jamie</h4>
            <p>Pastry Chef</p>
          </div>
          <div className="team-member">
            <img
              src="https://images.pexels.com/photos/6205515/pexels-photo-6205515.jpeg"
              alt="Barista 3"
            />
            <h4>Riley</h4>
            <p>Shop Manager</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
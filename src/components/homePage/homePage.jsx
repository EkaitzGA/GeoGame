import { Link } from 'react-router-dom';
import React from 'react';
import './homePage.css';

const HomePage = () => {
    return (
      <>
        <div className="welcome-message">
          <h1>Welcome to GeoQuiz!</h1>
          <p>
            Click on the images below to start the game
          </p>
        </div>
        <section className="main-page-section">
        <Link to="/flags" className="image-container">
          <img
            className="flags-img"
            src="../../src/assets/flags.jpeg"
            alt="flags"
          />
          <div className="image-text">Flag game</div>
        </Link>
        <Link to="/capitals" className="image-container">
          <img
            className="capitals-img"
            src="../../src/assets/capitals.jpeg"
            alt="capitals"
          />
          <div className="image-text">Capital game</div>
        </Link>
      
      </section>
      </>
    );
  };
  
  export default HomePage;
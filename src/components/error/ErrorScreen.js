import React from 'react';
import './ErrorScreen.css';

const ErrorScreen = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-title">Oops! Something went wrong 😞</h1>
        <p className="error-message">
          {message || "We couldn't load the component. Please try again later."}
        </p>
        <button className="retry-button">
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorScreen;

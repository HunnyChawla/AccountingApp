import React, { useState, useEffect } from 'react';
import './Alert.css'; // Add your styles here

const Alert = ({ message, type = 'info', onClose, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose && onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`alert alert-${type}`}>
      <span className="alert-message">{message}</span>
      <button className="alert-close" onClick={() => { setVisible(false); onClose && onClose(); }}>
        &times;
      </button>
    </div>
  );
};

export default Alert;

// Usage Example
// import Alert from './Alert';
// <Alert message="This is an info alert!" type="info" onClose={() => console.log('Closed!')} duration={5000} />

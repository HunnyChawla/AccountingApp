import React, { useState, useEffect } from 'react';
import './Loader.css';

const motivationalTexts = [
  "Hang tight! We're making magic happen ✨",
  "Good things take time... Loading awesomeness!",
  "Preparing something spectacular just for you 🚀",
  "We're almost there! Just a moment more 😊",
  "Quality takes time—perfection incoming 🎯"
];

const Loader = () => {
  const [currentText, setCurrentText] = useState(motivationalTexts[0]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true); // Start exit animation
      setTimeout(() => {
        setCurrentText((prevText) => {
          const currentIndex = motivationalTexts.indexOf(prevText);
          return motivationalTexts[(currentIndex + 1) % motivationalTexts.length];
        });
        setAnimate(false); // Reset for next slide-in animation
      }, 500); // Match the animation duration
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container">
      <div className="loader">
        <span className="ball"></span>
        <span className="ball"></span>
        <span className="ball"></span>
      </div>
      <p className={`loader-text ${animate ? 'slide-out' : 'slide-in'}`}>
        {currentText}
      </p>
    </div>
  );
};

export default Loader;

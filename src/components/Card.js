import React, { useState, useEffect } from "react";

const Card = ({ title,profit, loss }) => {
  const [displayedProfit, setDisplayedProfit] = useState(0);
  const [displayedLoss, setDisplayedLoss] = useState(0);

  useEffect(() => {
    const animateValue = (start, end, duration, setter) => {
      const range = end - start;
      const increment = range / (duration / 10);
      let current = start;
      const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
          clearInterval(timer);
          setter(end);
        } else {
          setter(Math.round(current));
        }
      }, 10);
    };

    animateValue(displayedProfit, profit, 1000, setDisplayedProfit);
    animateValue(displayedLoss, loss, 1000, setDisplayedLoss);
  }, [profit, loss]);

  return (
    <div style={styles.card}>
      <h3>${title}</h3>
      <div style={styles.content}>
        <div style={styles.item}>
          <h4>Profit</h4>
          <p style={styles.profit}>₹{displayedProfit.toLocaleString()}</p>
        </div>
        <div style={styles.item}>
          <h4>Loss</h4>
          <p style={styles.loss}>₹{displayedLoss.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    textAlign: "center",
    overflow: "hidden",
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
  },
  item: {
    textAlign: "center",
  },
  profit: {
    color: "green",
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  loss: {
    color: "red",
    fontSize: "1.5em",
    fontWeight: "bold",
  },
};

export default Card;

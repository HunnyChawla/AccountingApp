import React from "react";

const ProfitLossCard = ({ profit, loss }) => {
  return (
    <div style={styles.card}>
      <h3>Profit & Loss Summary</h3>
      <div style={styles.content}>
        <div style={styles.item}>
          <h4>Profit</h4>
          <p style={styles.profit}>₹{profit.toLocaleString()}</p>
        </div>
        <div style={styles.item}>
          <h4>Loss</h4>
          <p style={styles.loss}>₹{loss.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: "45%", // Adjust width for responsiveness
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    margin: "10px",
    textAlign: "center",
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

export default ProfitLossCard;

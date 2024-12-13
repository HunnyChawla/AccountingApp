import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutScreen = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to login screen
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>You’ve been logged out!</h1>
        <p style={styles.message}>
          Thank you for using <span style={styles.brand}>Rishi Textile</span>. We hope to see you again soon!
        </p>
        <button style={styles.button} onClick={handleLoginRedirect}>
          Go to Login
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  card: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    maxWidth: "400px",
    width: "100%",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#007bff",
  },
  message: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  brand: {
    fontWeight: "bold",
    color: "#007bff",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
};

export default LogoutScreen;

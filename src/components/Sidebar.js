import React from "react";

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <ul style={styles.menu}>
        <li><a href="/" style={styles.menuItem}>Dashboard</a></li>
        <li><a href="/orders" style={styles.menuItem}>Orders</a></li>
        <li><a href="/payments" style={styles.menuItem}>Payments</a></li>
        <li><a href="/analytics" style={styles.menuItem}>Analytics</a></li>
        <li><a href="/profile" style={styles.menuItem}>Profile</a></li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "200px",
    height: "100vh",
    backgroundColor: "#f8f9fa",
    padding: "20px",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  },
  menu: {
    listStyle: "none",
    padding: 0,
  },
  menuItem: {
    display: "block",
    padding: "10px",
    margin: "5px 0",
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
    borderRadius: "5px",
    transition: "background-color 0.2s",
  },
  menuItemHover: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
};

export default Sidebar;

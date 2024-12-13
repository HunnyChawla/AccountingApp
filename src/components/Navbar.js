import { color } from "chart.js/helpers";
import React from "react";
import { FaHome, FaChartBar, FaCog, FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear tokens and other user data
    // navigate("/logout"); // Redirect to logout screen
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo Section */}
      <div style={styles.logoContainer}>
        <h1 style={styles.logo}>Rishi Textile</h1>
      </div>

      {/* Navigation Links */}
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>
          <a href="/" style={styles.link}>
            <FaHome style={styles.icon} /> Home
          </a>
        </li>
        <li style={styles.navItem}>
          <a href="/reports" style={styles.link}>
            <FaChartBar style={styles.icon} /> Reports
          </a>
        </li>
        <li style={styles.navItem}>
          <a href="/settings" style={styles.link}>
            <FaCog style={styles.icon} /> Settings
          </a>
        </li>
        {/* Logout Button */}
        <li style={styles.navItem}>
        <a href="/logout" onClick={handleLogout} style={{...styles.link}}>
            <FaPowerOff style={styles.icon} /> Logout
          </a>
          {/* <button onClick={handleLogout} style={{ ...styles.link, ...styles.logoutButton }}>
            Logout
          </button> */}
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
    margin: 0,
    cursor: "pointer",
    transition: "color 0.3s ease",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0,
  },
  navItem: {
    position: "relative",
    transition: "transform 0.2s ease",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  icon: {
    fontSize: "18px",
  },
  logoutButton: {
    color: "#dc3545",
    border: "none",
    cursor: "pointer",
  },
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import {
  FaShoppingCart,
  FaUpload,
  FaMoneyBillWave,
  FaChartBar,
  FaUser,
  FaEdit,
  FaBoxOpen,
  FaClock,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h3>Seller Dashboard</h3>
      <ul style={styles.menu}>
        <li style={styles.menuItem}>
          <Link to="/" style={styles.link}>
            <AiOutlineHome style={styles.icon} />
            Dashboard
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/orders" style={styles.link}>
            <FaShoppingCart style={styles.icon} />
            Orders
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/upload" style={styles.link}>
            <FaUpload style={styles.icon} />
            Upload File
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/products" style={styles.link}>
            <FaBoxOpen style={styles.icon} />
             Product
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/order365" style={styles.link}>
            <FaClock style={styles.icon} />
             Order365
          </Link>
        </li>
        <li style={styles.menuItem}>
          <a href="/payments" style={styles.link}>
            <FaMoneyBillWave style={styles.icon} />
            Payments
          </a>
        </li>
        <li style={styles.menuItem}>
          <a href="/analytics" style={styles.link}>
            <FaChartBar style={styles.icon} />
            Analytics
          </a>
        </li>
        <li style={styles.menuItem}>
          <a href="/profile" style={styles.link}>
            <FaUser style={styles.icon} />
            Profile
          </a>
        </li>
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
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
  },
  link: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
    borderRadius: "5px",
    transition: "background-color 0.2s",
    padding: "10px",
    width: "100%",
  },
  icon: {
    marginRight: "10px",
    fontSize: "18px",
  },
  linkHover: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
};

export default Sidebar;

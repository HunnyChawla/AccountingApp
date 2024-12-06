import React from "react";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
        <h1 style={styles.logo}>Rishi Textile</h1>
           <ul style={styles.navLinks}>
                <li><a href="/" style={styles.link}>Home</a></li>
                <li><a href="/reports" style={styles.link}>Reports</a></li>
                <li><a href="/settings" style={styles.link}>Settings</a></li>
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
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "500",
  },
};

export default Navbar;

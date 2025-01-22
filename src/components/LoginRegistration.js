import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch } from 'react-redux';
import { login } from '../Store/slice/authSlice';

const LoginRegistration = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Registration
  const [formData, setFormData] = useState({ username: "", password: "", name: "" });
  const [loginStatus, setLoginStatus] = useState(null); // For displaying login status messages
  const navigate = useNavigate(); // Initialize navigate
  const dispatch = useDispatch();
  const authUrl = process.env.REACT_APP_ACCOUNT_AUTH;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        console.log(authUrl);
        const response = await fetch(`${authUrl}/auth/login?username=${encodeURIComponent(formData.username)}&password=${encodeURIComponent(formData.password)}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (!response.ok) throw new Error("Login failed");

        const result = await response.json();
        setLoginStatus({ type: "success", message: "Login successful!" });

        // Utilize the response
        localStorage.setItem("accessToken", result.access_token);
        localStorage.setItem("refreshToken", result.refresh_token);
        localStorage.setItem("tokenType", result.token_type);
        localStorage.setItem("expiresIn", new Date().getTime() + result.expires_in * 1000);


        console.log("Access Token:", result.access_token);
        console.log("Refresh Token:", result.refresh_token);
        dispatch(login({ 
            username: formData.username, 
            accessToken: result.access_token,
            refreshToken: result.refresh_token,
            expiresIn: result.expires_in,
            expiresAt: new Date().getTime() + result.expires_in * 1000
        }));
        navigate("/"); // Redirect to the home route
      } catch (error) {
        setLoginStatus({ type: "error", message: "Invalid Username or password." });
        console.error("Login error:", error);
      }
    } else {
      console.log("Registering with:", formData);
      // Registration API integration can go here
    }

    setFormData({ username: "", password: "", name: "" }); // Reset form
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isLogin ? "Login" : "Register"}</h2>
        {loginStatus && (
          <p
            style={{
              color: loginStatus.type === "success" ? "green" : "red",
              fontSize: "14px",
              marginBottom: "10px",
            }}
          >
            {loginStatus.message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                style={styles.input}
                required
              />
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your Username"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p style={styles.switchText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={styles.switchButton}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
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
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  inputFocus: {
    borderColor: "#007bff",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  submitButtonHover: {
    backgroundColor: "#0056b3",
  },
  switchText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#555",
  },
  switchButton: {
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "underline",
    marginLeft: "5px",
  },
};

export default LoginRegistration;

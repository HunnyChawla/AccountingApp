import { useNavigate } from "react-router-dom";

const logout = () => {
  // Clear stored tokens
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("tokenType");
  localStorage.removeItem("expiresIn");

//   // Redirect to login page
//   const navigate = useNavigate();
//   navigate("/logout");
};

export default logout;
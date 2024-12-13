export const isTokenExpired = () => {
    const expiresIn = localStorage.getItem("expiresIn");
    if (!expiresIn) return true; // No token stored
    return new Date().getTime() > parseInt(expiresIn, 10);
  };

export const fetchWithAuth = async (url, options = {}) => {
    if (isTokenExpired()) {
      localStorage.clear(); // Clear stored tokens
      window.location.href = "/login"; // Redirect to login
      return;
    }
  
    const token = localStorage.getItem("accessToken");
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  
    return fetch(url, { ...options, headers });
  };
  
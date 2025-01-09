import React, { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom";
import Alert from "./Alert";

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = ({ message, type = "info", duration = 3000 }) => {
    const id = Date.now(); // Unique ID for each alert
    setAlerts((prev) => [...prev, { id, message, type, duration }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, duration);
  };

  const value = {
    showAlert,
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      {ReactDOM.createPortal(
        <div className="alert-container">
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              message={alert.message}
              type={alert.type}
              duration={0}
              onClose={() =>
                setAlerts((prev) => prev.filter((item) => item.id !== alert.id))
              }
            />
          ))}
        </div>,
        document.body
      )}
    </AlertContext.Provider>
  );
};

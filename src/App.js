import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUpload from './components/FileUpload';
import Products from './components/Product';
import ProtectedRoute from './components/ProtectedRoute';
import LoginRegistration from './components/LoginRegistration';
import LogoutScreen from './components/LogoutScreen';
import { useSelector } from 'react-redux';
import Order365 from './components/Order365';
import NewDashboard from './components/NewDashboard';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Router>
    <div style={styles.app}>
      <Navbar />
      <div style={styles.layout}>
      <ProtectedRoute><Sidebar /></ProtectedRoute>
        <main style={styles.content}>
          <Routes>
            {/* <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/login" element={<LoginRegistration />} />
            <Route path="/logout" element={<LogoutScreen />} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/upload" element={<ProtectedRoute><FileUpload /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path="/order365" element={<ProtectedRoute><Order365 /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </div>
    </Router>
  );
};

const styles = {
  app: {
    fontFamily: "'Arial', sans-serif",
  },
  layout: {
    display: "flex",
  },
  content: {
    padding: "20px",
    flexGrow: 1,
  },
};

export default App;

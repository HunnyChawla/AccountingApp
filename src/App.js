import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUpload from './components/FileUpload';
import UpdateProductCost from './components/UpdateProductCost';
import Products from './components/Product';
import ProtectedRoute from './components/ProtectedRoute';
import LoginRegistration from './components/LoginRegistration';
import LogoutScreen from './components/LogoutScreen';

const App = () => {
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

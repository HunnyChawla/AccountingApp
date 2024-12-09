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

const App = () => {
  return (
    <Router>
    <div style={styles.app}>
      <Navbar />
      <div style={styles.layout}>
        <Sidebar />
        <main style={styles.content}>
          <h1>Welcome to the Seller Dashboard</h1>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/products" element={<Products />} />
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

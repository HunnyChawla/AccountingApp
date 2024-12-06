import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div style={styles.app}>
      <Navbar />
      <div style={styles.layout}>
        <Sidebar />
        <main style={styles.content}>
          <h1>Welcome to the Seller Dashboard</h1>
          <Dashboard></Dashboard>
        </main>
      </div>
    </div>
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

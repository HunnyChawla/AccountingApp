import React, { useRef } from 'react';
import { FaFileExcel } from 'react-icons/fa'; // Importing Excel icon from react-icons

const TemplateHandler = ({ onTemplateUpload, downloadTemplateUrl, onDownloadTemplate }) => {
  const fileInputRef = useRef();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onTemplateUpload(file); // Callback to handle the uploaded file
    }
    event.target.value = ''; // Reset the input to allow re-upload of the same file if needed
  };

  const handleDownloadClick = () => {
    onDownloadTemplate();
  };

  return (
    <div style={styles.container}>
      <button onClick={handleDownloadClick} style={styles.excelButton}>
        <FaFileExcel style={styles.icon} /> Download Template
      </button>
      <button onClick={handleUploadClick} style={styles.excelButton}>
        <FaFileExcel style={styles.icon} /> Upload Template
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  excelButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '8px',
    background: 'linear-gradient(45deg, #28a745, #218838, #1e7e34)', // Gradient for shiny green
    color: '#ffffff',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', // Subtle shadow
    transition: 'all 0.3s ease',
  },
  icon: {
    fontSize: '20px', // Size of the Excel icon
    color: '#ffffff',
  },
  excelButtonHover: {
    background: 'linear-gradient(45deg, #34ce57, #28a745, #1e7e34)', // Brighter gradient on hover
    transform: 'scale(1.05)', // Slight zoom on hover
    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.3)', // More shadow on hover
  },
};

// Apply hover effects using a mouse event
const addHoverEffects = (e) => {
  e.target.style.background = styles.excelButtonHover.background;
  e.target.style.transform = styles.excelButtonHover.transform;
  e.target.style.boxShadow = styles.excelButtonHover.boxShadow;
};

const removeHoverEffects = (e) => {
  e.target.style.background = styles.excelButton.background;
  e.target.style.transform = 'scale(1)';
  e.target.style.boxShadow = styles.excelButton.boxShadow;
};

// Attach hover effects dynamically
const attachHoverHandlers = (button) => {
  if (button) {
    button.addEventListener('mouseover', addHoverEffects);
    button.addEventListener('mouseout', removeHoverEffects);
  }
};

export default TemplateHandler;

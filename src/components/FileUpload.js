import React, { useState } from "react";
import { fetchWithAuth } from "../Util";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [fileType, setFileType] = useState("MEESHO_ORDER_DATA"); // Default file type
  const [uploadStatus, setUploadStatus] = useState(""); // Upload status message
  const [statusType, setStatusType] = useState(""); // "success" or "error" for styling

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select files to upload.");
      setStatusType("error");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file)); // Append files to FormData
    formData.append("fileType", fileType);

    try {
      const response = await fetchWithAuth("http://localhost:8080/api/excel/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();
      setUploadStatus("Files uploaded successfully!");
      setStatusType("success");
      console.log("Server response:", result);

      // Clear files after successful upload
      setFiles([]);
    } catch (error) {
      setUploadStatus("Failed to upload files.");
      setStatusType("error");
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Upload Data</h2>

      {/* File Type Selector */}
      <div style={styles.selector}>
        <label htmlFor="fileType">Select Data Type:</label>
        <select
          id="fileType"
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          style={styles.dropdown}
        >
          <option value="MEESHO_ORDER_DATA">Meesho Order Data</option>
          <option value="MEESHO_PAYMENTS_DATA">Meesho Payment Data</option>
          <option value="FLIPKART_ORDER_DATA">Flipkart Order Data</option>
          <option value="FLIPKART_PAYMENT_DATA">Flipkart Payment Data</option>
          <option value="AMAZON_ORDER_DATA">Amazon Order Data</option>
          <option value="AMAZON_PAYMENT_DATA">Amazon Payment Data</option>
        </select>
      </div>

      {/* Drag and Drop Area */}
      <div
        style={styles.dropZone}
        onDrop={(e) => {
          e.preventDefault();
          const droppedFiles = Array.from(e.dataTransfer.files);
          setFiles([...files, ...droppedFiles]);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        Drag and drop files here or
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={styles.fileInput}
        />
        <button style={styles.browseButton}>Browse</button>
      </div>

      {/* File Preview */}
      <div style={styles.filePreview}>
        {files.map((file, index) => (
          <div key={index} style={styles.fileItem}>
            <span>{file.name}</span>
            <button
              onClick={() => handleRemoveFile(index)}
              style={styles.removeButton}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <button onClick={handleUpload} style={styles.uploadButton}>
        Upload
      </button>
      {/* Upload Status */}
      {uploadStatus && (
        <p
          style={{
            ...styles.statusMessage,
            color: statusType === "success" ? "green" : "red",
          }}
        >
          {uploadStatus}
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    maxWidth: "600px",
    margin: "0 auto",
  },
  selector: {
    marginBottom: "20px",
  },
  dropdown: {
    marginLeft: "10px",
    padding: "5px",
    fontSize: "16px",
  },
  dropZone: {
    border: "2px dashed #ccc",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    position: "relative",
    color: "#666",
  },
  fileInput: {
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
  browseButton: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  filePreview: {
    marginTop: "20px",
    textAlign: "left",
  },
  fileItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  removeButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  uploadButton: {
    padding: "10px 20px",
    backgroundColor: "#28A745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  statusMessage: {
    marginTop: "20px",
    fontSize: "16px",
  },
};

export default FileUpload;

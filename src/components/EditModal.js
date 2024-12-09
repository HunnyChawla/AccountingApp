import React, { useState } from "react";

const EditModal = ({ show, onClose, onSave, data }) => {
  const [formState, setFormState] = useState({ ...data });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formState);
  };

  if (!show) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h2>Edit Product</h2>
        <label style={styles.label}>
          SKU:
          <input
            style={styles.input}
            name="sku"
            value={formState.sku}
            onChange={handleChange}
          />
        </label>
        <label style={styles.label}>
          Name:
          <input
            style={styles.input}
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
        </label>
        <label style={styles.label}>
          Cost:
          <input
            style={styles.input}
            name="cost"
            value={formState.cost}
            onChange={handleChange}
          />
        </label>
        <div style={styles.buttonContainer}>
          <button style={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button style={styles.saveButton} onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    maxWidth: "400px",
    width: "90%",
  },
  label: {
    marginBottom: "10px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  buttonContainer: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  cancelButton: {
    padding: "8px 15px",
    backgroundColor: "#ccc",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  saveButton: {
    padding: "8px 15px",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
  },
};

export default EditModal;

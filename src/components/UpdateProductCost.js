import React, { useState } from "react";

const UpdateProductCost = () => {
  const [skuId, setSkuId] = useState("");
  const [cost, setCost] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" or "error" for styling

  const handleUpdate = async () => {
    if (!skuId || !cost) {
      setUpdateStatus("SKU ID and Cost are required.");
      setStatusType("error");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/product/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skuId, cost }),
      });

      if (!response.ok) throw new Error("Failed to update product cost.");

      const result = await response.json();
      setUpdateStatus("Product cost updated successfully!");
      setStatusType("success");
      console.log("Server response:", result);

      // Clear input fields
      setSkuId("");
      setCost("");
    } catch (error) {
      setUpdateStatus("Failed to update product cost.");
      setStatusType("error");
      console.error("Error updating product cost:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Update Product Cost</h2>
      <div style={styles.formGroup}>
        <label htmlFor="skuId" style={styles.label}>
          SKU ID:
        </label>
        <input
          type="text"
          id="skuId"
          value={skuId}
          onChange={(e) => setSkuId(e.target.value)}
          style={styles.input}
          placeholder="Enter SKU ID"
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="cost" style={styles.label}>
          Cost:
        </label>
        <input
          type="number"
          id="cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          style={styles.input}
          placeholder="Enter Product Cost"
        />
      </div>
      <button onClick={handleUpdate} style={styles.updateButton}>
        Update Cost
      </button>
      {updateStatus && (
        <p
          style={{
            ...styles.statusMessage,
            color: statusType === "success" ? "green" : "red",
          }}
        >
          {updateStatus}
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    maxWidth: "400px",
    margin: "0 auto",
  },
  formGroup: {
    marginBottom: "20px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  updateButton: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
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

export default UpdateProductCost;

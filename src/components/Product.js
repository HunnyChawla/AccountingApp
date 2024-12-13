import React, { useState, useEffect } from "react";
import TableComponent from "./TableComponent";
import { fetchWithAuth } from "../Util";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ sku: "", name: "", cost: 0 });
  const [editProduct, setEditProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    // Fetch products data from the API
    fetchProducts();
    console.log("fetchProducts called")
  }, []);

  const fetchProducts = async () => {
    try {
      console.log("Calling fetchProducts");
      const response = await fetchWithAuth("http://localhost:8080/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Failed to add product");

      setNewProduct({ sku: "", name: "", cost: 0 });
      fetchProducts(); // Refresh products list
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${editProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editProduct),
      });

      if (!response.ok) throw new Error("Failed to update product");

      setShowEditModal(false);
      fetchProducts(); // Refresh products list
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Products Table */}
      <TableComponent
      tableData={products}
      showAddItemButton={true}
      handleAddAction={handleAddProduct}
      addButtonText={"Add Product"}
      showEditAction={true}
      handleEditAction={handleEditProduct}
      handleDeleteAction={null}
      tableHeaders={["SKU", "Product Name", "Cost"]}
    />
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },
  addProductForm: {
    marginBottom: "30px",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  tableContainer: {
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#f8f9fa",
  },
  tableCell: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  editButton: {
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  modal: {
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
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    textAlign: "center",
    width: "400px",
  },
  saveButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Products;

import React, { useState, useEffect } from "react";
import TableComponent from "./TableComponent";
import { fetchWithAuth } from "../Util";
import TemplateHandler from "./TemplateHandler";
import { useAlert } from "./AlertManager";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ sku: "", name: "", cost: 0 });
  const [editProduct, setEditProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    // Fetch products data from the API
    // fetchProducts();
    // console.log("fetchProducts called")
  }, []);

  const fetchProducts = async (page,size,searchData) => {
    try {
      if(searchData && searchData.inputValue) {
        return await fetchWithAuth(`http://localhost:8080/products/${searchData.inputValue}`);
      }
      return await fetchWithAuth(`http://localhost:8080/products?page=${page}&size=${size}`);
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

  const handleEditProduct = async (updatedProdct) => {
    try {
      const response = await fetchWithAuth(`http://localhost:8080/products`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProdct),
      });

      if (!response.ok) throw new Error("Failed to update product");
    //   alert("Product updated successfully!");
      return true;
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

    const handleUpload = async (file) => {
      if (!file) {
        alert("Please select files to upload.");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", file); // Append files to FormData
  
      try {
        const response = await fetchWithAuth("http://localhost:8087/api/product/upload", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          showAlert({
            message: "Something went wrong",
            type: "error",
          });
        };
  
        const result = await response.body;
        showAlert({
          message: "File Uploaded Successfully",
          type: "success",
        });
        
        console.log("Server response:", result);

      } catch (error) {
        console.error("Error uploading files:", error);
      }
    };

  return (
    <div style={styles.container}>
    <TemplateHandler
      downloadTemplateUrl={"/asset/Product_Template.xlsx"}
      onTemplateUpload={handleUpload}
    ></TemplateHandler>
      {/* Products Table */}
      <TableComponent
      fetchData={fetchProducts}
      isPagination={true}
      showAddItemButton={true}
      handleAddAction={handleAddProduct}
      addButtonText={"Add Product"}
      showEditAction={true}
      handleEditAction={handleEditProduct}
      handleDeleteAction={null}
      tableHeaders={["SKU", "Product Name", "Cost"]}
      searchMetaData={{
        inputPlaceholder: "SKU ID",
        showTextSearch: true
      }}
    />
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
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

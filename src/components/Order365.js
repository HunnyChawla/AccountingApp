import React, { useState, useEffect } from "react";
import TableComponent from "./TableComponent";
import { fetchWithAuth } from "../Util";
import SearchComponent from "./SearchComponent";

const Order365 = () => {
  const [completeOrderData, setCompleteOrderData] = useState([]);
  const dropdownOptions = [
    { label: "DELIVERED", value: "DELIVERED" },
    { label: "RETURN", value: "RETURN" },
    { label: "RTO_COMPLETE", value: "RTO_COMPLETE" },
  ];

  const handleSearch = (searchData) => {
    console.log("Search Data:", searchData);
  };

  useEffect(() => {
    // Fetch products data from the API
    // fetchCompleteOrderData();
  }, []);

  const fetchCompleteOrderData = async (page, size) => {
    try {
      return await fetchWithAuth(
        `${process.env.REACT_APP_ACCOUNT_APP_API_URL}/order365?page=${page}&size=${size}`
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Order 365 Table */}
      <TableComponent
        fetchData={fetchCompleteOrderData}
        isPagination={true}
        searchMetaData={{
          inputPlaceholder: "Order Id",
          showDropDown: true,
          showDateSearch: true,
          showTextSearch: true,
          dropdownOptions,
          datePlaceholder: "Order Date",
          dropdownPlaceHolder: "Status",
        }}
        tableHeaders={[
          "Order Id",
          "SKU Id",
          "Order Amount",
          "Bank Settlement",
          "Profit",
          "Order Date",
          "Order Status",
        ]}
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

export default Order365;

import React, { useState } from "react";
import TableComponent from "./TableComponent";

const Orders = () => {
  const [orders, setOrders] = useState([]); // Orders to display
  const [searchText, setSearchText] = useState(""); // Input value

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/orders/${searchText}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();

      setOrders(data);
      console.log(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]); // Clear data on error
    }
  };

  return (
    <div>
      <h2>Orders</h2>

      {/* Search Box + Search Button */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Enter Order ID"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={handleSearch} style={styles.searchButton}>
          Search
        </button>
      </div>

      {/* Orders Table */}
      <div style={styles.container}>
        <TableComponent
          tableData={orders}
          handleAddAction={null}
          handleEditAction={null}
          handleDeleteAction={null}
          tableHeaders={[
            "Order ID",
            "Date",
            "Order Status",
            "SKU ID",
            "Dispatch Date",
            "Quantity",
            "Amount",
            "Platform",
          ]}
        />
      </div>
    </div>
  );
};

const styles = {
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  searchInput: {
    padding: "10px",
    width: "300px",
    fontSize: "16px",
  },
  searchButton: {
    marginLeft: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  }
};

export default Orders;

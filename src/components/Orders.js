import React, { useState } from "react";

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
      console.log(orders)
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
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Order Status</th>
            <th>SKU ID</th>
            <th>Platform</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.orderDate}</td>
                <td>{order.orderStatus}</td>
                <td>{order.sku}</td>
                <td>{order.platform}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
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
  },
};

export default Orders;

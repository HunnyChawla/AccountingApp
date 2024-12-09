import React, { useState, useEffect } from "react";

const OrdersTable = ({ orders }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);

  useEffect(() => {
    // Filter orders based on search text or order date
    setFilteredOrders(
      orders.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
          order.date.includes(searchText) // Filter by date
      )
    );
  }, [searchText, orders]);

  return (
    <div>
      <h3>Orders Table</h3>

      {/* Search Input */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by Order ID or Date (YYYY-MM-DD)"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Orders Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.date}</td>
                <td>{order.customerName}</td>
                <td>{order.amount}</td>
                <td>{order.status}</td>
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
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
  },
  searchInput: {
    padding: "10px",
    width: "300px",
    fontSize: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    backgroundColor: "#f2f2f2",
    padding: "10px",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
  },
};

export default OrdersTable;

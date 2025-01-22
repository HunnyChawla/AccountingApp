import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

const OrdersTableWithChart = () => {
  // Initial chart data
  const initialChartData = {
    labels: ["Pending", "Shipped", "Delivered", "Cancelled"],
    datasets: [
      {
        label: "Order Status",
        data: [50, 100, 75, 25],
        backgroundColor: ["#f39c12", "#3498db", "#2ecc71", "#e74c3c"],
        hoverBackgroundColor: ["#d68910", "#2980b9", "#27ae60", "#c0392b"], // Hover colors
      },
    ],
  };

  const allTableData = [
    { orderId: 1, status: "Pending", customer: "John Doe" },
    { orderId: 2, status: "Shipped", customer: "Jane Smith" },
    { orderId: 3, status: "Delivered", customer: "Sam Green" },
    { orderId: 4, status: "Cancelled", customer: "Alice Brown" },
    { orderId: 5, status: "Shipped", customer: "Chris Lee" },
  ];

  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [chartData, setChartData] = useState(initialChartData);

  const handleChartClick = (event, elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const status = initialChartData.labels[clickedIndex];

      setSelectedStatuses((prevSelected) => {
        const isSelected = prevSelected.includes(status);

        // Add or remove the clicked status
        const updatedSelected = isSelected
          ? prevSelected.filter((s) => s !== status) // Deselect
          : [...prevSelected, status]; // Select

        // Update chart colors based on selected statuses
        const updatedBackgroundColors = initialChartData.datasets[0].backgroundColor.map(
          (color, index) =>
            updatedSelected.includes(initialChartData.labels[index])
              ? "#8e44ad" // Highlight selected
              : "rgba(200, 200, 200, 0.5)" // Dim others
        );

        setChartData({
          ...initialChartData,
          datasets: [
            {
              ...initialChartData.datasets[0],
              backgroundColor: updatedBackgroundColors,
            },
          ],
        });

        return updatedSelected;
      });
    }
  };

  const handleClearFilter = () => {
    setSelectedStatuses([]);
    setChartData(initialChartData); // Reset chart colors
  };

  const filteredData =
    selectedStatuses.length === 0
      ? allTableData
      : allTableData.filter((row) => selectedStatuses.includes(row.status));

  return (
    <div>
      <h2>Order Status Chart</h2>
      <Bar
        data={chartData}
        options={{
          onClick: handleChartClick,
          plugins: {
            legend: { display: true },
          },
        }}
      />
      <h3>Order Details</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Customer</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.orderId}>
              <td>{row.orderId}</td>
              <td>{row.status}</td>
              <td>{row.customer}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStatuses.length > 0 && (
        <button onClick={handleClearFilter}>Clear Filter</button>
      )}
    </div>
  );
};

export default OrdersTableWithChart;

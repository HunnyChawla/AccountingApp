import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const ChartOrdersCountByProduct = ({ data, title }) => {
  // Sample data for orders by product name
  // Sample data for orders by status
  const ordersByStatus = {
    "Product A": { Pending: 40, Shipped: 60, Delivered: 20 },
    "Product B": { Pending: 20, Shipped: 50, Delivered: 25 },
    "Product C": { Pending: 50, Shipped: 80, Delivered: 20 },
    "Product D": { Pending: 30, Shipped: 40, Delivered: 10 },
  };

  const [selectedProduct, setSelectedProduct] = useState(null);

  // Chart data for orders by product name
  const productChartData = {
    labels: data.map((product) => product.skuId),
    datasets: [
      {
        label: "Orders Count",
        data: data.map((product) => product.ordersCount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  // Chart data for orders by status for a selected product
  const statusChartData = selectedProduct
    ? {
        labels: Object.keys(ordersByStatus[selectedProduct]),
        datasets: [
          {
            label: `Orders by Status for ${selectedProduct}`,
            data: Object.values(ordersByStatus[selectedProduct]),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      }
    : null;

  // Handle click event on the first chart
  const handleProductClick = (event, elements) => {
    if (elements.length > 0) {
      const productIndex = elements[0].index;
      const productName = data[productIndex].skuId;
      setSelectedProduct(productName);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>{title}</h3>
      <Bar
        data={productChartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'SKU ID',
              },
              grid: {
                display: false,
              },
            },
            y: {
              title: {
                display: true,
                text: 'Order Count',
              },
              grid: {
                display: false,
              },
              ticks: {
                precision: 0,
            },
            },
          },
          onClick: handleProductClick,
        }}
      />

      {selectedProduct && (
        <>
          <h2>Orders Count by Status for {selectedProduct}</h2>
          <Pie
            data={statusChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "bottom" },
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default ChartOrdersCountByProduct;

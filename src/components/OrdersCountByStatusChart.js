import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrdersCountByStatusChart = ({ data }) => {
  // Prepare the chart data
  const chartData = {
    labels: data.map((item) => item.orderStatus),
    datasets: [
      {
        label: "Orders",
        data: data.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Light green
      }
    ],
  };

  // Chart options
  const options = {
    responsive: true, // Ensures the chart resizes dynamically
    maintainAspectRatio: false, // Allows custom height and width
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "45%", height: "300px", margin: "10px" }}>
      <h3>Order Count By Status</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default OrdersCountByStatusChart;

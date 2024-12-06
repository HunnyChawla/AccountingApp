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

const ProfitLossChart = ({ data }) => {
  // Prepare the chart data
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Profit",
        data: data.map((item) => item.profit),
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Light green
      },
      {
        label: "Loss",
        data: data.map((item) => item.loss),
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Light red
      },
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
      <h3>Profit/Loss Overview</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ProfitLossChart;

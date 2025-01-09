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

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProfitLossChart = () => {
  // Sample data
  const data = {
    labels: ["January", "February", "March", "April"], // X-axis labels
    datasets: [
      {
        label: "Profit",
        data: [5000, 7000, 8000, 6000], // Profit data
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color for Profit
        borderWidth: 0, // No border
      },
      {
        label: "Loss",
        data: [2000, 3000, 2500, 4000], // Loss data
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Bar color for Loss
        borderWidth: 0, // No border
      },
      {
        label: "Net Profit",
        data: [3000, 4000, 5500, 2000], // Net Profit data
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Bar color for Net Profit
        borderWidth: 0, // No border
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Position of the legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let value = context.raw;
            return `${context.dataset.label}: $${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months", // Label for X-axis
        },
        stacked: false, // Disable stacking for clustered bars
      },
      y: {
        title: {
          display: true,
          text: "Amount (in USD)", // Label for Y-axis
        },
        beginAtZero: true, // Ensure Y-axis starts at zero
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ProfitLossChart;

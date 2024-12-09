import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";

// Register the required components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const OrdersChart = ({ data }) => {
  const [filter, setFilter] = useState("day"); // Default filter: daily view

  // Helper function to aggregate orders
  const aggregateData = (data, interval) => {
    const grouped = data.reduce((acc, item) => {
      const period = moment(item.date).startOf(interval).format("YYYY-MM-DD");
      acc[period] = (acc[period] || 0) + item.orders;
      return acc;
    }, {});

    return Object.entries(grouped).map(([date, orders]) => ({ date, orders }));
  };

  // Filtered data based on user selection
  const filteredData = aggregateData(data, filter);

  // Prepare chart data
  const chartData = {
    labels: filteredData.map((item) => item.date),
    datasets: [
      {
        label: `Orders by ${filter}`,
        data: filteredData.map((item) => item.orders),
        borderColor: "rgba(54, 162, 235, 0.8)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
    <div style={{ width: "45%", height: "350px", margin: "10px" }}>
      <h3>Orders Overview</h3>
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="filter">View By: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default OrdersChart;

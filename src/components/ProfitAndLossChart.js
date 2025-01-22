import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProfitLossChart = ({ data }) => {
  // Extract labels (month/year) and datasets
  const labels = data.map(
    (item) => `${item.month}/${item.year}`
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Profit',
        data: data.map((item) => item.totalProfit),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Total Loss',
        data: data.map((item) => item.totalLoss),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Net Profit',
        data: data.map((item) => item.totalProfit + item.totalLoss),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Profit/Loss and Net Profit',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month/Year',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount(₹)',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ProfitLossChart;

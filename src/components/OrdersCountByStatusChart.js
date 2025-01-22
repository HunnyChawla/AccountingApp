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
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderStatusChart = ({ data }) => {
  // Extract labels (orderStatus) and datasets
  const { month, year } = useSelector((state) => state.userInput);
  const labels = [month+"/"+year];

  const chartData = {
    labels,
    datasets: data.map((item) => ({
      label: item.orderStatus,
      data: [item.count],
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Orders Count By Status',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Order Status',
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
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default OrderStatusChart;

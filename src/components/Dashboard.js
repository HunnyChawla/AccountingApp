import React from "react";
import ProfitLossCard from "./ProfitLossCard";
import OrdersChart from "./OrdersChart";
import ProfitLossChart from "./ProfitLossChart";

const Dashboard = () => {
  const profit = 5000; // Example data
  const loss = 1500;
  const ordersData = [
    { date: "2024-12-01", orders: 20 },
    { date: "2024-12-02", orders: 15 },
    { date: "2024-12-03", orders: 30 },
    { date: "2024-12-04", orders: 25 },
    { date: "2024-12-05", orders: 35 },
  ];

  const profitLossData = [
    { date: "2024-12-01", profit: 2000, loss: 500 },
    { date: "2024-12-02", profit: 2500, loss: 300 },
    { date: "2024-12-03", profit: 1500, loss: 800 },
    { date: "2024-12-04", profit: 3000, loss: 1000 },
  ];

  // Calculate total profit and loss
  const totalProfit = profitLossData.reduce((sum, item) => sum + item.profit, 0);
  const totalLoss = profitLossData.reduce((sum, item) => sum + item.loss, 0);

  return (
    <div>
      <h1>Seller Dashboard</h1>
      <div style={styles.chartContainer}>
      <ProfitLossCard profit={totalProfit} loss={totalLoss} />
        <OrdersChart data={ordersData} />
        <ProfitLossChart data={profitLossData} />
      </div>
      {/* Add more analytics components */}
    </div>
  );
};

const styles = {
    chartContainer: {
      display: "flex", // Arrange charts side by side
      flexWrap: "wrap", // Allow charts to wrap to the next row
      justifyContent: "space-between", // Add space between charts
      padding: "10px",
    },
  };
  

export default Dashboard;

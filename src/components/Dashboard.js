import React, { useEffect, useState } from "react";
import ProfitLossCard from "./ProfitLossCard";
import OrdersChart from "./OrdersChart";
import OrdersCountByStatusChart from "./OrdersCountByStatusChart";
import { fetchWithAuth } from "../Util";
import ProfitLossChart from "./ProfitAndLossChart";
import SearchComponent from "./SearchComponent";
import Card from "./Card";
import Layout from "./Layout";
import DashboardTile from "./DashboardTile";
import { FcSalesPerformance } from "react-icons/fc";

const Dashboard = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Current month (1-based)
  const [year, setYear] = useState(new Date().getFullYear()); // Current year
  const [orderCountData, setOrderCountData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);


  const fetchOrderCountData = async () => {
    const response = await fetchWithAuth(
      `http://localhost:8080/orders/countByOrderStatus`
    );

    if (!response.ok) throw new Error("Failed to fetch orders data");

    const data = await response.json();
    setOrderCountData(data);
  };

  const fetchDashboardMetrics = async () => {
    const response = await fetchWithAuth(
      `http://localhost:8087/dashboard-metrics?month=${month}&year=${year}`
    );

    if (!response.ok) {
      return;
    };

    const data = await response.json();
    setTotalOrders(data.totalOrders);
    setTotalLoss(data.totalLoss);
    setTotalProfit(data.totalProfit);
    setTotalPayments(data.totalPayments);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        // Construct API URL with query parameters
        const response = await fetchWithAuth(
          `http://localhost:8080/orders?month=${month}&year=${year}`
        );

        if (!response.ok) throw new Error("Failed to fetch orders data");

        const data = await response.json();

        // Transform API data if necessary
        const formattedData = data.ordersData.map((item) => ({
          date: item.date,
          orders: item.orders,
        }));
        console.log(formattedData);
        setOrdersData(formattedData);
      } catch (error) {
        console.error("Error fetching orders data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    fetchOrderCountData();
    fetchDashboardMetrics();
  }, [month, year]); // Re-fetch when month or year changes

  if (loading) return <p>Loading...</p>;

  // useEffect(() => {

  // },[]);

  const OrdersCountByStatusData = [
    { date: "2024-12-01", profit: 2000, loss: 500 },
    { date: "2024-12-02", profit: 2500, loss: 300 },
    { date: "2024-12-03", profit: 1500, loss: 800 },
    { date: "2024-12-04", profit: 3000, loss: 1000 },
  ];


  const handleAction = (id) => {
    alert(`Action triggered for card ${id}`);
  };

  return (
    <div>
      <h1>Seller Dashboard</h1>
      <div style={styles.filters}>
        <label>
          Month:
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            {[...Array(12).keys()].map((m) => (
              <option key={m + 1} value={m + 1}>
                {new Date(0, m).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </label>
        <label>
          Year:
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {[2023, 2024, 2025].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Layout rows={1} columns={5}>
        <DashboardTile title="Total Orders" value={totalOrders} color="#ff6347" />
        <DashboardTile title="Net Profit" value={totalProfit+totalLoss} color="#4caf50" customIcon={<FcSalesPerformance size="3em"></FcSalesPerformance>} />
        <DashboardTile title="Total Payments" value={totalPayments} color="#2196f3" />
        <DashboardTile title="Total Profit" value={totalProfit} color="#ff9800" />
        <DashboardTile title="Total Loss" value={totalLoss} color="#f44336" />
      </Layout>
      <Layout rows={3} columns={1}>
        <Layout rows={1} columns={1}>
          <OrdersChart data={ordersData} />
        </Layout>
        <Layout rows={1} columns={1}>
          <OrdersCountByStatusChart data={orderCountData} />
        </Layout>
        <Layout rows={1} columns={1}>
          {/* <ProfitLossChart /> */}
        </Layout>
      </Layout>
    </div>
  );
};

const styles = {
  // chartContainer: {
  //   display: "flex", // Arrange charts side by side
  //   flexWrap: "wrap", // Allow charts to wrap to the next row
  //   justifyContent: "space-between", // Add space between charts
  //   padding: "20px",
  // },
};

export default Dashboard;

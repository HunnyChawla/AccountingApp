import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../Util";
import Layout from "./Layout";
import DashboardTile from "./DashboardTile";
import { FcSalesPerformance } from "react-icons/fc";
import OrderCountStatusChartContainer from "./OrdersCountStatusChartContainer";
import OrdersChartConatiner from "./OrdersChart/OrdersChartContainer";
import { setMonth, setYear } from "../Store/slice/UserInputSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardMetricsByYear, fetchDashboardMetricsByMonth } from "../Store/slice/dashboardMetricsSlice";
import ProfitLossChart from "./ProfitAndLossChart";
import ChartOrdersCountByProduct from "./OrdersChart/ChartOrdersCountByProduct";
import { fetchTopSellingProducts } from "../Store/slice/ordersCountByProductsSlice";
import { fetchLeastSellingProducts } from "../Store/slice/leastSellingProductsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { month, year } = useSelector((state) => state.userInput);
  const { totalOrders, totalPayments, totalLoss, totalProfit,netProfit, loading, error, yearData } =
    useSelector((state) => state.dashboardMetrics);
  
  const { topSellingProductsData, topSellingProductsLoading, topSellingProductsError } = useSelector((state) => state.topSellingProducts);
  const leastSellingProdcuts = useSelector((state) => state.leastSellingProducts);

  useEffect(() => {
    dispatch(fetchDashboardMetricsByYear());
    dispatch(fetchDashboardMetricsByMonth(month));
    dispatch(fetchTopSellingProducts());
    dispatch(fetchLeastSellingProducts());
  }, [month,year]); // Re-fetch when month or year changes

  return (
    <div>
      <h1>Seller Dashboard</h1>
      <div>
        <label>
          Month:
          <select
            value={month}
            onChange={(e) => dispatch(setMonth(Number(e.target.value)))}
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
            onChange={(e) => dispatch(setYear(Number(e.target.value)))}
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
        <DashboardTile
          title="Total Orders"
          value={totalOrders}
          color="#ff6347"
        />
        <DashboardTile
          title="Net Profit"
          value={netProfit}
          color="#4caf50"
          customIcon={<FcSalesPerformance size="3em"></FcSalesPerformance>}
        />
        <DashboardTile
          title="Total Payments"
          value={totalPayments}
          color="#2196f3"
        />
        <DashboardTile
          title="Total Profit"
          value={totalProfit}
          color="#ff9800"
        />
        <DashboardTile title="Total Loss" value={totalLoss} color="#f44336" />
      </Layout>
      <Layout rows={3} columns={1}>
        <Layout rows={1} columns={1}>
          <OrdersChartConatiner />
        </Layout>
        <Layout rows={1} columns={2}>
          <OrderCountStatusChartContainer />
          <ProfitLossChart data={yearData}></ProfitLossChart>
        </Layout>
        <Layout rows={1} columns={2}>
          {/* <OrdersTableWithChart></OrdersTableWithChart> */}
          {!topSellingProductsLoading && (<ChartOrdersCountByProduct data={topSellingProductsData} title={"Top Selling Products"}></ChartOrdersCountByProduct>)}
          <ChartOrdersCountByProduct data={leastSellingProdcuts.leastSellingProductsData} title={"Least Selling Products"}></ChartOrdersCountByProduct>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;

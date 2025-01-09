import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import moment from "moment";

const OrdersChart = ({ data }) => {
  const [filter, setFilter] = useState("day"); // Default filter: daily view

  useEffect(() => {
    const chartDom = document.getElementById("orders-chart");
    const myChart = echarts.init(chartDom);

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

    // Prepare chart options
    const option = {
      title: {
        text: `Orders by ${filter}`,
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: filteredData.map((item) => item.date),
        boundaryGap: false,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Orders",
          type: "line",
          data: filteredData.map((item) => item.orders),
          areaStyle: {},
          smooth: true,
        },
      ],
    };

    // Set the chart options
    myChart.setOption(option);

    // Cleanup on component unmount
    return () => {
      myChart.dispose();
    };
  }, [data, filter]);

  return (
    <div>
      <h3>Orders Overview</h3>
      <div>
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
      <div id="orders-chart" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default OrdersChart;

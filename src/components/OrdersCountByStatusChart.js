import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import "./OrdersCountByStatusChart.css"; // Import a CSS file for styling

const OrdersCountByStatusChart = ({ data }) => {
  const [visibleCategories, setVisibleCategories] = useState(data.map((item) => item.orderStatus));

  useEffect(() => {
    const chartDom = document.getElementById("orders-status-chart");
    const myChart = echarts.init(chartDom);

    const filteredData = data.filter((item) => visibleCategories.includes(item.orderStatus));

    // Prepare the chart options
    const option = {
      title: {
        text: "Order Count By Status",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      xAxis: {
        type: "category",
        data: filteredData.map((item) => item.orderStatus),
        axisLabel: {
          rotate: 45, // Rotate labels for better visibility
          interval: 0, // Show all labels
        },
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Orders",
          type: "bar",
          data: filteredData.map((item) => item.count),
          itemStyle: {
            color: (params) => {
              const colors = [
                "#5470C6",
                "#91CC75",
                "#EE6666",
                "#FAC858",
                "#73C0DE",
                "#3BA272",
                "#FC8452",
                "#9A60B4",
                "#EA7CCC",
              ];
              return colors[params.dataIndex % colors.length];
            },
          },
        },
      ],
    };

    // Set the chart options
    myChart.setOption(option);

    // Cleanup on component unmount
    return () => {
      myChart.dispose();
    };
  }, [data, visibleCategories]);

  const toggleCategory = (category) => {
    setVisibleCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  return (
    <div>
      <h3>Order Count By Status</h3>
      <div className="checkbox-container" style={{ marginBottom: "10px" }}>
        {data.map((item) => (
          <label
            key={item.orderStatus}
            className={`custom-checkbox ${
              visibleCategories.includes(item.orderStatus) ? "checked" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={visibleCategories.includes(item.orderStatus)}
              onChange={() => toggleCategory(item.orderStatus)}
            />
            <span className="checkbox-label">{item.orderStatus}</span>
          </label>
        ))}
      </div>
      <div id="orders-status-chart" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default OrdersCountByStatusChart;

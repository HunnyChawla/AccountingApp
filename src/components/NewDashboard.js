import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function NewDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your API or data source
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data'); // Replace with your API endpoint
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Top Cards with Key Metrics */}
      <div className="cards-container">
        <Card title="Users" value="26K" percentage="-12.4%" />
        <Card title="Income" value="$6,200" percentage="+40.9%" />
        <Card title="Conversion Rate" value="2.49%" percentage="+84.7%" />
        <Card title="Sessions" value="44K" percentage="-23.6%" />
      </div>

      {/* Line Chart */}
      <div className="chart-container">
        <h2>Traffic</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Card({ title, value, percentage }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{value}</p>
      <span className={percentage > 0 ? 'positive' : 'negative'}>
        {percentage}%
      </span>
    </div>
  );
}

export default NewDashboard;
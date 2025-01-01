import React, { useState, useEffect } from "react";
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
import { fetchWithAuth } from "../Util";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProfitLossChart = () => {
    const [chartData, setChartData] = useState(null); // Initially null
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        // Simulate fetching data from the API
        const fetchData = async () => {
            try {

                const response =  await fetchWithAuth(`http://localhost:8087/api/profitAndLossByMonth`);
                    
                            if (!response.ok) throw new Error("Failed to fetch orders data");
                    
                            const apiResponse = await response.json();
                // Mock API response
                // const apiResponse = [
                //     { month: 11, year: 2024, profitAndLoss: 7436.29 },
                //     { month: 12, year: 2024, profitAndLoss: 4353.70 },
                // ];

                // Ensure apiResponse is an array
                if (!Array.isArray(apiResponse)) {
                    throw new Error("API response is not an array");
                }

                const labels = apiResponse.map(item => `${item.month}/${item.year}`);
                const data = apiResponse.map(item => item.profitAndLoss);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Profit and Loss",
                            data,
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                    ],
                });

                setChartOptions({
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top",
                        },
                        title: {
                            display: true,
                            text: "Monthly Profit and Loss",
                        },
                    },
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    if (!chartData) {
        return <p>Loading...</p>; // Handle loading state
    }

    return (
        <div>
            <h2>Profit and Loss Chart</h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default ProfitLossChart;

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const BloodGroupPieChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchBloodGroupCounts = async () => {
            try {
                const response = await axios.get('https://blood-donor-8q2v.onrender.com/api/blood-group-counts');
                const data = response.data;

                // Process data for Pie chart
                const labels = data.map(item => item._id);
                const counts = data.map(item => item.count);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Blood Group Count',
                            data: counts,
                            backgroundColor: [
                                '#D32F2F', '#C2185B', '#7B1FA2', '#512DA8',
                                '#303F9F', '#1976D2', '#0097A7', '#00796B'
                            ],
                            borderColor: '#fff',
                            borderWidth: 2,
                            hoverOffset: 8
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching blood group counts:', error);
            }
        };

        fetchBloodGroupCounts();
    }, []);

    return (
        <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-red-700 mb-4">
                🔴 Blood Group Distribution
            </h2>
            <div className="w-64 h-64">
                {chartData ? <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} /> : <p>Loading...</p>}
            </div>
            <p className="text-gray-600 mt-4 text-sm">
                Every drop counts. Donate blood, save lives! ❤️
            </p>
        </div>
    );
};

export default BloodGroupPieChart;



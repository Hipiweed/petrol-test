'use client';

import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function AveragePricePieChart() {
  const pieData = {
    labels: ['Diesel', 'Petrol'],
    datasets: [
      {
        data: [1.24, 1.34], // average prices
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(53, 162, 235)'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Pie data={pieData} options={options} />;
}

export default AveragePricePieChart;

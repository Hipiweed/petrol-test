'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Gas price chart',
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || '';

          if (context.parsed.y !== null) {
            label += ': €' + context.parsed.y.toFixed(2);
          }

          return label;
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value: number) {
          return '€' + value.toFixed(2);
        },
      },
    },
  },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Diesel',
      data: [1.23, 1.25, 1.22, 1.23, 1.24, 1.26, 1.25],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Petrol',
      data: [1.33, 1.35, 1.32, 1.33, 1.34, 1.36, 1.35],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function GasPriceChart() {
  return <Line options={options} data={data} />;
}

export default GasPriceChart;

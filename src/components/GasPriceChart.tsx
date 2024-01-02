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
import { gasChartData } from '../utils/chart';

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

function GasPriceChart() {
  return <Line options={options} data={gasChartData} />;
}

export default GasPriceChart;

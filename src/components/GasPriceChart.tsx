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
import { gasChartOptions, gasChartData } from '../../public/utils/chart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function GasPriceChart() {
  return <Line options={gasChartOptions} data={gasChartData} />;
}

export default GasPriceChart;

'use client';

import { Pie } from 'react-chartjs-2';
import { optionsPieChart, pieData } from '@/utils/chart';
import 'chart.js/auto';

function AveragePricePieChart() {
  return <Pie data={pieData} options={optionsPieChart} />;
}

export default AveragePricePieChart;

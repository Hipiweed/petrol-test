export const statistics = {
  averageDieselPrice: 1.24,
  averagePetrolPrice: 1.34,
  highestDieselPrice: 1.26,
  highestPetrolPrice: 1.36,
  lowestDieselPrice: 1.22,
  lowestPetrolPrice: 1.32,
};

export const optionsPieChart = {
  responsive: true,
  maintainAspectRatio: false,
};

export const gasChartOptions = {
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
        label: function (context: any) {
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

export const pieData = {
  labels: ['Diesel', 'Petrol'],
  datasets: [
    {
      data: [1.24, 1.34], // average prices
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(53, 162, 235)'],
    },
  ],
};

export const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
];

export const gasChartData = {
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

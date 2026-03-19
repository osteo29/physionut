import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ResultBarChart({
  labels,
  values,
  datasetLabel,
}: {
  labels: string[];
  values: number[];
  datasetLabel: string;
}) {
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: datasetLabel,
            data: values,
            backgroundColor: ['#3B82F6', '#10B981'],
            borderRadius: 8,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {display: false},
        },
        scales: {
          y: {beginAtZero: true, grid: {display: false}},
          x: {grid: {display: false}},
        },
      }}
    />
  );
}

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function TrackingLineChart({
  labels,
  values,
  datasetLabel,
}: {
  labels: string[];
  values: number[];
  datasetLabel: string;
}) {
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: datasetLabel,
            data: values,
            borderColor: '#315f4a',
            backgroundColor: 'rgba(49,95,74,0.18)',
            tension: 0.35,
            fill: true,
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
          y: {beginAtZero: false},
        },
      }}
    />
  );
}

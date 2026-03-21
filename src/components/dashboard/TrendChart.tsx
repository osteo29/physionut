import {
  Chart as ChartJS,
  CategoryScale,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import type {MutableRefObject} from 'react';
import {Line} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

type TrendChartProps = {
  chartRef: MutableRefObject<any>;
  lineData: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: Array<number | null>;
      borderColor: string;
      backgroundColor: string;
      tension: number;
      fill: boolean;
    }>;
  };
};

export default function TrendChart({chartRef, lineData}: TrendChartProps) {
  return (
    <div className="h-[320px]">
      <Line
        ref={chartRef}
        data={lineData}
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
    </div>
  );
}

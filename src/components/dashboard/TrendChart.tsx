import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import type {MutableRefObject} from 'react';
import {Line} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

type TrendChartProps = {
  chartRef: MutableRefObject<any>;
  isAr: boolean;
  metricLabel: string;
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

export default function TrendChart({chartRef, isAr, lineData, metricLabel}: TrendChartProps) {
  return (
    <div className="h-[320px] rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
      <Line
        ref={chartRef}
        data={lineData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            intersect: false,
            mode: 'index',
          },
          plugins: {
            legend: {display: false},
            tooltip: {
              backgroundColor: '#16382c',
              padding: 12,
              displayColors: false,
              callbacks: {
                title: (items) => items[0]?.label || '',
                label: (item) => `${metricLabel}: ${item.formattedValue}`,
              },
            },
          },
          elements: {
            line: {
              borderWidth: 3,
            },
            point: {
              radius: lineData.labels.length > 10 ? 2 : 4,
              hoverRadius: 6,
              backgroundColor: '#315f4a',
              borderColor: '#ffffff',
              borderWidth: 2,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: '#64748b',
                maxRotation: 0,
                autoSkip: true,
              },
            },
            y: {
              grace: '8%',
              grid: {
                color: 'rgba(148, 163, 184, 0.15)',
              },
              ticks: {
                color: '#64748b',
              },
            },
          },
          locale: isAr ? 'ar-EG' : 'en-US',
        }}
      />
    </div>
  );
}

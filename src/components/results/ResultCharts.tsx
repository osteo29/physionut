import {motion} from 'motion/react';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import {Bar, Pie} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

type ResultChartsProps = {
  activeCalculator: 'Macros' | 'Deficit';
  lang: 'en' | 'ar';
  pace?: number;
  result: any;
  t: any;
};

export default function ResultCharts({activeCalculator, lang, pace, result, t}: ResultChartsProps) {
  if (activeCalculator === 'Macros') {
    return (
      <div className="mx-auto max-w-[250px]">
        <Pie
          data={{
            labels: [t.charts.protein, t.charts.carbs, t.charts.fats],
            datasets: [
              {
                data: [result.protein * 4, result.carbs * 4, result.fats * 9],
                backgroundColor: ['#10B981', '#3B82F6', '#F97316'],
                borderWidth: 0,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {position: 'bottom'},
            },
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="mx-auto mb-8 h-[200px] max-w-[400px]">
        <Bar
          data={{
            labels: [t.charts.maintenance, t.charts.deficit],
            datasets: [
              {
                label: t.forms.calories,
                data: [result.tdee, result.deficit],
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
      </div>

      <div className="mx-auto max-w-[400px]">
        <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
          <span>{t.charts.deficit}</span>
          <span>{Math.round((result.deficit / result.tdee) * 100)}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full border border-slate-200 bg-slate-100">
          <motion.div
            animate={{width: `${(result.deficit / result.tdee) * 100}%`}}
            initial={{width: 0}}
            className="h-full bg-health-green"
          />
        </div>
      </div>

      {result.warning ? (
        <div className="flex items-center justify-center gap-2 rounded-xl bg-amber-50 p-3 text-sm font-bold text-amber-700">
          {pace && pace >= 1000 ? t.results.aggressiveWarning : t.results.warning}
        </div>
      ) : null}
    </div>
  );
}

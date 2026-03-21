import {Trash2} from 'lucide-react';
import type {AssessmentRecord} from '../../lib/supabase';

type TimelineLogProps = {
  isAr: boolean;
  records: AssessmentRecord[];
  onDelete: (id: string) => void;
};

export default function TimelineLog({isAr, records, onDelete}: TimelineLogProps) {
  if (records.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
        {isAr ? 'لا توجد سجلات محفوظة حتى الآن.' : 'No saved assessment records yet.'}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {records.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <div className="font-bold text-slate-900">{item.calculator_type}</div>
            <div className="mt-1 text-sm text-slate-600">
              {item.value_label}
              {item.value_unit ? ` ${item.value_unit}` : ''}
            </div>
            <div className="mt-2 text-xs text-slate-400">
              {new Date(item.created_at).toLocaleString(isAr ? 'ar-EG' : 'en-US')}
            </div>
          </div>
          <button
            onClick={() => onDelete(item.id)}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2 font-semibold text-rose-600 transition-all hover:bg-rose-50"
          >
            <Trash2 className="h-4 w-4" />
            <span>{isAr ? 'حذف' : 'Delete'}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

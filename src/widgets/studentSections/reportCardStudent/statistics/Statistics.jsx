import { useDispatch } from 'react-redux';
import { ReportTableStatistic } from '../../../../entities/reportTableTabs';
import './statistics.scss';
import { progressGet } from '../../../../app/store/student/progress/progressThunks';
import { useProgress } from '../../../../app/store/student/progress/progressSlice';
import { useEffect, useMemo } from 'react';

function parseISO(dateStr) {
  // на входе строки вида "2025-09-28T14:44:13+06:00"
  // new Date корректно парсит ISO со смещением
  const d = new Date(dateStr);
  return isNaN(d) ? null : d;
}

function pct(n) {
  if (!isFinite(n) || isNaN(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

function computeStats(rows, now = new Date()) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return {
      month: { perf: 0, attend: 0, count: 0 },
      all: { perf: 0, attend: 0, count: 0 },
    };
  }

  const year = now.getFullYear();
  const monthIdx = now.getMonth();

  const withParsed = rows
    .map(r => {
      const d = parseISO(r.date);
      return { ...r, _date: d };
    })
    .filter(r => r._date !== null);

  const inMonth = withParsed.filter(r => {
    const d = r._date;
    return d.getFullYear() === year && d.getMonth() === monthIdx;
  });

  const calc = arr => {
    const total = arr.length || 0;

    const present = arr.filter(r => String(r.attendance_status) === '1').length;
    const attendPct = total ? (present / total) * 100 : 0;

    const scores = arr.map(r =>
      typeof r.homework_score === 'number' ? r.homework_score : 0
    );
    const sum = scores.reduce((a, b) => a + b, 0);
    const perfPct = total ? (sum / (total * 10)) * 100 : 0;

    return {
      perf: pct(perfPct),
      attend: pct(attendPct),
      count: total,
    };
  };

  return {
    month: calc(inMonth),
    all: calc(withParsed),
  };
}

export const Statistics = () => {
  const dispatch = useDispatch();
  const { progress = [] } = useProgress();

  useEffect(() => {
    dispatch(progressGet());
  }, [dispatch]);

  const { month, all } = useMemo(() => computeStats(progress), [progress]);

  return (
    <section className='statistics'>
      <ReportTableStatistic
        monthPerf={month.perf}
        monthAttend={month.attend}
        monthCount={month.count}
        allPerf={all.perf}
        allAttend={all.attend}
        allCount={all.count}
      />
    </section>
  );
};

// utils/reportStats.js
const isPresent = status =>
  status === '1' || status === 1 || status === 'online';

const capScore = v => {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(10, n));
};

// Возвращает набор месяцев, встречающихся в attendances/homework_scores
export const collectMonths = (students = []) => {
  const set = new Set();
  for (const s of students) {
    s?.attendances?.forEach(
      a => Number.isFinite(a?.month_number) && set.add(a.month_number)
    );
    s?.homework_scores?.forEach(
      h => Number.isFinite(h?.month_number) && set.add(h.month_number)
    );
  }
  return [...set].sort((a, b) => a - b);
};

// Подсчёт посещаемости (в процентах) и количества уроков
export const calcAttendance = (students = [], month = null) => {
  // собираем множество уроков (lesson) для корректного подсчёта количества занятий
  const lessonsSet = new Set();
  let presentSum = 0;
  let totalMarks = 0;

  for (const s of students) {
    const items = (s?.attendances || []).filter(
      a => month == null || a.month_number === month
    );
    items.forEach(a => lessonsSet.add(a.lesson));
    presentSum += items.reduce(
      (acc, a) => acc + (isPresent(a.status) ? 1 : 0),
      0
    );
    totalMarks += items.length;
  }

  const lessonCount = lessonsSet.size; // кол-во уникальных уроков в группе за период
  const pct = totalMarks > 0 ? (presentSum / totalMarks) * 100 : 0;

  return { pct, lessonCount };
};

// Подсчёт успеваемости по домашним (в процентах)
export const calcPerformance = (students = [], month = null) => {
  let scoreSum = 0;
  let scoreMax = 0;

  for (const s of students) {
    const items = (s?.homework_scores || []).filter(
      h => month == null || h.month_number === month
    );
    for (const h of items) {
      const sc = capScore(h?.score);
      scoreSum += sc;
      scoreMax += 10; // максимум за каждую работу = 10
    }
  }

  const pct = scoreMax > 0 ? (scoreSum / scoreMax) * 100 : 0;
  return { pct };
};

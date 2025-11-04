import { useDispatch } from 'react-redux';
import { UniversalTable } from '../../../../entities';
import './reportStudent.scss';
import { useEffect, useMemo } from 'react';
import {
  discountGet,
  progressGet,
} from '../../../../app/store/student/progress/progressThunks';
import { useProgress } from '../../../../app/store/student/progress/progressSlice';
import {
  setSelectedMonth,
  setStudentAvailableMonths,
  useSelectedMonth,
} from '../../../../app/store/reducers/tabSlice';

const statusToDisplay = v => {
  if (v === '-' || v === '0' || v === 0 || v == null) return String(v ?? '-');
  if (v === '1' || v === 1) return '1';
  const s = String(v).trim().toLowerCase();
  return s === 'онлайн' ? 'онлайн' : '-';
};

const statusToPoint = v => {
  const s = statusToDisplay(v);
  return s === '1' || s === 'онлайн' ? 1 : 0;
};

const toNum = v => (Number.isFinite(Number(v)) ? Number(v) : 0);

const parseISO = s => {
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
};

const buildLessonColumns = count => {
  const cols = [
    { title: '', dataIndex: 'course', key: 'course', fixed: 'left' },
  ];
  for (let i = 1; i <= count; i++) {
    cols.push({
      title: `Урок №${i}`,
      dataIndex: `lesson${i}`,
      key: `lesson${i}`,
    });
  }
  cols.push({ title: '=', dataIndex: 'result', key: 'result' });
  return cols;
};

export const ReportStudent = () => {
  const dispatch = useDispatch();
  const { progress = [], discount } = useProgress();
  const selectedMonth = useSelectedMonth();
  // console.log(progress.filter(item => item.month_title === 'Месяц 2'));
  useEffect(() => {
    dispatch(progressGet());
    dispatch(discountGet());
  }, [dispatch]);

  // Извлекаем уникальные месяцы из progress
  const availableMonths = useMemo(() => {
    const monthMap = new Map();
    for (const item of progress) {
      const monthNumber = Number(item?.month_number);
      const monthTitle = item?.month_title;
      if (Number.isFinite(monthNumber) && monthNumber > 0) {
        // Группируем только по month_number, чтобы избежать дубликатов
        if (!monthMap.has(monthNumber)) {
          monthMap.set(monthNumber, {
            id: monthNumber,
            month_number: monthNumber,
            title: monthTitle || `Месяц ${monthNumber}`,
          });
        }
      }
    }
    const months = Array.from(monthMap.values());
    months.sort((a, b) => a.month_number - b.month_number);
    return months;
  }, [progress]);

  // Сохраняем доступные месяцы в Redux для использования в Breadcrumbs
  useEffect(() => {
    if (availableMonths.length > 0) {
      dispatch(setStudentAvailableMonths(availableMonths));
      // Устанавливаем первый месяц по умолчанию, если ничего не выбрано
      if (!selectedMonth && availableMonths.length > 0) {
        dispatch(setSelectedMonth(availableMonths[0]));
      }
    }
  }, [availableMonths, dispatch, selectedMonth]);

  // Фильтруем уроки по выбранному месяцу
  const lessons = useMemo(() => {
    // Сначала фильтруем по месяцу, если выбран
    let filtered = progress;
    if (selectedMonth) {
      const monthNumber = Number(
        selectedMonth.month_number || selectedMonth.id
      );
      filtered = progress.filter(item => {
        const itemMonthNumber = Number(item?.month_number);
        return (
          Number.isFinite(itemMonthNumber) && itemMonthNumber === monthNumber
        );
      });
    }

    // Дедуп по lesson_id: берём последнюю по дате запись, если вдруг дубль
    const byId = new Map();
    for (const item of filtered) {
      const id = Number(item?.lesson_id);
      if (!Number.isFinite(id) || id <= 0) continue;
      const prev = byId.get(id);
      const curDate = parseISO(item?.date);
      const prevDate = prev ? parseISO(prev?.date) : null;
      if (!prev || (curDate && prevDate && curDate > prevDate)) {
        byId.set(id, item);
      }
    }
    const arr = Array.from(byId.values());
    arr.sort((a, b) => {
      const da = parseISO(a?.date);
      const db = parseISO(b?.date);
      if (da && db) return da - db; // по возрастанию даты
      const ia = Number(a?.lesson_id) || 0; // резерв: по id
      const ib = Number(b?.lesson_id) || 0;
      return ia - ib;
    });
    return arr;
  }, [progress, selectedMonth]);

  const columns = useMemo(
    () => buildLessonColumns(lessons.length),
    [lessons.length]
  );

  // 2) Строка посещаемости: колонки lesson1..lessonN соответствуют отсортированным lessons
  const attendanceRow = useMemo(() => {
    const row = { course: 'Курс', result: 0 };
    let total = 0;
    lessons.forEach((rec, idx) => {
      const display = statusToDisplay(rec?.attendance_status ?? '-'); // '1' — был, '0' — не был
      const key = `lesson${idx + 1}`;
      row[key] = display;
      total += statusToPoint(display);
    });
    row.result = String(total);
    return row;
  }, [lessons]);

  const attendanceData = useMemo(() => [attendanceRow], [attendanceRow]);

  // 3) Строка баллов за ДЗ
  const scoreRow = useMemo(() => {
    const row = { course: 'Курс', result: 0 };
    let total = 0;
    lessons.forEach((rec, idx) => {
      const hw = rec?.homework_score;
      const key = `lesson${idx + 1}`;
      row[key] = hw == null ? '-' : String(hw);
      total += hw == null ? 0 : toNum(hw);
    });
    row.result = String(total);
    return row;
  }, [lessons]);

  const scoreData = useMemo(() => [scoreRow], [scoreRow]);

  // 4) Регламент скидок (как было)
  const columnsDiscount = [
    { title: 'Сумма скидки(сом)', dataIndex: 'discount', key: 'discount' },
    { title: 'Баллы за ДЗ', dataIndex: 'score', key: 'score' },
    { title: 'Минимальное кол-во посещений', dataIndex: 'visit', key: 'visit' },
  ];
  const dataDiscount = [
    {
      discount: discount[0]?.discount_amount ?? 0,
      score: discount[0]?.homework_points ?? '-',
      visit: discount[0]?.min_attendance ?? '0',
    },
  ];

  return (
    <section className='report_student'>
      <h2 className='report_student_title'>Посещение</h2>
      <div className='report_student_table'>
        <UniversalTable columns={columns} data={attendanceData} />
      </div>

      <h2 className='report_student_title'>Баллы за домашние задания</h2>
      <div className='report_student_table'>
        <UniversalTable columns={columns} data={scoreData} />
      </div>

      <h2 className='report_student_title'>Регламент скидок</h2>
      <div className='report_student_discount_table'>
        <UniversalTable columns={columnsDiscount} data={dataDiscount} />
      </div>
    </section>
  );
};

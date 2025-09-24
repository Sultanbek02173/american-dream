import { useDispatch } from 'react-redux';
import { UniversalTable } from '../../../../entities';
import './reportStudent.scss';
import { useEffect, useMemo } from 'react';
import { progressGet } from '../../../../app/store/student/progress/progressThunks';
import { useProgress } from '../../../../app/store/student/progress/progressSlice';

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
  const { progress = [] } = useProgress();

  useEffect(() => {
    dispatch(progressGet());
  }, [dispatch]);

  // 1) Подготавливаем СТРОГО СУЩЕСТВУЮЩИЕ уроки, отсортированные по дате (резерв — по id)
  const lessons = useMemo(() => {
    // дедуп по lesson_id: берём последнюю по дате запись, если вдруг дубль
    const byId = new Map();
    for (const item of progress) {
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
    return arr; // например, [{lesson_id:2,...},{lesson_id:4,...}]
  }, [progress]);

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
  const dataDiscount = [{ discount: '2000', score: '70-80', visit: '8' }];

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

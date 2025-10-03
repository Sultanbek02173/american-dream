import { useDispatch } from 'react-redux';
import { UniversalTable } from '../../../entities';
import './popularityCourses.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import { popularCourseGet } from '../../../app/store/admin/reportAnalytic/reportAnalyticThunks';
import { useReportAnalytic } from '../../../app/store/admin/reportAnalytic/reportAnalyticSlice';
import { axiosApi } from '../../../app/services/axiosApi';

function getFilenameFromDisposition(disposition, fallback) {
  if (!disposition) return fallback;
  const match = /filename\*?=(?:UTF-8'')?["']?([^"';]+)["']?/i.exec(
    disposition
  );
  try {
    return match ? decodeURIComponent(match[1]) : fallback;
  } catch {
    return fallback;
  }
}

async function downloadBlob(url, fallbackName) {
  const res = await axiosApi.get(url, { responseType: 'blob' });
  const contentDisp = res.headers?.['content-disposition'];
  const filename = getFilenameFromDisposition(contentDisp, fallbackName);

  const blob = new Blob([res.data], {
    type: res.headers?.['content-type'] || 'application/pdf',
  });
  const blobUrl = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(blobUrl);
}

export const PopularityCourses = () => {
  const dispatch = useDispatch();
  const { popularCourse, popularCourseLoaded, loading } = useReportAnalytic();
  const [downloading, setDownloading] = useState(false);

  const columns = useMemo(
    () => [
      { title: '№', dataIndex: 'id', key: 'id' },
      { title: 'Курс', dataIndex: 'course', key: 'course' },
      { title: 'Ученики', dataIndex: 'students', key: 'students' },
      { title: 'Групп', dataIndex: 'group', key: 'group' },
      { title: 'Доход', dataIndex: 'income', key: 'income' },
    ],
    []
  );

  const calledRef = useRef(false);
  useEffect(() => {
    if (popularCourseLoaded || calledRef.current) return;
    calledRef.current = true;
    dispatch(popularCourseGet());
  }, [dispatch, popularCourseLoaded]);

  const tableData = useMemo(() => {
    return (popularCourse ?? []).map((c, idx) => ({
      key: c.id ?? idx,
      id: c.order ?? c.id ?? idx + 1,
      course: c.course ?? '-',
      students: c.students_count ?? 0,
      group: c.groups_count ?? 0,
      income: `${c.income ?? 0} сом`,
    }));
  }, [popularCourse]);

  const handleRefresh = () => {
    dispatch(popularCourseGet());
  };

  const downloadAllPdf = async () => {
    try {
      setDownloading(true);
      await Promise.all([
        downloadBlob(
          '/administration/teacher-workload-pdf/',
          'teacher-workload.pdf'
        ),
        downloadBlob(
          '/administration/popular-courses-pdf/',
          'popular-courses.pdf'
        ),
      ]);
    } catch (err) {
      console.error('Ошибка при скачивании PDF:', err);
      alert(
        'Не удалось скачать отчёты. Проверьте подключение или права доступа.'
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className='popularityCourses'>
      <h2 className='popularityCourses_title'>Популярность курсов</h2>

      <div className='popularityCourses_table'>
        <UniversalTable columns={columns} data={tableData} loading={loading} />
      </div>

      <div className='popularityCourses_reload'>
        <p>
          Все показатели обновляются автоматически раз в 24 часа. Статистика по
          преподавателям и курсам формируется из данных посещаемости,
          успеваемости и платежей.
        </p>

        <div className='row popularityCourses_reload_btns'>
          <button onClick={handleRefresh} disabled={loading}>
            Обновить данные
          </button>
          <button onClick={downloadAllPdf} disabled={downloading}>
            {downloading ? 'Скачивание…' : 'Скачать отчёт PDF'}
          </button>
        </div>
      </div>
    </section>
  );
};

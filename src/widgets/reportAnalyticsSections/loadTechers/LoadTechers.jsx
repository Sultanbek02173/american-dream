import './loadTechers.scss';
import { UniversalTable } from '../../../entities';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { teacherWorkloadGet } from '../../../app/store/admin/reportAnalytic/reportAnalyticThunks';
import { useReportAnalytic } from '../../../app/store/admin/reportAnalytic/reportAnalyticSlice';

export const LoadTechers = () => {
  const dispatch = useDispatch();
  const { teacherWorkload, teacherWorkloadLoaded, loading } =
    useReportAnalytic();

  const columns = useMemo(
    () => [
      { title: 'Преподаватель', dataIndex: 'teachers', key: 'teachers' },
      { title: 'Занятий в неделю', dataIndex: 'lessons', key: 'lessons' },
      { title: 'Ученики', dataIndex: 'students', key: 'students' },
      { title: 'Доход с группы', dataIndex: 'payment', key: 'payment' },
    ],
    []
  );

  useEffect(() => {
    if (!teacherWorkloadLoaded) {
      dispatch(teacherWorkloadGet());
    }
  }, [dispatch, teacherWorkloadLoaded]);

  const tableData = useMemo(() => {
    return (teacherWorkload || []).map((t, i) => ({
      key: t.id ?? i,
      teachers: t.teacher ?? '-',
      lessons: t.lessons_count ?? 0,
      students: t.students_count ?? t.students ?? 0,
      payment: `${t.group_income} сом` ?? '0 сом',
    }));
  }, [teacherWorkload]);

  return (
    <section className='loadTechers'>
      <h2 className='loadTechers_title'>Загрузка по преподавателям</h2>

      <div className='loadTechers_table'>
        <UniversalTable columns={columns} data={tableData} loading={loading} />
      </div>
    </section>
  );
};

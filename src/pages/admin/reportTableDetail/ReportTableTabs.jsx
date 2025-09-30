import { useDispatch } from 'react-redux';
import { setActiveTab, useTabs } from '../../../app/store/reducers/tabSlice';
import {
  ReportTableData,
  ReportTableHomeWork,
  ReportTableInTable,
  ReportTablePlan,
  ReportTableStatistic,
  ReportTableStudents,
} from '../../../entities/reportTableTabs';
import './reportTableDetail.scss';
import { useEffect, useMemo } from 'react';
import { groupDetailGet } from '../../../app/store/teacher/group/groupThunks';
import { useGroup } from '../../../app/store/teacher/group/groupSlice';
import { useParams } from 'react-router-dom';
import {
  collectMonths,
  calcAttendance,
  calcPerformance,
} from '../../../shared/hooks/reportStats';

export const ReportTableTabs = () => {
  const dispatch = useDispatch();
  const tabId = 'reportTableTabs';
  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;
  const { id } = useParams();
  const { groupDetail } = useGroup();

  const { monthPerf, monthAttend, monthCount, allPerf, allAttend, allCount } =
    useMemo(() => {
      const students = groupDetail?.students || [];

      const months = collectMonths(students);
      const latestMonth = months.length ? months[months.length - 1] : null;

      const { pct: monthAttendPct, lessonCount: monthLessonCount } =
        calcAttendance(students, latestMonth);
      const { pct: monthPerfPct } = calcPerformance(students, latestMonth);

      // За весь период
      const { pct: allAttendPct, lessonCount: allLessonCount } = calcAttendance(
        students,
        null
      );
      const { pct: allPerfPct } = calcPerformance(students, null);

      return {
        monthPerf: monthPerfPct, // 0–100
        monthAttend: monthAttendPct, // 0–100
        monthCount: monthLessonCount, // кол-во уроков в последнем месяце
        allPerf: allPerfPct, // 0–100
        allAttend: allAttendPct, // 0–100
        allCount: allLessonCount, // общее кол-во уникальных уроков
      };
    }, [groupDetail]);

  const tabs = [
    { label: 'Данные', content: <ReportTableData data={groupDetail?.group} /> },
    {
      label: 'Ученики',
      content: <ReportTableStudents students={groupDetail?.students} />,
    },
    {
      label: 'Планы обучения',
      content: <ReportTablePlan syllabus={groupDetail?.months} />,
    },
    {
      label: 'Дз',
      content: <ReportTableHomeWork homeworks={groupDetail?.months} />,
    },
    {
      label: 'Табель',
      content: (
        <ReportTableInTable
          students={groupDetail?.students}
          groupId={groupDetail?.group?.id}
        />
      ),
    },
    {
      label: 'Статистика',
      content: (
        <ReportTableStatistic
          monthPerf={monthPerf}
          monthAttend={monthAttend}
          monthCount={monthCount}
          allPerf={allPerf}
          allAttend={allAttend}
          allCount={allCount}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(groupDetailGet(id));
  }, [dispatch]);

  return (
    <section className='reportTableDetail'>
      <div className='container'>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => dispatch(setActiveTab({ tabId, index }))}
            className={`addTeacher__tabs-button ${
              index === activeTab && 'active'
            }`}
          >
            {tab.label}
          </button>
        ))}
        {tabs[activeTab]?.content}
      </div>
    </section>
  );
};

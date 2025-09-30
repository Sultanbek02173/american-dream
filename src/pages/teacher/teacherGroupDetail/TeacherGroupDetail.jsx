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
import { useEffect } from 'react';
import { groupDetailGet } from '../../../app/store/teacher/group/groupThunks';
import { useParams } from 'react-router-dom';
import { useGroup } from '../../../app/store/teacher/group/groupSlice';

export const TeacherGroupDetail = () => {
  const dispatch = useDispatch();
  const tabId = 'reportTableTabs';
  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;
  const { id } = useParams();
  const { groupDetail } = useGroup();

  console.log(groupDetail);

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
    { label: 'Статистика', content: <ReportTableStatistic /> },
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

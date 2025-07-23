import { useDispatch } from 'react-redux';
import { useTabs } from '../../../app/store/reducers/tabSlice';
import { DataTeacher, TeacherPaymentType } from '../../../entities';
import { CreateNewGroupData } from './CreateNewGroupData/CreateNewGroupData';
import { CreateNewGroupSchedule } from './CreateNewGroupSchedule/CreateNewGroupSchedule';
import { CreateNewGroupStudents } from './CreateNewGroupStudents/CreateNewGroupStudents';
import { CreateNewGroupCompletion } from './CreateNewGroupCompletion/CreateNewGroupCompletion';
export const createNewGroupTabs = () => {
  const dispatch = useDispatch();
  const tabId = 'addTeacherTabs';
  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;
  const tabs = [
    { label: 'Данные', content: <CreateNewGroupData /> },
    { label: 'Расписание', content: <CreateNewGroupSchedule /> },
    { label: 'Ученики', content: <CreateNewGroupStudents /> },
    { label: 'Завершение', content: <CreateNewGroupCompletion /> },
  ];
  return <section></section>;
};

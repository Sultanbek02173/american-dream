import {
  ActiveStudents,
  Income,
  LoadTechers,
  PopularityCourses,
} from '../../../widgets';

export const ReportAnalytics = () => {
  return (
    <div className='container'>
      <ActiveStudents />
      <Income />
      <LoadTechers />
      <PopularityCourses />
    </div>
  );
};

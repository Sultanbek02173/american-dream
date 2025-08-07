import { LessonsNow, NoLessons, Payment, StaticsNow, VisitedStatisc } from "../../../widgets";

export const MainManagerPage = () => {
  return (
    <div className="container">
      <StaticsNow />
      <Payment />
      <LessonsNow />
      <VisitedStatisc />
      {/* <NoLessons /> */}
    </div>
  );
};

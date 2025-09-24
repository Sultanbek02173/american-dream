import { useDispatch } from "react-redux";
import { ReportTablePlan } from "../../../../entities/reportTableTabs";
import './syllabus.scss';
import { useEffect } from "react";
import { syllabusGet } from "../../../../app/store/student/syllabus/syllabusThunks";
import { useSyllabus } from "../../../../app/store/student/syllabus/syllabusSlice";

export const Syllabus = () => {
    const dispatch = useDispatch();
    const { syllabus } = useSyllabus();
    
    useEffect(() => {
        dispatch(syllabusGet());
    }, [dispatch])
    return (
      <section className='syllabus'>
        <ReportTablePlan syllabus={syllabus} />
      </section>
    );
}


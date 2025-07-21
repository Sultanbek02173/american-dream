import { LessonsNow, Payment, StaticsNow, VisitedStatisc } from '../../../widgets';
import './mainAdmin.scss';

export const MainAdmin = () => {
    return (
        <div className='container'>
            <StaticsNow />
            <Payment />
            <LessonsNow />
            <VisitedStatisc />
        </div>
    );
}


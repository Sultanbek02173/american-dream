import './noLessons.scss';
import bg from '../../../shared/imgs/admin/noLessons.svg';

export const NoLessons = () => {
    return (
        <section className='noLessons'>
            <img src={bg} alt="no_lessons" />
            <h2>Пока что занятий на сегодня нет</h2>
            <p>Советуем проверить расписание или создать новую группу</p>
        </section>
    );
}


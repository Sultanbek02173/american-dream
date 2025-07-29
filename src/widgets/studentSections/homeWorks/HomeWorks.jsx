import { HomeWorkCard } from '../../../featurs';
import './homeWorks.scss';

export const HomeWorks = () => {
    const homeWorks = [
      {
        id: 1,
        user: 'Английский',
        title: 'Прочитать текст и ответить на вопросы',
        group: 'ENG-04',
      },
      {
        id: 2,
        user: 'Английский',
        title: 'Прочитать текст и ответить на вопросы',
        group: 'ENG-04',
      },
      {
        id: 3,
        user: 'Английский',
        title: 'Прочитать текст и ответить на вопросы',
        group: 'ENG-04',
      },
    ];
    return (
        <section className='home_works'>
            {
                homeWorks.map((homeWork) => (
                    <HomeWorkCard user={homeWork.user} group={homeWork.group} lesson={homeWork.title} key={homeWork.id} />
                ))
            }
        </section>
    );
}


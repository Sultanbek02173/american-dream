import ReactPlayer from 'react-player';
import './recordLesson.scss';

export const RecordLesson = ({ lessonLink }) => {
  return (
    <section className='record-lesson'>
      <ReactPlayer
        width={'100%'}
        height={'690px'}
        style={{ borderRadius: '10px' }}
        src={lessonLink}
      />
    </section>
  );
};

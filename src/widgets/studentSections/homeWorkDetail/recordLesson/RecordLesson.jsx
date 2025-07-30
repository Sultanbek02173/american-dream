import ReactPlayer from 'react-player';
import './recordLesson.scss';

export const RecordLesson = () => {
  return (
    <section className='record-lesson'>
      <ReactPlayer width={'100%'} height={'690px'} style={{borderRadius: '10px'}} src='https://youtu.be/2M4fspRtWcA?si=l0Q_eYsMIKvViaeh' />
    </section>
  );
};

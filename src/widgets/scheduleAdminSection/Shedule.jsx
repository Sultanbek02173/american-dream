import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';
import './shedule.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SheduleModal } from '../../entities';

export const Shedule = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const rooms = [
    'Каб. 1',
    'Каб. 2',
    'Каб. 3',
    'Каб. 4',
    'Каб. 5',
    'Каб. 6',
    '',
  ];
  const hours = Array.from({ length: 12 }, (_, i) => 12 + i); // 12:00–23:00

  const lessons = [
    {
      time: 12,
      roomIndex: 2,
      duration: 2,
      title: 'Английский',
      teacher: 'Анна К.',
      group: 'A3',
    },
    {
      time: 17,
      roomIndex: 1,
      duration: 2,
      title: 'Робототехника',
      teacher: 'Жанар Б.',
      group: 'B2',
    },
    {
      time: 17,
      roomIndex: 2,
      duration: 2,
      title: 'Английский',
      teacher: 'Анна К.',
      group: 'A3',
    },
  ];

  const lessonMap = new Map();
  lessons.forEach(lesson => {
    for (let i = 0; i < lesson.duration; i++) {
      const key = `${lesson.time + i}-${lesson.roomIndex}`;
      lessonMap.set(key, { ...lesson, part: i });
    }
  });

  return (
    <section className='shedule'>
      <div className='row shedule_header'>
        <p className='row back' onClick={() => navigate(-1)}>
          <IoIosArrowBack size={24} /> Назад
        </p>

        <p className='row date'>
          <IoIosArrowBack size={35} color='#2DE920' />
          01.06.2025
          <IoIosArrowForward size={35} color='#2DE920' />
        </p>
      </div>

      <div className='shedule_table'>
        <div className='grid'>
          <div className='grid_header'>
            <div className='time_label' />
            {rooms.map(room => (
              <div key={room} className='room_header'>
                {room}
              </div>
            ))}
          </div>

          {hours.map(hour => (
            <div key={hour} className='grid_row'>
              <div className='time_label'>{hour}:00</div>
              {rooms.map((_, roomIndex) => {
                const key = `${hour}-${roomIndex}`;
                const lesson = lessonMap.get(key);
                const isMain = lesson?.part === 0;
                return (
                  <div
                    onClick={() => {
                      if (!lesson && roomIndex !== 6) {
                        setOpen(!open);
                      }
                    }}
                    key={roomIndex}
                    className={`grid_cell ${
                      !lesson && roomIndex !== 6 ? 'can_add' : ''
                    }`}
                    style={{
                      backgroundColor: lesson ? '#2DE920' : '',
                      color: lesson ? '#FFFFFF' : '',
                    }}
                  >
                    {isMain && (
                      <div className='lesson'>
                        <div>
                          <h3>{lesson.title}</h3>
                          <p>{lesson.teacher}</p>
                        </div>
                        <div>{lesson.group}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <SheduleModal open={open} setOpen={setOpen} />
    </section>
  );
};

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './shedule.scss';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { SheduleModal } from '../../entities';

export const Shedule = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const inputRef = useRef(null);

  const rooms = [
    'Каб. 1',
    'Каб. 2',
    'Каб. 3',
    'Каб. 4',
    'Каб. 5',
    'Каб. 6',
    '',
  ];
  const hours = Array.from({ length: 12 }, (_, i) => 12 + i);

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

  const handleDateChange = e => {
    setSelectedDate(dayjs(e.target.value));
  };

  return (
    <section className='shedule'>
      <div className='row shedule_header'>
        <p className='row back' onClick={() => navigate(-1)}>
          <IoIosArrowBack size={24} /> Назад
        </p>

        <div className='row date' style={{ position: 'relative' }}>
          <IoIosArrowBack
            size={35}
            color='#2DE920'
            onClick={() => setSelectedDate(selectedDate.subtract(1, 'day'))}
            style={{ cursor: 'pointer' }}
          />

          <p onClick={() => inputRef.current && inputRef.current.showPicker()}>
            {selectedDate.format('DD.MM.YYYY')}
          </p>

          <IoIosArrowForward
            size={35}
            color='#2DE920'
            onClick={() => setSelectedDate(selectedDate.add(1, 'day'))}
            style={{ cursor: 'pointer' }}
          />

          <input
            ref={inputRef}
            type='date'
            value={selectedDate.format('YYYY-MM-DD')}
            onChange={handleDateChange}
            style={{
              position: 'absolute',
              opacity: 0,
              pointerEvents: 'none',
              width: 0,
              height: 0,
            }}
          />
        </div>
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
                        setOpen(true);
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

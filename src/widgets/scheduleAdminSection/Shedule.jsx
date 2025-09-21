import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './shedule.scss';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { SheduleModal } from '../../entities';
import Cookies from 'js-cookie';

export const Shedule = ({ schedule, createSchedule }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const inputRef = useRef(null);
  const role = Cookies.get('role');

  const rooms = [
    'Каб. 1',
    'Каб. 2',
    'Каб. 3',
    'Каб. 4',
    'Каб. 5',
    'Каб. 6',
    '',
  ];
  const hours = Array.from({ length: 14 }, (_, i) => 10 + i);

  const filteredSchedule = Array.isArray(schedule)
    ? schedule.filter(
        lesson => lesson.date === selectedDate.format('YYYY-MM-DD')
      )
    : [];

  const lessonMap = new Map();
  filteredSchedule.forEach(lesson => {
    const baseHour = parseInt(lesson.time.split(':')[0], 10);
    for (let i = 0; i < lesson.duration; i++) {
      const key = `${baseHour + i}-${lesson.roomIndex}`;
      lessonMap.set(key, { ...lesson, part: i });
    }
  });

  const handleDateChange = e => {
    setSelectedDate(dayjs(e.target.value));
  };

  const canEdit = role === 'Manager' || role === 'Administrator';

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
                      if (canEdit && !lesson && roomIndex !== 6) {
                        setOpen({
                          time: hour,
                          roomIndex,
                          date: selectedDate.format('YYYY-MM-DD'),
                        });
                      }
                    }}
                    key={roomIndex}
                    className={`grid_cell ${
                      canEdit && !lesson && roomIndex !== 6 ? 'can_add' : ''
                    }`}
                    style={{
                      backgroundColor: lesson ? '#2DE920' : '',
                      color: lesson ? '#FFFFFF' : '',
                      cursor:
                        canEdit && !lesson && roomIndex !== 6
                          ? 'pointer'
                          : 'default',
                    }}
                  >
                    {isMain && (
                      <div className='lesson'>
                        <div>
                          <h3>{lesson.direction || lesson.title}</h3>
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

      <SheduleModal
        open={open}
        setOpen={setOpen}
        selectedDate={selectedDate}
        createSchedule={createSchedule}
        cellInfo={open}
      />
    </section>
  );
};

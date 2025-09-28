import { useEffect, useMemo, useState } from 'react';
import { ApplicatinModal, UniversalTable } from '../../../entities';
import './mainTeacher.scss';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useAccaunt } from '../../../app/store/reducers/accaunt/accauntSlice';
import { useDispatch } from 'react-redux';
import { useGroup } from '../../../app/store/teacher/group/groupSlice';
import { groupGet } from '../../../app/store/teacher/group/groupThunks';
import { homeworkStudentGet } from '../../../app/store/teacher/studentHomework/studentHomeworkThunks';
import { useHomeworkStudent } from '../../../app/store/teacher/studentHomework/studentHomeworkSlice';

const fmtDateTime = iso => {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat('ru-RU', {
      timeZone: 'Asia/Bishkek',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return String(iso);
  }
};

const mapStatusToClass = status => {
  switch (String(status)) {
    case 'black':
      return 'failed';
    case 'orange':
      return 'retake';
    case 'green':
    case 'success':
    case 'done':
      return 'verified';
    default:
      return String(status || 'retake');
  }
};

export const MainTeacher = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate();
  const { accaunt } = useAccaunt();
  const dispatch = useDispatch();

  const { group } = useGroup();
  const { homeworkStudent } = useHomeworkStudent();

  useEffect(() => {
    dispatch(groupGet());
    dispatch(homeworkStudentGet());
  }, [dispatch]);

  const tableData = useMemo(() => {
    const list = group?.groups ?? [];
    return list.map(g => ({
      id: g.id,
      direction: g.direction,
      group: g.group,
      course: String(g.month ?? ''),
      lesson: String(g.lesson ?? ''),
    }));
  }, [group]);

  const columns = [
    { title: '№', dataIndex: 'id', key: 'id' },
    { title: 'Направление', dataIndex: 'direction', key: 'direction' },
    { title: 'Группа', dataIndex: 'group', key: 'group' },
    { title: 'Курс', dataIndex: 'course', key: 'course' },
    { title: 'Урок', dataIndex: 'lesson', key: 'lesson' },
  ];

  // ✅ единственная версия cards + фильтр по status !== 'black'
  const cards = useMemo(() => {
    const arr = Array.isArray(homeworkStudent?.results)
      ? homeworkStudent.results
      : Array.isArray(homeworkStudent)
      ? homeworkStudent
      : [];

    const visible = arr.filter(h => String(h.status) !== 'black');

    return visible.map(h => ({
      id: h.id,
      user: h.student_name || `Ученик #${h.student}`,
      number: h.group_name || '',
      title: `Дз ${h.lesson}го урока`,
      statusClass: mapStatusToClass(h.status),
      raw: h,
    }));
  }, [homeworkStudent]);

  const handleOpenCard = item => {
    setSelectedItem(item?.raw ?? null);
    setOpen(true);
  };

  return (
    <main>
      <section className='groups'>
        <div className='container'>
          <p className='groups__subtitle'>
            Hi, {accaunt?.first_name ?? 'User'}!
          </p>
          <h3 className='groups__title'>Мои группы</h3>

          <UniversalTable
            columns={columns}
            data={tableData}
            onRowClick={item => navigate(`/table/${item.id}`)}
          />
        </div>
      </section>

      <section className='students'>
        <div className='container'>
          <div className='applicationsAdmin_cont_cards'>
            {cards.length === 0 && (
              <div style={{ opacity: 0.7, padding: 12 }}>
                Пока нет заявок на проверку
              </div>
            )}

            {cards.map(card => (
              <div
                onClick={() => handleOpenCard(card)}
                key={card.id}
                className={`row card ${card.statusClass}`}
              >
                <div className='card_user'>
                  <h3>{card.user}</h3>
                  {card.number && (
                    <p className='card_user_phone'>{card.number}</p>
                  )}
                  <p>{card.title}</p>
                </div>
                <p className='row card_btn'>
                  Развернуть <IoIosArrowDown size={20} />
                </p>
              </div>
            ))}
          </div>

          <ApplicatinModal setOpen={setOpen} open={open}>
            <div className='modal__content'>
              <div className='modal__content-head'>
                <div>
                  <h3>
                    {selectedItem?.student_full_name ||
                      `Ученик #${selectedItem?.student ?? ''}`}
                  </h3>
                  <p>{selectedItem?.group_name || '—'}</p>
                </div>

                {selectedItem?.teacher_comment ? (
                  <p className='modal__content-text modal__content-tex1'>
                    Комментарий: {selectedItem.teacher_comment}
                  </p>
                ) : (
                  <p
                    className='modal__content-text modal__content-tex1'
                    style={{ opacity: 0.7 }}
                  >
                    Комментарий: —
                  </p>
                )}

                <p className='modal__content-text'>
                  Отправлено: {fmtDateTime(selectedItem?.submitted_at) || '—'}
                </p>
              </div>

              <div className='modal__content-body'>
                <div className='modal__content-row'>
                  <p className='modal__content-text'>
                    Ссылка на ДЗ:{' '}
                    {selectedItem?.project_links?.length ? (
                      <a
                        href={selectedItem.project_links[0]}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {selectedItem.project_links[0]}
                      </a>
                    ) : (
                      '—'
                    )}
                  </p>
                  <p className='modal__content-text'>
                    Файл ДЗ: <span style={{ opacity: 0.7 }}>—</span>
                  </p>
                </div>

                <div className='modal__content-row1'>
                  <input
                    type='number'
                    min={0}
                    max={10}
                    placeholder='Баллы:'
                    className='modal__content-input width'
                    defaultValue={selectedItem?.score ?? ''}
                  />
                  <input
                    type='text'
                    placeholder='Комментарий:'
                    className='modal__content-input'
                    defaultValue={selectedItem?.teacher_comment ?? ''}
                  />
                </div>
              </div>

              <div className='dataTeacher__row'>
                <button
                  className='dataTeacher__row-button'
                  type='button'
                  onClick={() => setOpen(false)}
                >
                  Отказаться
                </button>
                <button className='dataTeacher__row-button add'>
                  Отправить
                </button>
              </div>
            </div>
          </ApplicatinModal>
        </div>
      </section>
    </main>
  );
};

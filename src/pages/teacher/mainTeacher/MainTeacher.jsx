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
import { axiosApi } from '../../../app/services/axiosApi'; // ✅ добавляем axios
import { AnimatePresence, motion } from 'framer-motion';

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
  const [openRowId, setOpenRowId] = useState(null);

  // ✅ новые стейты для оценки и комментария
  const [score, setScore] = useState('');
  const [comment, setComment] = useState('');

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

  // ✅ фильтруем заявки по status !== 'black'
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
    setScore(item?.raw?.score ?? '');
    setComment(item?.raw?.teacher_comment ?? '');
    setOpen(true);
  };

  // ✅ PATCH запрос
  const handleSubmit = async status => {
    if (!selectedItem?.id) return;

    try {
      await axiosApi.patch(`/teacher/teacher/homework/${selectedItem.id}/`, {
        score: score || null,
        teacher_comment: comment,
        status: status,
      });

      // обновляем список
      dispatch(homeworkStudentGet());
      setOpen(false);
    } catch (e) {
      console.error('Ошибка при обновлении дз:', e);
    }
  };

  return (
    <main>
      <section className='groups'>
        <div className='container'>
          <p className='groups__subtitle'>
            Hi, {accaunt?.first_name ?? 'User'}!
          </p>
          <h3 className='groups__title'>Мои группы</h3>
          <div className='groups__wrapper'>
            <UniversalTable
              columns={columns}
              data={tableData}
              onRowClick={item => navigate(`/table/${item.id}`)}
            />
          </div>
          {/* Анимированная таблица-аккордеон */}
          <div className='accordion'>
            {tableData.map(row => {
              const isOpen = openRowId === row.id;
              return (
                <div
                  key={row.id}
                  className={`accordion__item${isOpen ? ' open' : ''}`}
                >
                  <button
                    type='button'
                    className='accordion__header'
                    onClick={() =>
                      setOpenRowId(prev => (prev === row.id ? null : row.id))
                    }
                  >
                    <span className='accordion__title'>{row.group}</span>
                    <IoIosArrowDown
                      className={`accordion__chevron${isOpen ? ' rotate' : ''}`}
                      size={22}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className='accordion__panel'
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                      >
                        <div className='accordion__row'>
                          <span className='label'>Направление:</span>
                          <span className='value'>{row.direction || '—'}</span>
                        </div>
                        <div className='accordion__row'>
                          <span className='label'>Курс:</span>
                          <span className='value'>{row.course || '—'}</span>
                        </div>
                        <div className='accordion__row'>
                          <span className='label'>Урок:</span>
                          <span className='value'>{row.lesson || '—'}</span>
                        </div>
                        <div className='accordion__row'>
                          <span className='label'></span>
                          <span
                            className='value'
                            onClick={() => navigate(`/table/${row.id}`)}
                            style={{ cursor: 'pointer' }}
                          >
                            Подробнее
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
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
                      `Ученик #${selectedItem?.student_name ?? ''}`}
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
                  <div className='modal__content-text'>
                    <p style={{ marginBottom: '10px' }}>Ссылки на ДЗ:</p>
                    {Array.isArray(selectedItem?.project_links) &&
                    selectedItem.project_links.length > 0 ? (
                      <ul>
                        {selectedItem.project_links.map((link, idx) => (
                          <li key={idx}>
                            <a href={link} target='_blank' rel='noreferrer'>
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      '—'
                    )}
                  </div>

                  <div className='modal__content-text'>
                    <p style={{ marginBottom: '10px' }}>Файлы ДЗ:</p>
                    {Array.isArray(selectedItem?.project_files) &&
                    selectedItem.project_files.length > 0 ? (
                      <ul>
                        {selectedItem.project_files.map((file, idx) => (
                          <li key={idx}>
                            <a href={file} target='_blank' rel='noreferrer'>
                              Скачать файл {idx + 1}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span style={{ opacity: 0.7 }}>—</span>
                    )}
                  </div>
                </div>

                <div className='modal__content-row1'>
                  <input
                    type='number'
                    min={0}
                    max={10}
                    placeholder='Баллы:'
                    className='modal__content-input width'
                    value={score}
                    onChange={e => setScore(e.target.value)}
                  />
                  <input
                    type='text'
                    placeholder='Комментарий:'
                    className='modal__content-input'
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  />
                </div>
              </div>

              <div className='dataTeacher__row'>
                <button
                  className='dataTeacher__row-button'
                  type='button'
                  onClick={() => handleSubmit('red')}
                >
                  Отказаться
                </button>
                <button
                  className='dataTeacher__row-button add'
                  type='button'
                  onClick={() => handleSubmit('green')}
                >
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

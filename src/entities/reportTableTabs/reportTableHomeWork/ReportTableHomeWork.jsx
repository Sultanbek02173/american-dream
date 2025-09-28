import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import openIcon from '../reportTablePlan/open.svg';
import closeIcon from '../reportTablePlan/close.svg';

// helper: формат даты в "DD.MM.YYYY HH:MM"
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

export const ReportTableHomeWork = ({ homeworks }) => {
  // Диагностика: посмотри, что реально приходит
  console.log('ReportTableHomeWork > homeworks:', homeworks);

  const items = useMemo(() => {
    // 1) если пришёл объект { months: [...] }
    // 2) если пришёл просто массив месяцев [...]
    const months = Array.isArray(homeworks?.months)
      ? homeworks.months
      : Array.isArray(homeworks)
      ? homeworks
      : [];

    // Если в months пришло что-то странное — отфильтруем до объектов с lessons
    const safeMonths = months.filter(m => m && typeof m === 'object');

    const flat = safeMonths.flatMap(m => {
      const lessons = Array.isArray(m.lessons) ? m.lessons : [];
      return lessons.map(l => ({
        id: l.id,
        order: l.order,
        month_number: m.month_number ?? l.month ?? null,
        title: l.title,
        description: l.description,
        teacher: l.teacher ?? '', // если поле появится
        link: l.lesson_links,
        record: l.lesson_recording,
        data_delivery: fmtDateTime(l.homework_deadline),
        link_hw: l.homework_links,
        file_hw: l.homework_files,
        hw_description: l.homework_description,
        hw_requirements: l.homework_requirements,
      }));
    });

    flat.sort((a, b) => {
      const m = (a.month_number ?? 0) - (b.month_number ?? 0);
      return m !== 0 ? m : (a.order ?? 0) - (b.order ?? 0);
    });

    return flat;
  }, [homeworks]);

  const [openId, setOpenId] = useState(null);
  const toggleVisibility = id => setOpenId(prev => (prev === id ? null : id));

  // Пусто? Покажем понятный fallback
  if (!items.length) {
    return (
      <div className='reportTablePlan'>
        <div className='reportTablePlan__empty'>
          Нет данных для отображения.
        </div>
      </div>
    );
  }

  return (
    <div className='reportTablePlan'>
      {items.map(lesson => {
        const isOpen = openId === lesson.id;
        return (
          <div
            key={lesson.id}
            className='reportTablePlan__item'
            onClick={() => toggleVisibility(lesson.id)}
          >
            <div className='reportTablePlan__item-head'>
              <p>
                месяц {lesson.month_number ?? '—'} • урок{' '}
                {lesson.order ?? lesson.id}
              </p>
              <h3>{lesson.title}</h3>
              <img
                src={isOpen ? closeIcon : openIcon}
                alt='toggle'
                style={{ width: 24, height: 24 }}
              />
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  style={{ overflow: 'hidden' }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {lesson.description && (
                    <p className='reportTablePlan__item-description'>
                      {lesson.description}
                    </p>
                  )}

                  {(lesson.hw_description || lesson.hw_requirements) && (
                    <div className='reportTablePlan__item-task'>
                      {lesson.hw_description && (
                        <p>
                          <strong>Описание дз:</strong> {lesson.hw_description}
                        </p>
                      )}
                      {lesson.hw_requirements && (
                        <p>
                          <strong>Требования:</strong> {lesson.hw_requirements}
                        </p>
                      )}
                    </div>
                  )}

                  <div className='row1'>
                    <div className='col-6'>
                      <div className='reportTablePlan__item-task'>
                        <span>Преподаватель: </span>
                        <p>{lesson.teacher || '—'}</p>
                      </div>
                    </div>

                    <div className='col-6'>
                      <div className='reportTablePlan__item-task'>
                        <span>Дата сдачи: </span>
                        <p>{lesson.data_delivery || '—'}</p>
                      </div>
                    </div>

                    <div className='col-6'>
                      <div className='reportTablePlan__item-task'>
                        <span>Ссылки урока: </span>
                        <p>
                          {lesson.link ? (
                            <a
                              href={lesson.link}
                              target='_blank'
                              rel='noreferrer'
                            >
                              {lesson.link}
                            </a>
                          ) : (
                            '—'
                          )}
                        </p>
                      </div>
                    </div>

                    <div className='col-6'>
                      <div className='reportTablePlan__item-task'>
                        <span>Ссылки ДЗ: </span>
                        <p>
                          {lesson.link_hw ? (
                            <a
                              href={lesson.link_hw}
                              target='_blank'
                              rel='noreferrer'
                            >
                              {lesson.link_hw}
                            </a>
                          ) : (
                            '—'
                          )}
                        </p>
                      </div>
                    </div>

                    <div className='col-6'>
                      <div className='reportTablePlan__item-task'>
                        <span>Запись урока: </span>
                        <p>
                          {lesson.record ? (
                            <a
                              href={lesson.record}
                              target='_blank'
                              rel='noreferrer'
                            >
                              {lesson.record}
                            </a>
                          ) : (
                            '—'
                          )}
                        </p>
                      </div>
                    </div>

                    <div className='col-6'>
                      <div className='reportTablePlan__item-task'>
                        <span>Файлы ДЗ: </span>
                        <p>
                          {lesson.file_hw ? (
                            <a
                              href={lesson.file_hw}
                              target='_blank'
                              rel='noreferrer'
                            >
                              {lesson.file_hw}
                            </a>
                          ) : (
                            '—'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

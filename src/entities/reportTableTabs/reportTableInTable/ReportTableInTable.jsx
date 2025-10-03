import { useMemo, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './reportTableInTable.scss';
import { patchStudentAttendances } from '../../../app/store/teacher/group/groupThunks';

export const ReportTableInTable = ({ students = [], groupId }) => {
  const dispatch = useDispatch();

  // если groupId не передали пропсом — возьмём из URL: /administration/groups/:groupId/...
  const params = useParams();
  const safeGroupId = groupId ?? params?.groupId;

  const [local, setLocal] = useState({}); // { 'studentId:lesson': '1'|'0'|'online'|'' }
  const [openKey, setOpenKey] = useState(null); // 'studentId:lesson'
  const [anchorRect, setAnchorRect] = useState(null);
  const menuRef = useRef(null);

  const allLessons = useMemo(() => {
    const set = new Set();
    for (const s of students) {
      (s.attendances ?? []).forEach(a => {
        if (a && (a.lesson ?? a.lesson_id) != null)
          set.add(Number(a.lesson ?? a.lesson_id));
      });
      (s.homework_scores ?? []).forEach(h => {
        if (h && h.lesson_id != null) set.add(Number(h.lesson_id));
      });
    }
    return Array.from(set).sort((a, b) => a - b);
  }, [students]);

  // 🔧 тут ВАЖНО: кладём и id, и status
  const rows = useMemo(() => {
    return students.map((s, idx) => {
      const fullName =
        [s.last_name, s.first_name].filter(Boolean).join(' ') ||
        s.username ||
        `ID ${s.id}`;

      const attendanceMap = new Map(); // lesson -> { id, status }
      (s.attendances ?? []).forEach(a => {
        if (!a) return;
        const lessonNum = Number(a.lesson ?? a.lesson_id);
        attendanceMap.set(lessonNum, { id: a.id, status: a.status ?? '' });
      });

      const scoreMap = new Map(); // lesson -> score
      (s.homework_scores ?? []).forEach(h => {
        if (!h) return;
        const lessonNum = Number(h.lesson_id);
        scoreMap.set(lessonNum, h.score == null ? '—' : h.score);
      });

      return {
        idx: idx + 1,
        studentId: s.id,
        studentName: fullName,
        attendanceMap,
        scoreMap,
      };
    });
  }, [students]);

  // закрытие меню по клику вне
  useEffect(() => {
    const handler = e => {
      if (!openKey) return;
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenKey(null);
        setAnchorRect(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [openKey]);

  const openMenu = (e, studentId, lesson) => {
    const key = `${studentId}:${lesson}`;
    setOpenKey(prev => (prev === key ? null : key));
    const rect = e.currentTarget.getBoundingClientRect();
    setAnchorRect(rect);
  };

  const chooseValue = async ({ studentId, lesson, attendanceId, value }) => {
    const key = `${studentId}:${lesson}`;
    const prevLocal = local[key];

    setLocal(prev => ({ ...prev, [key]: value }));
    setOpenKey(null);
    setAnchorRect(null);

    console.log(safeGroupId);
    

    if (!safeGroupId) {
      console.warn(
        '[attendance PATCH] groupId отсутствует — запрос не отправлен'
      );
      return;
    }
    if (!attendanceId) {
      console.warn(
        '[attendance PATCH] attendanceId отсутствует — запрос не отправлен'
      );
      return;
    }

    try {
      await dispatch(
        patchStudentAttendances({
          groupId: safeGroupId,
          studentId,
          attendances: [{ id: attendanceId, status: value }],
        })
      ).unwrap();
    } catch (e) {
      console.error('patchStudentAttendances error:', e);
      setLocal(prev => ({ ...prev, [key]: prevLocal }));
      alert('Не удалось сохранить посещаемость');
    }
  };

  // Портал: меню поверх всего
  const MenuPortal = ({ children, anchor }) => {
    if (!anchor) return null;
    const EST_MENU_H = 160;
    const gap = 6;
    const canShowAbove = anchor.top >= EST_MENU_H + gap;

    const style = {
      position: 'fixed',
      top: canShowAbove ? anchor.top - gap : anchor.bottom + gap,
      left: anchor.left,
      transform: canShowAbove ? 'translateY(-100%)' : 'none',
      zIndex: 10000,
      minWidth: 160,
    };
    return createPortal(<div style={style}>{children}</div>, document.body);
  };

  const renderAttendanceTable = () => (
    <table border='0' cellSpacing='0' className='universalTable'>
      <colgroup>
        <col style={{ width: '100px', position: 'sticky' }} />
        <col style={{ width: '250px', position: 'sticky' }} />
        {allLessons.map(lesson => (
          <col key={lesson} style={{ width: '119px' }} />
        ))}
      </colgroup>

      <thead className='universalTable__head'>
        <tr>
          <th className='universalTable__body-student universalTable__body-head'>
            №
          </th>
          <th
            className='universalTable__body-student universalTable__body-head'
            style={{ left: '98px' }}
          >
            Студенты
          </th>
          {allLessons.map((lesson, i) => (
            <th key={lesson}>урок №{i + 1}</th>
          ))}
        </tr>
      </thead>

      <tbody className='universalTable__body'>
        {rows.map(r => (
          <tr key={r.studentId}>
            <td
              className='universalTable__body-student'
              style={{ position: 'sticky' }}
            >
              {r.idx}
            </td>
            <td
              style={{ width: '300px', position: 'sticky', left: '98px' }}
              className='universalTable__body-student'
            >
              {r.studentName}
            </td>

            {allLessons.map(lesson => {
              const att = r.attendanceMap.get(lesson) || {
                id: null,
                status: '',
              };
              const base = att.status ?? '';
              const key = `${r.studentId}:${lesson}`;
              const shown = local[key] ?? base;
              const isOpen = openKey === key;

              return (
                <td
                  key={lesson}
                  className='universalTable__body-visiting'
                  onClick={e => openMenu(e, r.studentId, lesson)}
                  title='Выбрать: 1 / 0 / online'
                  style={{ position: 'relative', cursor: 'pointer' }}
                >
                  <p>{shown || '—'}</p>

                  {isOpen && anchorRect && (
                    <MenuPortal anchor={anchorRect}>
                      <div
                        ref={menuRef}
                        style={{
                          background: '#313131',
                          border: '1px solid #555',
                          borderRadius: 8,
                          padding: 8,
                          display: 'grid',
                          gap: 6,
                          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                        }}
                        onClick={e => e.stopPropagation()}
                      >
                        {[
                          { label: '1 — присутствовал', value: '1' },
                          { label: '0 — отсутствовал', value: '0' },
                          { label: 'online — дистанционно', value: 'online' },
                        ].map(opt => (
                          <button
                            key={opt.value}
                            type='button'
                            onClick={() =>
                              chooseValue({
                                studentId: r.studentId,
                                lesson,
                                attendanceId: att.id, 
                                value: opt.value,
                              })
                            }
                            style={{
                              textAlign: 'left',
                              padding: '8px 10px',
                              borderRadius: 6,
                              border: '1px solid #444',
                              background:
                                (local[key] ?? base) === opt.value
                                  ? '#2de920'
                                  : 'transparent',
                              color:
                                (local[key] ?? base) === opt.value
                                  ? '#0c0c0c'
                                  : '#fff',
                              cursor: 'pointer',
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </MenuPortal>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderHomeworkTable = () => (
    <table border='0' cellSpacing='0' className='universalTable'>
      <colgroup>
        <col style={{ width: '100px', position: 'sticky' }} />
        <col style={{ width: '250px', position: 'sticky' }} />
        {allLessons.map(lesson => (
          <col key={lesson} style={{ width: '119px' }} />
        ))}
      </colgroup>

      <thead className='universalTable__head'>
        <tr>
          <th className='universalTable__body-student universalTable__body-head'>
            №
          </th>
          <th
            className='universalTable__body-student universalTable__body-head'
            style={{ left: '98px' }}
          >
            Студенты
          </th>
          {allLessons.map((lesson, i) => (
            <th key={lesson}>урок №{i + 1}</th>
          ))}
        </tr>
      </thead>

      <tbody className='universalTable__body'>
        {rows.map(r => (
          <tr key={r.studentId}>
            <td
              className='universalTable__body-student'
              // style={{ position: 'sticky' }}
            >
              {r.idx}
            </td>
            <td
              style={{ width: '300px', position: 'sticky', left: '98px' }}
              className='universalTable__body-student'
            >
              {r.studentName}
            </td>
            {allLessons.map(lesson => (
              <td key={lesson} className='universalTable__body-visiting'>
                <p>{r.scoreMap.get(lesson) ?? '—'}</p>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (!students.length)
    return <div className='reportTableInTable'>Нет данных</div>;

  return (
    <div className='reportTableInTable'>
      <div className='reportTableInTable__first'>{renderAttendanceTable()}</div>
      <div className='reportTableInTable__second'>{renderHomeworkTable()}</div>
    </div>
  );
};

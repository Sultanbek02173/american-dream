import { AnimatePresence, motion } from 'framer-motion';
import './works.scss';
import { useMemo, useState } from 'react';
import { TextField, Button, IconButton, Tooltip } from '@mui/material';
import { inputStyle } from '../../../../shared/utils/MuiStyles';
import { useDispatch } from 'react-redux';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddLinkIcon from '@mui/icons-material/AddLink';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { homeWorkPost } from '../../../../app/store/student/homeWork/homeworkThunks';

const MAX_LINKS = 5;
const MAX_FILES = 5;

export const Works = ({ id, deadLine, homework_requirements, onSuccess }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [links, setLinks] = useState(['']);
  const [files, setFiles] = useState([]);
  const [comment, setComment] = useState('');

  const linksLeft = useMemo(
    () => Math.max(0, MAX_LINKS - links.filter(Boolean).length),
    [links]
  );
  const filesLeft = useMemo(
    () => Math.max(0, MAX_FILES - files.filter(Boolean).length),
    [files]
  );

  const formatDate = time => {
    if (!time) return 'dd.mm.yyyy hh:mm';
    const d = new Date(time);
    const s = new Intl.DateTimeFormat('ru-RU', {
      timeZone: 'Asia/Bishkek',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
    return s.replace(',', '');
  };

  const handleLinkChange = (idx, value) => {
    setLinks(prev => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  const addLinkField = () => {
    setLinks(prev => (prev.length < MAX_LINKS ? [...prev, ''] : prev));
  };

  const removeLinkField = idx => {
    setLinks(prev => {
      const next = prev.filter((_, i) => i !== idx);
      return next.length ? next : [''];
    });
  };

  const addFileField = () => {
    setFiles(prev => (prev.length < MAX_FILES ? [...prev, null] : prev));
  };

  const removeFileField = idx => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handlePickFile = (idx, e) => {
    const f = e.target.files?.[0] || null;
    e.target.value = '';
    if (!f) return;
    setFiles(prev => {
      const next = [...prev];
      next[idx] = f;
      return next;
    });
  };

  const handleSubmit = async () => {
    const cleanLinks = links
      .map(l => l.trim())
      .filter(Boolean)
      .slice(0, MAX_LINKS);
    const cleanFiles = files.filter(Boolean).slice(0, MAX_FILES);

    try {
      await dispatch(
        homeWorkPost({ id, links: cleanLinks, files: cleanFiles, comment })
      ).unwrap();
      onSuccess?.();
      setLinks(['']);
      setFiles([]);
      setComment('');
    } catch (err) {
      console.error(err);
    }
  };

  const submitDisabled = useMemo(() => {
    const hasLinks = links.some(l => l.trim().length > 0);
    const hasFiles = files.some(Boolean);
    return !(hasLinks || hasFiles);
  }, [links, files]);

  return (
    <section className='works'>
      <div className='works_home'>
        <div className='row works_home_header' onClick={() => setOpen(!open)}>
          <h2>Домашнее задание</h2>
          <p>Дедлайн: {formatDate(deadLine)}</p>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className='works_home_content'>{homework_requirements}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className='works_link'>
        <h2>Прикрепить домашнее задание</h2>

        {links.map((value, idx) => (
          <div key={`link-${idx}`} className='works_row'>
            <TextField
              sx={{ ...inputStyle, flex: 1, color: '#fff' }}
              label={`Ссылка #${idx + 1}`}
              value={value}
              onChange={e => handleLinkChange(idx, e.target.value)}
            />
            <IconButton
              onClick={() => removeLinkField(idx)}
              disabled={links.length === 1 && !value}
              sx={{
                color: '#fff',
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </div>
        ))}

        <div className='works_actions_inline'>
          <Tooltip title='Добавить ссылку'>
            <span>
              <IconButton
                onClick={addLinkField}
                disabled={links.length >= MAX_LINKS}
                sx={{
                  color: '#fff',
                }}
              >
                <AddLinkIcon />
              </IconButton>
            </span>
          </Tooltip>
          <p className='works_limit'>Осталось ссылок: {linksLeft}</p>
        </div>

        <div className='works_files'>
          {files?.map((file, idx) => {
            const inputId = `file-${idx}`;
            return (
              <div key={`file-${idx}`} className='works_row'>
                <TextField
                  sx={{ ...inputStyle, flex: 1 }}
                  label={`Файл #${idx + 1}`}
                  value={file ? file.name : ''}
                  placeholder='Не выбран'
                  InputProps={{ readOnly: true }}
                />
                <input
                  id={inputId}
                  type='file'
                  hidden
                  onChange={e => handlePickFile(idx, e)}
                />
                <label htmlFor={inputId}>
                  <Button
                    variant='outlined'
                    component='span'
                    startIcon={<UploadFileIcon />}
                  >
                    Выбрать
                  </Button>
                </label>
                <IconButton onClick={() => removeFileField(idx)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </div>
            );
          })}

          <div className='works_actions_inline'>
            <Tooltip title='Добавить файл'>
              <span>
                <IconButton
                  onClick={addFileField}
                  disabled={files.length >= MAX_FILES}
                  sx={{
                    color: '#fff',
                  }}
                >
                  <UploadFileIcon />
                </IconButton>
              </span>
            </Tooltip>
            <p className='works_limit'>Осталось файлов: {filesLeft}</p>
          </div>
        </div>

        <div className='works_submit'>
          <Button
            variant='contained'
            onClick={handleSubmit}
            disabled={submitDisabled}
          >
            Отправить
          </Button>
        </div>
      </div>
    </section>
  );
};

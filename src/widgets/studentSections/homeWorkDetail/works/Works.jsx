import { AnimatePresence, motion } from 'framer-motion';
import './works.scss';
import { useEffect, useMemo, useState } from 'react';
import {
  TextField,
  Button,
  IconButton,
  Tooltip,
  Link as MuiLink,
  Divider,
} from '@mui/material';
import { inputStyle } from '../../../../shared/utils/MuiStyles';
import { useDispatch } from 'react-redux';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddLinkIcon from '@mui/icons-material/AddLink';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { homeWorkPost } from '../../../../app/store/student/homeWork/homeworkThunks';

const MAX_LINKS = 5;
const MAX_FILES = 5;

const normalizeLinksProp = linkProp => {
  if (!linkProp) return [];
  if (Array.isArray(linkProp)) return linkProp.filter(Boolean).map(String);
  return [String(linkProp)].filter(Boolean);
};

const normalizeFilesProp = fileProp => {
  if (!fileProp) return [];
  const toObj = f => {
    if (typeof f === 'string') {
      const nameGuess = f.split('/').pop() || 'файл';
      return { name: nameGuess, url: f, _existing: true };
    }
    if (f && typeof f === 'object') {
      const name =
        f.name || f.filename || (f.url ? f.url.split('/').pop() : 'файл');
      return { id: f.id, name, url: f.url || f.link || '', _existing: true };
    }
    return null;
  };
  if (Array.isArray(fileProp)) return fileProp.map(toObj).filter(Boolean);
  const one = toObj(fileProp);
  return one ? [one] : [];
};

export const Works = ({
  id,
  deadLine,
  homework_requirements,
  onSuccess,
  link,
  file,
}) => {
  const dispatch = useDispatch();

  const [links, setLinks] = useState(['']);

  const [existingFiles, setExistingFiles] = useState([]);

  const [files, setFiles] = useState([]);

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const initLinks = normalizeLinksProp(link);
    setLinks(initLinks.length ? initLinks : ['']);

    const initExisting = normalizeFilesProp(file);
    setExistingFiles(initExisting);
  }, [link, file]);

  const linksLeft = useMemo(() => {
    const used = links.filter(Boolean).length;
    return Math.max(0, MAX_LINKS - used);
  }, [links]);

  const filesLeft = useMemo(() => {
    const used =
      (existingFiles?.length || 0) + (files.filter(Boolean).length || 0);
    return Math.max(0, MAX_FILES - used);
  }, [existingFiles, files]);

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

  const canAddMoreFiles = filesLeft > 0;

  const addFileField = () => {
    if (!canAddMoreFiles) return;
    setFiles(prev =>
      prev.length + (existingFiles?.length || 0) < MAX_FILES
        ? [...prev, null]
        : prev
    );
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
    const cleanFiles = files
      .filter(f => f instanceof File)
      .slice(0, Math.max(0, MAX_FILES - (existingFiles?.length || 0)));

    try {
      await dispatch(
        homeWorkPost({
          id,
          links: cleanLinks,
          files: cleanFiles,
          comment,
        })
      ).unwrap();

      onSuccess?.();
      setFiles([]);
      setComment('');
    } catch (err) {
      console.error(err);
    }
  };

  const submitDisabled = useMemo(() => {
    const hasLinks = links.some(l => l.trim().length > 0);
    const hasNewFiles = files.some(f => f instanceof File);
    return !(hasLinks || hasNewFiles);
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
              sx={{ color: '#fff' }}
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
                sx={{ color: '#fff' }}
              >
                <AddLinkIcon />
              </IconButton>
            </span>
          </Tooltip>
          <p className='works_limit'>Осталось ссылок: {linksLeft}</p>
        </div>

        {existingFiles?.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <div className='works_files_existing'>
              <h3>Ранее прикреплённые</h3>
              <ul className='works_files_list'>
                {existingFiles.map((f, i) => (
                  <li
                    key={`ex-file-${f.id ?? f.url ?? i}`}
                    className='works_file_item'
                  >
                    {f.url ? (
                      <MuiLink
                        href={f.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        underline='hover'
                      >
                        {f.name || 'файл'}
                      </MuiLink>
                    ) : (
                      <span>{f.name || 'файл'}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        <div className='works_files'>
          {files?.map((fileVal, idx) => {
            const inputId = `file-${idx}`;
            return (
              <div key={`file-${idx}`} className='works_row'>
                <TextField
                  sx={{ ...inputStyle, flex: 1 }}
                  label={`Файл #${idx + 1}`}
                  value={fileVal ? fileVal.name : ''}
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
            <Tooltip
              title={
                canAddMoreFiles ? 'Добавить файл' : 'Достигнут лимит файлов'
              }
            >
              <span>
                <IconButton
                  onClick={addFileField}
                  disabled={!canAddMoreFiles}
                  sx={{ color: '#fff' }}
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

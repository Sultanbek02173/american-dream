import { AnimatePresence, motion } from 'framer-motion';
import './works.scss';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { inputStyle } from '../../../../shared/utils/MuiStyles';

export const Works = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className='works'>
      <div className='works_home'>
        <div className='row works_home_header' onClick={() => setOpen(!open)}>
          <h2>Домашнее задание</h2>
          <p>Дедлайн: 16.06.2025 12:00</p>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className='works_home_content'>
                Домашнее задание: Настройка и использование Swagger для
                документации API Цель: Научиться подключать и настраивать
                Swagger-документацию в проекте Django REST Framework, а также
                описывать ручки и их поведение. Задача: Создай проект Django с
                приложением library (или используй существующий). Реализуй
                простую модель Book: class Book(models.Model):    title =
                models.CharField(max_length=100)    author =
                models.CharField(max_length=100)    published_date =
                models.DateField()    isbn = models.CharField(max_length=13)
                Настрой сериализаторы и ViewSet для Book. Подключи drf-yasg (или
                drf-spectacular) для Swagger-документации. Настрой доступ к
                Swagger UI по адресу /swagger/, а также Redoc по адресу /redoc/.
                Добавь описание к API методам (через @swagger_auto_schema или
                OpenAPI schema annotations). Сделай пример запроса/ответа в
                Swagger. (Дополнительно) Добавь JWT-авторизацию и настрой
                отображение кнопки "Authorize" в Swagger.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className='works_link'>
        <h2>Прикрепить домашнее задание</h2>
        <div className='works_link_input'>
          <TextField
            sx={inputStyle}
            id='outlined-basic'
            label='Ссылка на проект:'
            variant='outlined'
          />
          <p className='works_link_limit'>Максимум 5 ссылок</p>
        </div>

        <TextField
          sx={inputStyle}
          id='outlined-basic'
          label='Прикрепить файл:'
          variant='outlined'
        />
        <p className='works_link_limit'>Максимум 5 ссылок</p>
      </div>
    </section>
  );
};

import './login.scss';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  login: yup.string().required('Логин обязателен'),
  password: yup.string().required('Пароль обязателен'),
  role: yup
    .string()
    .oneOf(['admin', 'student', 'teacher'], 'Выберите роль')
    .required('Роль обязательна'),
});

export const Login = () => {
  const navigete = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = data => {
    Cookies.set('user_role', data.role, { expires: 1 });
    navigete(`/`);
    window.location.reload();
  };
  return (
    <div className='login'>
      <h2 className='login_logo'>AD</h2>

      <div className='login_cont'>
        <div className='login_cont_description'>
          <h1>American Dream</h1>
          <p>Образовательная платформа</p>
        </div>

        <form className='login_cont_form' onSubmit={handleSubmit(onSubmit)}>
          <h2>Войти в систему</h2>
          <p>Введите логин и пароль выданный администрацией</p>

          <input
            {...register('login')}
            type='text'
            placeholder='Введите логин'
          />
          {errors.login && <p className='errors'>{errors.login.message}</p>}
          <input
            {...register('password')}
            type='password'
            placeholder='Введите пароль'
          />
          {errors.password && (
            <p className='errors'>{errors.password.message}</p>
          )}

          <select {...register('role')}>
            <option value=''>Выберите роль</option>
            <option value='admin'>Администратор</option>
            <option value='student'>Студент</option>
            <option value='teacher'>Преподаватель</option>
          </select>
          {errors.role && <span className='error'>{errors.role.message}</span>}

          <button type='submit'>Войти</button>
        </form>
      </div>
    </div>
  );
};

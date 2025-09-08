import './login.scss';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../app/store/reducers/auth/AuthThunk';

const schema = yup
  .object({
    username: yup.string().required('Логин обязателен'),
    password: yup.string().required('Пароль обязателен'),
  })
  .noUnknown(true);

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema, { stripUnknown: true }),
  });

  const onSubmit = async ({ username, password }) => {
    try {
      await dispatch(userLogin({ username, password })).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className='login'>
      <h2 className='login_logo'>AD</h2>

      <div className='login_cont'>
        <div className='login_cont_description'>
          <h1>American Dream</h1>
          <p>7Образовательная платформа</p>
        </div>

        <form className='login_cont_form' onSubmit={handleSubmit(onSubmit)}>
          <h2>Войти в систему</h2>
          <p>Введите логин и пароль выданный администрацией</p>

          <input
            {...register('username')}
            type='text'
            placeholder='Введите логин'
          />
          {errors.username && (
            <p className='errors'>{errors.username.message}</p>
          )}
          <input
            {...register('password')}
            type='password'
            placeholder='Введите пароль'
          />
          {errors.password && (
            <p className='errors'>{errors.password.message}</p>
          )}

          <button type='submit'>Войти</button>
        </form>
      </div>
    </div>
  );
};

import './login.scss';
import * as yup from 'yup';
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
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema, { stripUnknown: true }),
  });

  const onSubmit = async ({ username, password }) => {
    try {
      clearErrors('root'); 
      await dispatch(userLogin({ username, password })).unwrap();
      navigate('/');
    } catch (e) {
      const err = e || {};
      const formMsg =
        (Array.isArray(err.non_field_errors) &&
          err.non_field_errors.join(' ')) ||
        err.detail ||
        err.message ||
        'Ошибка авторизации';

      setError('root.server', { type: 'server', message: formMsg });

      if (err.username) {
        const msg = Array.isArray(err.username)
          ? err.username.join(' ')
          : String(err.username);
        setError('username', { type: 'server', message: msg });
      }
      if (err.password) {
        const msg = Array.isArray(err.password)
          ? err.password.join(' ')
          : String(err.password);
        setError('password', { type: 'server', message: msg });
      }

      console.log('login error:', e);
    }
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
          <p>Введите логин и пароль, выданный администрацией</p>

          <input
            {...register('username')}
            type='text'
            placeholder='Введите логин'
            autoComplete='username'
          />
          {errors.username && (
            <p className='errors'>{errors.username.message}</p>
          )}

          <input
            {...register('password')}
            type='password'
            placeholder='Введите пароль'
            autoComplete='current-password'
          />
          {errors.password && (
            <p className='errors'>{errors.password.message}</p>
          )}

          {errors.root?.server?.message && (
            <p className='errors'>{errors.root.server.message}</p>
          )}

          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Входим…' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};

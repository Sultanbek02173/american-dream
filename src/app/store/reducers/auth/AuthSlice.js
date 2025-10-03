import { createSlice, createAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getYourSelf, logoutUser, userLogin } from './AuthThunk';

const COOKIE_LOGIN = 'login';
const COOKIE_ACCESS = 'access';
const COOKIE_ROLE = 'role';

export const setLogin = createAction('SET_LOGIN');

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const initialState = {
  loading: false,
  error: null,
  access: Cookies.get(COOKIE_ACCESS) || '',
  role: Cookies.get(COOKIE_ROLE) || null,
  login: safeParse(Cookies.get(COOKIE_LOGIN) || 'null'),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userLogin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.login = payload;
        state.access = payload?.access || '';
        state.role = payload?.role ?? null;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || {
          non_field_errors: 'Что-то пошло не так. Попробуйте снова.',
        };
      })
      .addCase(getYourSelf.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getYourSelf.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(getYourSelf.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || {
          non_field_errors: 'Что-то пошло не так. Попробуйте снова.',
        };
      })
      .addCase(logoutUser.fulfilled, state => {
        state.loading = false;
        state.error = null;
        state.access = '';
        state.role = null;
        state.login = null;
        state.user = null;
      })
      .addCase(setLogin, (state, { payload }) => {
        state.login = payload;
      });
  },
});

export const useAuth = () => useSelector(state => state.auth);
export default authSlice.reducer;

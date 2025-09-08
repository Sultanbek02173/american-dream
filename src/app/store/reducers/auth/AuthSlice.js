import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { userLogin } from './AuthThunk';

const initialState = {
  loading: false,
  error: null,
  access: '',
  access: localStorage.getItem('access') || '',
  login: JSON.parse(localStorage.getItem('login')) || null,
  user: null,
};

const SET_LOGIN = 'SET_LOGIN';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userLogin.pending, state => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.login = payload;
        state.access = payload?.access;
        state.access = payload?.role;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = true;
        if (payload) {
          state.error = payload;
        } else {
          state.error = { detail: 'Что-то пошло не так. Попробуйте снова.' };
        }
      })
      .addCase(SET_LOGIN, (state, { payload }) => {
        state.login = payload;
      });
  },
});

export const useAuth = () => useSelector(state => state.auth);
export const setLogin = createAction(SET_LOGIN);

export default authSlice.reducer;

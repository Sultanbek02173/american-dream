import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from '@reduxjs/toolkit';

import tabReducer from './reducers/tabSlice';
import adminHomeReducer from './admin/homeAdmin/homeAdminSlice';
import applicationAdminReducer from './admin/application/applicationSlice';
import authReducer from './reducers/auth/AuthSlice';
import scheduleReducer from './admin/schedule/scheduleSlice';

import { logoutUser, userLogin } from './reducers/auth/AuthThunk';

import Cookies from 'js-cookie';

const COOKIE_LOGIN = 'login';
const COOKIE_ACCESS = 'access';
const COOKIE_ROLE = 'role';

const isSecure =
  typeof window !== 'undefined' && window.location?.protocol === 'https:';
const cookieOptions = { expires: 7, sameSite: 'Lax', secure: isSecure };

const cookieMiddleware = createListenerMiddleware();

cookieMiddleware.startListening({
  matcher: isAnyOf(userLogin.fulfilled),
  effect: (action, listenerApi) => {
    const { login, access, role } = listenerApi.getState().auth;

    if (login !== undefined) {
      Cookies.set(COOKIE_LOGIN, JSON.stringify(login), cookieOptions);
    }
    if (access) {
      Cookies.set(COOKIE_ACCESS, access, cookieOptions);
    }
    if (role) {
      Cookies.set(COOKIE_ROLE, role, cookieOptions);
    }
  },
});

cookieMiddleware.startListening({
  matcher: isAnyOf(logoutUser.fulfilled),
  effect: () => {
    Cookies.remove(COOKIE_LOGIN);
    Cookies.remove(COOKIE_ACCESS);
    Cookies.remove(COOKIE_ROLE);
  },
});

export const store = configureStore({
  reducer: {
    tabs: tabReducer,
    adminHome: adminHomeReducer,
    auth: authReducer,
    applicationAdmin: applicationAdminReducer,
    schedule: scheduleReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(cookieMiddleware.middleware),
});

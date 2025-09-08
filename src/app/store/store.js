import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from '@reduxjs/toolkit';
import tabReducer from './reducers/tabSlice';
import authReducer from './reducers/auth/AuthSlice';
import { logoutUser, userLogin } from './reducers/auth/AuthThunk';

const localStorageMiddleware = createListenerMiddleware();
localStorageMiddleware.startListening({
  matcher: isAnyOf(userLogin.fulfilled),
  effect: (action, listenerApi) => {
    const { login, access } = listenerApi.getState().auth;

    if (login) localStorage.setItem('login', JSON.stringify(login));
    if (access) localStorage.setItem('access', access);
  },
});

localStorageMiddleware.startListening({
  matcher: isAnyOf(logoutUser.fulfilled),
  effect: () => {
    localStorage.removeItem('login');
    localStorage.removeItem('access');
  },
});

export const store = configureStore({
  reducer: {
    tabs: tabReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(localStorageMiddleware.middleware),
});

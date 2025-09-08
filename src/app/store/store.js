import { configureStore } from '@reduxjs/toolkit';
import tabReducer from './reducers/tabSlice';
import adminHomeReducer from './admin/homeAdmin/homeAdminSlice';

export const store = configureStore({
  reducer: {
    tabs: tabReducer,
    adminHome: adminHomeReducer,
  },
});

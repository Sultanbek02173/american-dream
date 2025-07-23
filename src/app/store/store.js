import { configureStore } from '@reduxjs/toolkit';
import tabReducer from './reducers/tabSlice';
export const store = configureStore({
  reducer: {
    tabs: tabReducer,
  },
});

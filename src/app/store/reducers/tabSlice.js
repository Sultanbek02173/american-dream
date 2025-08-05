import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const initialState = {};

const tabSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setActiveTab(state, action) {
      const { tabId, index } = action.payload;
      state[tabId] = index;
    },
  },
});

export const { setActiveTab } = tabSlice.actions;
export const useTabs = () => useSelector(state => state.tabs);
export default tabSlice.reducer;

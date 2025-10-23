import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const initialState = {
  selectedMonth: null,
};

const tabSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setActiveTab(state, action) {
      const { tabId, index } = action.payload;
      state[tabId] = index;
    },
    setSelectedMonth(state, action) {
      state.selectedMonth = action.payload;
    },
  },
});

export const { setActiveTab, setSelectedMonth } = tabSlice.actions;
export const useTabs = () => useSelector(state => state.tabs);
export const useSelectedMonth = () =>
  useSelector(state => state.tabs.selectedMonth);
export default tabSlice.reducer;

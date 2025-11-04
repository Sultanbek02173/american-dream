import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const initialState = {
  selectedMonth: null,
  studentAvailableMonths: [],
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
    setStudentAvailableMonths(state, action) {
      state.studentAvailableMonths = action.payload;
    },
  },
});

export const { setActiveTab, setSelectedMonth, setStudentAvailableMonths } =
  tabSlice.actions;
export const useTabs = () => useSelector(state => state.tabs);
export const useSelectedMonth = () =>
  useSelector(state => state.tabs.selectedMonth);
export const useStudentAvailableMonths = () =>
  useSelector(state => state.tabs.studentAvailableMonths);
export default tabSlice.reducer;

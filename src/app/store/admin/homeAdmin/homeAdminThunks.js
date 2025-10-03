import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../../services/axiosApi";

export const dashBoardGet = createAsyncThunk(
  'agents/get',
  async (role, { rejectWithValue }) => {
    try {
      if(role === 'Manager'){
        const { data } = await axiosApi.get(`/manager/admin-dashboard/`);  
        return data;
      }else{
        const { data } = await axiosApi.get(
          `/administration/admin-dashboard/`
        );
        return data;
      }
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
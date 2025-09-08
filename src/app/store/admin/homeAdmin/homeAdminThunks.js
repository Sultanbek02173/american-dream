import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../../service/Axios";


export const dashBoardGet = createAsyncThunk(
  'agents/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(
        `/administration/admin-dashboard/`
      );
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
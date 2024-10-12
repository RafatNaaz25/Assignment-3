import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStatistics = createAsyncThunk(
  'statistics/fetchStatistics',
  async (month) => {
    const response = await axios.get(`http://localhost:5000/statistics?month=${month}`);
    console.log("🚀 ~ response:", response)
    return response.data;
  }
);

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default statisticsSlice.reducer;
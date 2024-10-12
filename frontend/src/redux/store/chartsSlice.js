import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBarChartData = createAsyncThunk(
  'charts/fetchBarChartData',
  async (month) => {
    const response = await axios.get(`http://localhost:5000/bar-chart?month=${month}`);
    console.log("🚀 ~ response:", response)
    return response.data;
  }
);

export const fetchPieChartData = createAsyncThunk(
  'charts/fetchPieChartData',
  async (month) => {
    const response = await axios.get(`http://localhost:5000/pie-chart?month=${month}`);
    console.log("🚀 ~ response:", response)
    return response.data;
  }
);

const chartsSlice = createSlice({
  name: 'charts',
  initialState: {
    barChartData: [],
    pieChartData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBarChartData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBarChartData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.barChartData = action.payload;
      })
      .addCase(fetchBarChartData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPieChartData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPieChartData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pieChartData = action.payload;
      })
      .addCase(fetchPieChartData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default chartsSlice.reducer;
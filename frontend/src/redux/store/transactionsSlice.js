import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async ({ search, month, page, perPage }) => {
    const response = await axios.get(`http://localhost:5000/transactions?search=${search}&month=${month}&page=${page}&perPage=${perPage}`);
    console.log("🚀 ~ response:", response)
    return response.data;
  }
    
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    perPage: 10,
    totalRecords: 0,
    totalPages: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.transactions;
        state.currentPage = action.payload.currentPage;
        state.perPage = action.payload.perPage;
        state.totalRecords = action.payload.totalRecords;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default transactionsSlice.reducer;
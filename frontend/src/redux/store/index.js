import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice';
import statisticsReducer from './statisticsSlice';
import chartsReducer from './chartsSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    statistics: statisticsReducer,
    charts: chartsReducer,
  },
});
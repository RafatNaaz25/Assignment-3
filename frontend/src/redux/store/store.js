import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice';
import statisticsReducer from './statisticsSlice';
import chartsReducer from './chartsSlice';

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    statistics: statisticsReducer,
    charts: chartsReducer,
  },
});

export default store;
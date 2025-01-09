import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWithAuth } from '../../Util';

const ACCOUNT_BATCH_HOST = process.env.REACT_APP_ACCOUNT_BATCH_HOST;

// Async thunk for API call
export const fetchDashboardMetrics = createAsyncThunk('data/dashboardMetrics', async (_, { getState }) => {
    console.log("api url ",ACCOUNT_BATCH_HOST);
    const { month, year } = getState().userInput; // Access state
  const response = await fetchWithAuth(`${ACCOUNT_BATCH_HOST}/dashboard-metrics?month=${month}&year=${year}`);
    const data = await response.json()
  return data;
});

const dashboardMetricsSlice = createSlice({
  name: 'data',
  initialState: {
    totalOrders:0,
    totalPayments:0,
    totalLoss:0,
    totalProfit:0,
    netProfit:0,
    month:12,
    year:2024,
    loading: false, 
    error: null,
  },
  reducers: {}, // You can add non-async reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.totalProfit = Math.round(action.payload.totalProfit);
        state.totalOrders = Math.round(action.payload.totalOrders);
        state.totalPayments = Math.round(action.payload.totalPayments);
        state.totalLoss = Math.round(action.payload.totalLoss);
        state.netProfit = Math.round(action.payload.totalProfit + action.payload.totalLoss)
        state.month = action.payload.month;
        state.year = action.payload.year;
      })
      .addCase(fetchDashboardMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dashboardMetricsSlice.reducer;

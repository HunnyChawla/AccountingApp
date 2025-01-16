import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWithAuth } from '../../Util';

const ACCOUNT_BATCH_HOST = process.env.REACT_APP_ACCOUNT_BATCH_HOST;

// Async thunk for API call by year (returns array of data for the whole year)
export const fetchDashboardMetricsByYear = createAsyncThunk('data/dashboardMetricsByYear', async (_, { getState }) => {
    // Async thunk for API call
    console.log("api url ",ACCOUNT_BATCH_HOST);
    const { month, year } = getState().userInput; // Access state
  const response = await fetchWithAuth(`${ACCOUNT_BATCH_HOST}/dashboard-metrics/byYear?year=${year}`);
  const data = await response.json();
  return data;
});

const dashboardMetricsSlice = createSlice({
  name: 'data',
  initialState: {
    totalOrders: 0,
    totalPayments: 0,
    totalLoss: 0,
    totalProfit: 0,
    netProfit: 0,
    yearData: [], // Array to store the yearly data
    month: 12, // Default to December
    year: 2024,
    loading: false,
    error: null,
  },
  reducers: {
    fetchDashboardMetricsByMonth: (state, action) => {
        console.log("state in setMonth",action.payload);
        console.log("state.month before setting :: ",state.month);
      state.month = action.payload; // Allows setting the current month from the data
      console.log("state.month after setting :: ",state.month);
      const selectedMonthData = state.yearData.find(item => item.month === state.month);

      if (selectedMonthData) {
        // Update monthly metrics when a month is selected
        state.totalOrders = Math.round(selectedMonthData.totalOrders);
        state.totalPayments = Math.round(selectedMonthData.totalPayments);
        state.totalLoss = Math.round(selectedMonthData.totalLoss);
        state.totalProfit = Math.round(selectedMonthData.totalProfit);
        state.netProfit = Math.round(selectedMonthData.totalProfit + selectedMonthData.totalLoss);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardMetricsByYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardMetricsByYear.fulfilled, (state, action) => {
        state.loading = false;
        state.yearData = action.payload; // Set the entire year data
        // state.month = action.payload.length ? action.payload[0].month : 12; // Default to first month if data exists
        // state.year = action.payload.length ? action.payload[0].year : 2024; // Default to current year if data is empty

        // Set default monthly metrics for the first available month
        const selectedMonthData = action.payload.find(item => item.month === state.month);
        if (selectedMonthData) {
          state.totalOrders = Math.round(selectedMonthData.totalOrders);
          state.totalPayments = Math.round(selectedMonthData.totalPayments);
          state.totalLoss = Math.round(selectedMonthData.totalLoss);
          state.totalProfit = Math.round(selectedMonthData.totalProfit);
          state.netProfit = Math.round(selectedMonthData.totalProfit + selectedMonthData.totalLoss);
        }
        else {
          state.totalOrders = 0;
          state.totalPayments = 0;
          state.totalLoss = 0;
          state.totalProfit = 0;
          state.netProfit = 0;
        }
      })
      .addCase(fetchDashboardMetricsByYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { fetchDashboardMetricsByMonth } = dashboardMetricsSlice.actions;

export default dashboardMetricsSlice.reducer;

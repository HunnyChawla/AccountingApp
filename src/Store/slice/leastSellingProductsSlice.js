import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWithAuth } from '../../Util';

const ACCOUNT_BATCH_HOST = process.env.REACT_APP_ACCOUNT_BATCH_HOST;

// Async thunk for API call by year (returns array of data for the whole year)
export const fetchLeastSellingProducts = createAsyncThunk('data/leastSellingProductsData', async (_, { getState }) => {
    // Async thunk for API call
    console.log("api url ",ACCOUNT_BATCH_HOST);
    const { month, year } = getState().userInput; // Access state
    const response = await fetchWithAuth(`${ACCOUNT_BATCH_HOST}/top5ProductsWithLeastOrders?year=${year}&month=${month}`);
    const data = await response.json();
    return data;
});

const leastSellingProductsSlice = createSlice({
  name: 'leastSellingProductsData',
  initialState: {
    leastSellingProductsData: [], // Array to store the yearly data
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeastSellingProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeastSellingProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.leastSellingProductsData = action.payload; // Set the entire year data
      })
      .addCase(fetchLeastSellingProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default leastSellingProductsSlice.reducer;

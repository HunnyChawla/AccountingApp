import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWithAuth } from '../../Util';

const ACCOUNT_APP_API_URL = process.env.REACT_APP_ACCOUNT_APP_API_URL;

// Async thunk for API call
export const fetchCountByOrderStatus = createAsyncThunk('data/ordersCountByStatus', async (_, { getState }) => {
    console.log("api url ",ACCOUNT_APP_API_URL);
    const { month, year } = getState().userInput; // Access state
  const response = await fetchWithAuth(`${ACCOUNT_APP_API_URL}/orders/countByOrderStatus?month=${month}&year=${year}`);
    const data = await response.json()
  return data;
});

const orderCountSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {}, // You can add non-async reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountByOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountByOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCountByOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderCountSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWithAuth } from '../../Util';

const ACCOUNT_APP_API_URL = process.env.REACT_APP_ACCOUNT_APP_API_URL;

// Async thunk for API call
export const fetchOrdersData = createAsyncThunk('data/ordersData', async (_, { getState }) => {
    console.log("api url ",ACCOUNT_APP_API_URL);
    const { month, year } = getState().userInput; // Access state
  const response = await fetchWithAuth(`${ACCOUNT_APP_API_URL}/orders?month=${month}&year=${year}`);
    const data = await response.json()
  return data.ordersData;
});

const ordersSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {}, // You can add non-async reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrdersData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;

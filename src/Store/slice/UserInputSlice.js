import { createSlice } from '@reduxjs/toolkit';

// Get the current date
const currentDate = new Date();
const previousMonth = currentDate.getMonth() === 0 ? 12 : currentDate.getMonth(); // If January, set to December
const previousYear = currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();

const initialState = {
  month: previousMonth, // Set to the previous month
  year: previousYear,   // Adjust year if necessary
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setMonth: (state, action) => {
      state.month = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setDate: (state, action) => {
      const { month, year } = action.payload;
      state.month = month;
      state.year = year;
    },
  },
});

export const { setMonth, setYear, setDate } = dateSlice.actions;
export default dateSlice.reducer;

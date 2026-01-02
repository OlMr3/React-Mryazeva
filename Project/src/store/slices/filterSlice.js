// store/slices/filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genre: '',
  searchQuery: '',
  page: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setGenre: (state, action) => {
      state.genre = action.payload;
      state.page = 1;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
            state.page = action.payload;
        },
    clearFilters: (state) => {
      return initialState;
    }
  }
});

export const { setGenre, setSearchQuery, setPage, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { fetchBooks, fetchPromoSlides, fetchBookById } from './firebaseThunks'; // Импортируем новый thunk

const collectionsSlice = createSlice({
  name: 'collections',
  initialState: {
    books: { 
      data: [], 
      loading: false, 
      error: null,
      currentBook: null,
    },
    promoSlides: { data: [], loading: false, error: null },
  },
  reducers: {
    clearCurrentBook: (state) => {
      state.books.currentBook = null;
    },
    setCachedBooks: (state, action) => {

  const currentBooks = state.books?.data || [];
  const newBooks = action.payload;
  
  if (currentBooks.length !== newBooks.length || 
      JSON.stringify(currentBooks) !== JSON.stringify(newBooks)) {
    state.books = {
      ...state.books,
      data: newBooks,
      loading: false
    };
  }
}
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.books.loading = true;
        state.books.error = null;
      })
     .addCase(fetchBooks.fulfilled, (state, action) => {
  console.log('📚 REDUCER: fetchBooks.fulfilled');
  
  state.books.loading = false;
  
  const newBooks = action.payload;
  const currentBooks = state.books.data || [];
  
  if (currentBooks.length > 0 && 
      JSON.stringify(currentBooks) === JSON.stringify(newBooks)) {
    console.log('✅ REDUCER: Данные идентичны - сохраняем ссылку');
    return;
  }
  
  console.log('🔄 REDUCER: Данные новые или изменились - обновляем');
  state.books.data = newBooks;

})

      .addCase(fetchBooks.rejected, (state, action) => {
        state.books.loading = false;
        state.books.error = action.payload;
      });
   
    builder
      .addCase(fetchPromoSlides.pending, (state) => {
        state.promoSlides.loading = true;
        state.promoSlides.error = null;
      })
      .addCase(fetchPromoSlides.fulfilled, (state, action) => {
        state.promoSlides.loading = false;
        state.promoSlides.data = action.payload;
      })
      .addCase(fetchPromoSlides.rejected, (state, action) => {
        state.promoSlides.loading = false;
        state.promoSlides.error = action.payload;
      });
    
    builder
      .addCase(fetchBookById.pending, (state) => {
        state.books.loading = true;
        state.books.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.books.loading = false;
        state.books.currentBook = action.payload; 
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.books.loading = false;
        state.books.error = action.payload;
        state.books.currentBook = null; 
      });
  },
});

export const { clearCurrentBook, setCachedBooks } = collectionsSlice.actions;
export default collectionsSlice.reducer;




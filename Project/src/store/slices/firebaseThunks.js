import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs, collection, getDoc, doc  } from 'firebase/firestore';
import { db } from '../../firebase';

const createFirebaseThunk = (name, collectionName) => 
  createAsyncThunk(
    name,
    async (_, { rejectWithValue }) => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const result = querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        return result;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export const fetchBooks = createFirebaseThunk('books/fetchBooks', 'books');
export const fetchPromoSlides = createFirebaseThunk('promo/fetchPromoSlides', 'PromoSlides');

export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async (bookId, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'books', bookId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const result = { id: docSnap.id, ...docSnap.data() };
        return result;
      } else {
        return rejectWithValue('Книга не найдена');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


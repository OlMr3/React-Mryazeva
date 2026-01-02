
/*import { createAsyncThunk } from '@reduxjs/toolkit';
const createFirebaseThunk = (name, collectionName) => 
  createAsyncThunk(
    name,
    async (firebaseService, { rejectWithValue }) => {
      try {
        const { getDocs, collection, db } = firebaseService;
        const querySnapshot = await getDocs(collection(db, collectionName));
        return querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export const fetchBooks = createFirebaseThunk('books/fetchBooks', 'books');
export const fetchPromoSlides = createFirebaseThunk('promo/fetchPromoSlides', 'PromoSlides');
*/

// firebaseThunks.js
/*РАБОЧЕЕ
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs, collection, getDoc, doc  } from 'firebase/firestore';
import { db } from '../../firebase';

const createFirebaseThunk = (name, collectionName) => 
  createAsyncThunk(
    name,
    async (_, { rejectWithValue }) => { // Убрали параметр firebaseService
      try {
        // Используем импортированные сервисы напрямую
      
        const querySnapshot = await getDocs(collection(db, collectionName));
        return querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }

  );

export const fetchBooks = createFirebaseThunk('books/fetchBooks', 'books');
export const fetchPromoSlides = createFirebaseThunk('promo/fetchPromoSlides', 'PromoSlides');

export const fetchBookById = createAsyncThunk(
  'books/fetchBookById', // Имя действия
  async (bookId, { rejectWithValue }) => { // Принимаем ID книги как аргумент
    try {
      // Создаем ссылку на конкретный документ в коллекции 'books'
      const docRef = doc(db, 'books', bookId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Если документ найден, возвращаем его данные
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        // Если документ не найден, возвращаем ошибку
        return rejectWithValue('Книга не найдена');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
); КОНЕЦ*/

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


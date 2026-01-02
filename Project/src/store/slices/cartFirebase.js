// store/firebase/cartFirebase.js
import { doc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

export const getUserCartRef = (userId) => doc(collection(db, 'carts'), userId);

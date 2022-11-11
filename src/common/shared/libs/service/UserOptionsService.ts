import {
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';

import { Recipe } from '../types/recipe';
import { db, auth } from '../config/firebase';
import type { Bookmark } from '@lib/types/bookmark';

class UserOptions {
  async createBookmark(id: string) {}
  async getBookmarks(id: string) {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Bookmark;
      return data;
    } else {
      return {};
    }
  }
  async setSettings(id: string) {
    return 'set user settings';
  }
  async getSettings(id: string) {
    return 'user settings';
  }
}

export default new UserOptions();

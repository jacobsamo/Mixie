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

import { Recipe } from 'libs/types';
import { db, auth } from '@lib/config/firebase';
import type { Bookmark } from 'libs/types';

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

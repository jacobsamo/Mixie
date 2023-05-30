import { auth, db } from '@lib/config/firebase';
import { ToolbarTypeMap } from '@mui/material';
import { onAuthStateChanged, updateProfile, getIdToken } from 'firebase/auth';
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
  where,
  Timestamp,
  addDoc,
} from 'firebase/firestore';
import { User as FirebaseUser } from 'firebase/auth';
import { SimplifiedRecipe, User } from 'libs/types';

class UserService {
  async getUserByUserName(userName: string) {
    const usersCollection = collection(db, 'users');
    const userQuery = query(
      usersCollection,
      where('userName', '==', userName),
      limit(1)
    );
    const userQuerySnapshot = await getDocs(userQuery);

    if (userQuerySnapshot.empty) {
      console.log('No matching documents.');
      return null;
    }

    const userData = userQuerySnapshot.docs[0].data() as User;
    return JSON.parse(JSON.stringify(userData));
  }

  async getUser(uid: string) {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data() as User;
      return JSON.parse(JSON.stringify(userData));
    } else {
      return {};
    }
  }

  async getAllUsers() {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users: User[] = [];
    querySnapshot.forEach((user) => {
      const userData = user.data() as User;
      users.push(userData);
    });
    return users;
  }

  async updateUser(data: any) {
    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, 'users', user?.uid);
        if (
          user.displayName !== data.displayName ||
          user.photoURL !== data.photoURL
        ) {
          await updateProfile(user, data);
          return { message: 'Successfully updated user', status: 200 };
        }
        await updateDoc(docRef, data);
      } catch (error) {
        console.error(error);
        return { message: `There was an error: ${error}`, status: 400 };
      }
    }
  }

  async createBookmark(
    recipeDoc: SimplifiedRecipe
  ): Promise<{ message: string; status: number }> {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(
        collection(doc(db, 'users', user.uid), 'bookmarks'),
        recipeDoc.id
      );
      await setDoc(docRef, recipeDoc);
      return { message: 'Successfully created bookmark', status: 200 };
    }
    return { message: 'User not authenticated', status: 401 };
  }

  async getBookmarks(user: User): Promise<SimplifiedRecipe[]> {
    if (user) {
      const querySnapshot = await getDocs(
        collection(doc(db, 'users', user.uid), 'bookmarks')
      );
      const recipes: SimplifiedRecipe[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as SimplifiedRecipe;
        recipes.push(data);
      });
      return recipes;
    }
    return [];
  }

  async createRecipe(
    recipeDoc: SimplifiedRecipe
  ): Promise<{ message: string; status: number }> {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(
        collection(doc(db, 'users', user.uid), 'recipes'),
        recipeDoc.id
      );
      await setDoc(docRef, recipeDoc);
      return { message: 'Successfully created recipe', status: 200 };
    }
    return { message: 'User not authenticated', status: 401 };
  }
}

export default new UserService();

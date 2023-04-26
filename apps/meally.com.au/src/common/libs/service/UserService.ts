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
} from 'firebase/firestore';
import { User } from 'libs/types';

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
    const user = { ...userData, createdAt: userData.createdAt.toDate() };
    return JSON.parse(JSON.stringify(user));
  }

  async getUser(uid: string) {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data() as User;
      const user = { ...userData, createdAt: userData.createdAt.toDate() };
      return JSON.parse(JSON.stringify(user));
    } else {
      return {};
    }
  }

  async getAllUsers() {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users: User[] = [];
    querySnapshot.forEach((user) => {
      const data = user.data() as User;
      data.createdAt.toDate();
      users.push({ ...data });
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
}

export default new UserService();

import { auth, db } from '@lib/config/firebase';
import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  UserCredential,
  UserInfo,
  User,
} from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

class AuthService {
  async createUserDoc(user: User) {
    if (user) {
      {
        try {
          const userDoc = {
            uid: user.uid,
            displayName: user.displayName,
            userName: `@${user.displayName?.toLowerCase().replace(' ', '').trim()}`,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: Timestamp.now(),
          };
          await setDoc(doc(db, 'users', user.uid), userDoc)
          return { message: 'User document created successfully', status: 200 };
        } catch (e: any) {
          console.error('Error creating user document: ', e);
          return { message: e, status: 400 };
        }
      }
    }
    return null;
  }

  async signInWithGoogle() {
    const credential = signInWithPopup(auth, new GoogleAuthProvider());
    return credential;
  }

  async signInWithGithub() {
    const credential = signInWithPopup(auth, new GithubAuthProvider());
    return credential;
  }

  async signInWithFacebook() {
    const credential = signInWithPopup(auth, new FacebookAuthProvider());
    return credential;
  }

  async signInWithTwitter() {
    const credential = signInWithPopup(auth, new TwitterAuthProvider());
    return credential;
  }

  async signOutUser() {
    await signOut(auth);
  }
  async getUserInfo() {
    if (auth.currentUser) {
      return auth.currentUser.photoURL;
    }
    return 'https://unsplash.com/photos/K4mSJ7kc0As';
  }
}

export default new AuthService();

import { auth, db } from '@lib/config/firebase';
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { User } from 'libs/types';

class AuthService {
  async createUserDoc(user: FirebaseUser) {
    if (user) {
      {
        try {
          const userDoc = {
            uid: user.uid,
            displayName: user.displayName,
            userName: `@${user.displayName
              ?.toLowerCase()
              .replace(' ', '')
              .trim()}`,
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            createdAt: Timestamp.now(),
            bio: '',
            preferences: {},
            settings: {},
            socials: {},
          } as User;
          await setDoc(doc(db, 'users', user.uid), userDoc);
          await localStorage.setItem('user', JSON.stringify(userDoc));
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
    await localStorage.removeItem('user');
  }
}

export default new AuthService();

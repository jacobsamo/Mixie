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
import { User, Theme, Font } from 'libs/types';
import { setCookie, deleteCookie } from 'cookies-next';

class AuthenticationService {
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
            preferences: {
              theme: Theme.SYSTEM,
              font: Font.DEFAULT,
            },
            settings: {},
            socials: {},
          } as User;

          await setCookie('user', JSON.stringify(userDoc), {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          });
          await setDoc(doc(db, 'users', user.uid), userDoc);
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
    const credential = await signInWithPopup(auth, new GoogleAuthProvider());
    return credential;
  }

  async signInWithGithub() {
    const credential = await signInWithPopup(auth, new GithubAuthProvider());
    return credential;
  }

  async signInWithFacebook() {
    const credential = await signInWithPopup(auth, new FacebookAuthProvider());
    return credential;
  }

  async signInWithTwitter() {
    const credential = await signInWithPopup(auth, new TwitterAuthProvider());
    return credential;
  }

  async signOutUser() {
    await signOut(auth);
    await deleteCookie('user');
  }
}

export default new AuthenticationService();

import { db, auth } from '@lib/config/firebase';
import type { UserCredential } from 'firebase/auth';
import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';

class AuthService {
    async signInWithGoogle() {
      const credential = signInWithPopup(auth, new GoogleAuthProvider());
      return credential;
    };
    
    async signInWithGithub() {
      const credential = signInWithPopup(auth, new GithubAuthProvider());
      return credential;
    };
    
    async signInWithFacebook() {
      const credential = signInWithPopup(auth, new FacebookAuthProvider());
      return credential;
    };
    
    async signOutUser() {
        await signOut(auth)
    }    
    async getUserInfo() {
      if (auth.currentUser === null) {
        return 'https://unsplash.com/photos/K4mSJ7kc0As'
      } else {
        return auth.currentUser.photoURL
      }
    }
}

export default new AuthService();

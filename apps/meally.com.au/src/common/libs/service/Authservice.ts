import { auth } from '@lib/config/firebase';
import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  UserCredential,
} from 'firebase/auth';

class AuthService {
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

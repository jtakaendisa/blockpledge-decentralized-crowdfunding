import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  User,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { AuthUser } from '../store';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MSG_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

const createAuthUser = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

const createUserDocument = async (
  userAuth: User,
  accountType: string,
  wallet: string = '',
  following: number[] = [],
  backed: number[] = []
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        accountType,
        wallet,
        following,
        backed,
      });
    } catch (error) {
      console.log('error creating the user', (error as Error).message);
    }
  }

  return userDocRef;
};

const followProject = async (
  userAuth: AuthUser,
  projectId: number,
  isFollowing?: boolean
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    const { following } = userAuth;
    let newFollowing;

    if (isFollowing) {
      newFollowing = following.filter((follow) => follow !== projectId);
    } else {
      newFollowing = [...following, projectId];
    }

    const data = {
      following: newFollowing,
    };

    try {
      await updateDoc(userDocRef, data);
    } catch (error) {
      console.log('error updating following list', (error as Error).message);
    }
  }

  return userDocRef;
};

const backProjectFirebase = async (userAuth: AuthUser, projectId: number) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    const { backed } = userAuth;

    if (backed.includes(projectId)) return;

    const newBacked = [...backed, projectId];

    const data = {
      backed: newBacked,
    };

    try {
      await updateDoc(userDocRef, data);
    } catch (error) {
      console.log('error updating backed list', (error as Error).message);
    }
  }

  return userDocRef;
};

const signInAuthUser = async (email: string, password: string) => {
  if (!email || !password) return;

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    return user;
  } catch (error) {
    console.log('Error during sign-in:', (error as Error).message);
  }
};

const signOutAuthUser = async () => await signOut(auth);

const authStateChangeListener = (callback: any) => onAuthStateChanged(auth, callback);

const formatAuthUserData = async (user: User) => {
  if (!user) return null;

  // Fetch additional user data
  const userDocRef = doc(db, 'users', user.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    // Merge additional user data with userCredential.user object
    const userData = userSnapshot.data();
    const completeUser = {
      ...user,
      ...userData,
    } as AuthUser;

    return completeUser;
  }

  return null;
};

export {
  createAuthUser,
  createUserDocument,
  followProject,
  backProjectFirebase,
  signInAuthUser,
  signOutAuthUser,
  authStateChangeListener,
  formatAuthUserData,
};

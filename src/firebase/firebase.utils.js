import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
  apiKey: "AIzaSyAgm8telfi4Yg0QSp9ZGBFwITHWdMVIwJM",
  authDomain: "crown-db-9ff61.firebaseapp.com",
  projectId: "crown-db-9ff61",
  storageBucket: "crown-db-9ff61.appspot.com",
  messagingSenderId: "854289194263",
  appId: "1:854289194263:web:e4711f98bd8427a82feb52",
  measurementId: "G-LN4S5JRV3W"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

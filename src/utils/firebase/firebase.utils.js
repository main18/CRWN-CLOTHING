import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwgwRdjy0CBI-flS-d4vt5M3OrnlJFeNE",
  authDomain: "crwn-clothing-db-271c2.firebaseapp.com",
  projectId: "crwn-clothing-db-271c2",
  storageBucket: "crwn-clothing-db-271c2.appspot.com",
  messagingSenderId: "1052857558292",
  appId: "1:1052857558292:web:0c5c22f923cafd6c2f0e01",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signinWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("there was a problem creating the user", error);
    }
  }

  return userDocRef;
};

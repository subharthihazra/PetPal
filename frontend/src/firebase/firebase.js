// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC0NJUaquJE01yBIgXgaEQkXaXOdEjeXv8",
    authDomain: "petpal-a1.firebaseapp.com",
    projectId: "petpal-a1",
    storageBucket: "petpal-a1.appspot.com",
    messagingSenderId: "767825229890",
    appId: "1:767825229890:web:db0114774a1a3d2a3555db",
    measurementId: "G-W6QVRXFXG1"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
const auth = getAuth();

async function LoginWithEmail(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    console.log(user);
    return user;
  } catch (error) {
    console.log(error.message);
    throw error; // Re-throw the error so it can be caught in the calling function
  }
}

async function SignupWithEmail(email, password) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    return user;
  } catch (error) {
    // Handle signup error (e.g., display an error message to the user)
    console.error(error);
    throw error; // Re-throw the error so it can be caught in the calling function
  }
}

async function LoginWithGoogle() {
  auth.languageCode = "it";

  try {
    const data = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(data);
    const token = credential.accessToken;

    const user = data.user;
    console.log(user);
    //  //from here we will send data to backend to store the email
    const info = getAdditionalUserInfo(data).isNewUser; //If this is true we will send the mail along with uid of firebase and uuid of chat
    //  // If this is false we will just user the access token...
    console.log(info);

    return { status: "true", user, info };
  } catch (error) {
    console.log(error.message);
    return { status: "false" };
  }
}

async function SignOut() {
  await signOut(auth);
}

export { LoginWithGoogle, LoginWithEmail, SignupWithEmail, SignOut };
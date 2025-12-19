import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBGap_2dKISlOSTfZm5YuJeU5BNGzBGR-0",
    authDomain: "beta-beat.firebaseapp.com",
    projectId: "beta-beat",
    storageBucket: "beta-beat.firebasestorage.app",
    messagingSenderId: "162898548818",
    appId: "1:162898548818:web:d9224344603c5442bee78b",
    measurementId: "G-XDRYNXPS73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

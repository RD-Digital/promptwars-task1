import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Defensive check to avoid crash if env vars are missing
let app;
let analyticsInstance = null;
let authInstance = null;
let googleProvider = null;

try {
    if (firebaseConfig.apiKey) {
        app = initializeApp(firebaseConfig);
        authInstance = getAuth(app);
        googleProvider = new GoogleAuthProvider();
        
        // Initialize Analytics conditionally to avoid crash in environments where it's not supported
        isSupported().then(supported => {
            if (supported) {
                analyticsInstance = getAnalytics(app);
            }
        }).catch(err => console.warn("Analytics not supported:", err));
    } else {
        console.warn("Firebase API Key missing. Firebase features will be disabled.");
    }
} catch (error) {
    console.error("Firebase initialization failed:", error);
}

export const db = app ? getFirestore(app) : null;
export const auth = authInstance;
export const provider = googleProvider;
export const getAnalyticsInstance = () => analyticsInstance;
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.development.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.development.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.development.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.development.VITE_FIREBASE_STORAGE_BUCKET,
  appId: import.meta.env.development.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

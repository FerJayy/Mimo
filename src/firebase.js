import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpQumljg4huoC2T_2QT_xLwM7yXZOlYNw",
  authDomain: "mimo-822e2.firebaseapp.com",
  projectId: "mimo-822e2",
  storageBucket: "mimo-822e2.firebasestorage.app",
  messagingSenderId: "805165532427",
  appId: "1:805165532427:web:9e8de4d7803210c3bb0e0e",
  measurementId: "G-48LE6DHBN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication
export const auth = getAuth(app);
export default app;
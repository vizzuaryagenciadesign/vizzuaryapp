// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwdI6UCJtaABcF0LA8A78JVD1TDNHy7pA",
  authDomain: "vizzuary-backend.firebaseapp.com",
  projectId: "vizzuary-backend",
  storageBucket: "vizzuary-backend.firebasestorage.app",
  messagingSenderId: "607215510043",
  appId: "1:607215510043:web:c2ad580ef64a5bbe304ebe"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
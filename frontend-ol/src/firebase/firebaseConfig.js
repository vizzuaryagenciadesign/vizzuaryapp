// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwdI6UCJtaABcF0LA8A78JVD1TDNHy7pA",
  authDomain: "vizzuary-backend.firebaseapp.com",
  projectId: "vizzuary-backend",
  storageBucket: "vizzuary-backend.firebasestorage.app",
  messagingSenderId: "607215510043",
  appId: "1:607215510043:web:c2ad580ef64a5bbe304ebe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
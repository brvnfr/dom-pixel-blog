// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3tp9wzkWk_UcgzEhzz4LOJhMK2K_jeOM",
  authDomain: "dom-pixel-blog-test.firebaseapp.com",
  databaseURL: "https://dom-pixel-blog-test-default-rtdb.firebaseio.com",
  projectId: "dom-pixel-blog-test",
  storageBucket: "dom-pixel-blog-test.appspot.com",
  messagingSenderId: "752608102258",
  appId: "1:752608102258:web:87d73ef5d9e51dd00e3feb",
  measurementId: "G-1PJN98S52K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
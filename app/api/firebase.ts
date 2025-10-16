import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCX-S_xB6Nb61nT_BqaPNnFncE2Vzmg7UY",
  authDomain: "nutripass-defbb.firebaseapp.com",
  databaseURL: "https://nutripass-defbb-default-rtdb.firebaseio.com", // ✅ seu Realtime
  projectId: "nutripass-defbb",
  storageBucket: "nutripass-defbb.firebasestorage.app",
  messagingSenderId: "435570448865",
  appId: "1:435570448865:web:3477dd404627a741785aa0",
  measurementId: "G-9YKT3W9YH9",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const database = getDatabase(app)
export const storage = getStorage(app)

export default app

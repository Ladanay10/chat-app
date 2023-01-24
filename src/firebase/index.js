import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
	apiKey: "AIzaSyAdJDhDD5vR9wCJxr7Z5pAsIzQwqefkGwI",
	authDomain: "chat-app-3b7ed.firebaseapp.com",
	projectId: "chat-app-3b7ed",
	storageBucket: "chat-app-3b7ed.appspot.com",
	messagingSenderId: "430063775362",
	appId: "1:430063775362:web:f945fc6d931c845381ce9b"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore();
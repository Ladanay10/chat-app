import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
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

export const Context = createContext(null);

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Context.Provider value={{
		auth,
		app,
		firestore,
	}}>
		<BrowserRouter>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</BrowserRouter>
	</Context.Provider>
);


import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { auth, app, firestore } from './firebase';
import 'react-toastify/dist/ReactToastify.css';

export const Context = createContext(null);

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
				<ToastContainer
					position="top-center"
					autoClose={1000}
					closeOnClick
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
				/>
			</React.StrictMode>
		</BrowserRouter>
	</Context.Provider>
);


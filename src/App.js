import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Context } from '.';
import Chat from './pages/Chat/Chat';
import Login from './pages/Login/Login';
import './App.scss';

const App = () => {
	const { auth } = useContext(Context);
	const [user] = useAuthState(auth);
	return (
		<Routes>
			<Route path='/' element={user ? <Chat /> : <Login />} />
			<Route path='/login ' element={user ? <Navigate to={'/'} replace /> : <Login />} />
		</Routes>
	)
}

export default App

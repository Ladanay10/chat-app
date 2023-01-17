import React, { useContext } from 'react';
import { Context } from '../../index';
import './login.scss';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
	const { auth } = useContext(Context);
	const login = async (e) => {
		e.preventDefault();
		const provider = new GoogleAuthProvider();
		const { user } = await signInWithPopup(auth, provider)
		console.log(user);
	}

	return (
		<div className='login_content'>
			<h1>Будь ласка, ввійдіть за допомогою гугл акаунта</h1>
			<button onClick={login}>Ввійти через google акаунт</button>
		</div>
	)
}

export default Login

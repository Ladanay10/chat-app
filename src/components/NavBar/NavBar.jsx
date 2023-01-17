import React, { useContext } from 'react';
import { Context } from '../..';
import './navBar.scss';
import logout from '../../assets/logout.svg';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
export const NavBar = () => {
	const { auth } = useContext(Context);
	const [user] = useAuthState(auth);
	return (
		<nav className='navBar'>
			<div className='user_info'>
				<img src={user.photoURL} alt="" />
				<div>
					<span>{user.displayName}</span>
					<p>Online</p>
					<div className='online_icon'></div>
				</div>
			</div>
			<img src={logout} onClick={() => signOut(auth)} alt="logout" />
		</nav>
	)
}

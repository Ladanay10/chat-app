import React, { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../..';
import './message.scss';

const Message = ({ children, value }) => {
	const { auth } = useContext(Context)
	const [user] = useAuthState(auth);
	return (

		<div className={value.uid === user.uid ? ' message_user message' : 'message'}>
			<img src={value.photoURL} alt="photoURL" />
			<div>
				<h2>{value.displayName}</h2>
				{children}
			</div>
		</div>
	)
}

export default Message

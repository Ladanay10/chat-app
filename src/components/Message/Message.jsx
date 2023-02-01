import React, { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../..';

import './message.scss';

const Message = ({ value }) => {
	const { auth } = useContext(Context);
	const [user] = useAuthState(auth);
	return (
		<>
			<div className={value.uid === user.uid ? 'message__img' : ''}>
				{
					value.imageURL &&
					<img className='images' src={value.imageURL} alt="IMG" />
				}
			</div>
			<div className={value.uid === user.uid ? ' message_user message' : 'message'}>
				<img src={value.photoURL} alt="photoURL" />
				<div className='message__text'>
					<h2>{value.displayName}</h2>
					<div className='text'>{value.text}</div>
					<span className='date'>{value.date}</span>
				</div>
			</div>

		</>


	)
}

export default Message;

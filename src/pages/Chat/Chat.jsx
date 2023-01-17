import { addDoc, collection, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from '../..';
import { Loader } from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import { NavBar } from '../../components/NavBar/NavBar';
import './chat.scss'
const Chat = () => {
	const { auth, firestore } = useContext(Context);
	const [user] = useAuthState(auth);
	const [inputValue, setInputValue] = useState('');
	const [messages, loading] = useCollectionData(
		query(collection(firestore, 'messages'), orderBy('createdAt'))
	)
	const handleChange = (e) => {
		setInputValue(e.target.value);
	}
	const sendMessage = async () => {
		const data = {
			uid: user.uid,
			id: Math.random(),
			displayName: user.displayName,
			photoURL: user.photoURL,
			text: inputValue,
			createdAt: serverTimestamp()
		}
		await addDoc(collection(firestore, 'messages'), data);
		setInputValue('');
	}
	return (
		<div className="container">
			<div className='chat_content'>
				<NavBar />
				<div className="chat">
					{
						loading && <Loader />
					}
					<div className="messages">
						{
							messages && messages.map((value => (
								<Message value={value} key={value.id}>{value.text}</Message>
							)))
						}
					</div>
					<div className='input'>
						<input value={inputValue} onChange={handleChange} type="text" placeholder='Enter some message' />
						<button onClick={sendMessage}>Send</button>
					</div>

				</div>
			</div>
		</div>

	)
}

export default Chat

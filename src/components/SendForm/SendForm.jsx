import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../..';
import { AiOutlineSend } from 'react-icons/ai';
import { GrEmoji } from 'react-icons/gr';
import './sendForm.scss';
import EmojiPicker from 'emoji-picker-react';

export const SendForm = ({ lastMessageRef }) => {
	const { auth, firestore } = useContext(Context);
	const [user] = useAuthState(auth);
	const [inputValue, setInputValue] = useState('');
	const [emojiIsActive, setEmojiIsActive] = useState(false);
	const handleChange = (e) => {
		setInputValue(e.target.value);
	}
	const sendMessage = async (e) => {
		e.preventDefault();
		if (inputValue.trim()) {
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
			setTimeout(lastMessageRef.current.scrollIntoView({ behavior: "smooth" }), 700);
		}
	}
	const handleClick = () => {
		setEmojiIsActive(!emojiIsActive);
	}
	const handleClickOnEmoji = (e) => {
		setInputValue(prev => prev + e.emoji);
		setEmojiIsActive(false);

	}
	return (
		<form className='form' onSubmit={sendMessage}>
			<input value={inputValue} onChange={handleChange} placeholder='Введіть ваше повідомлення...' />

			<div className='emoji'>
				<GrEmoji size={30} onClick={handleClick} />
				<div className={emojiIsActive ? 'active non_active' : 'non_active'}>
					<EmojiPicker
						width={300}
						height={400}
						onEmojiClick={handleClickOnEmoji}
						theme="dark"
						searchDisabled={true}
						skinTonesDisabled={true}
						suggestedEmojisMode={'recent'}
					/>
				</div>

			</div>
			<button>Відправити <AiOutlineSend size={20} /></button>
		</form>
	)
}	

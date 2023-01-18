import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../..';
import { AiOutlineSend } from 'react-icons/ai';
import { FiUploadCloud } from 'react-icons/fi';
import './sendForm.scss';

export const SendForm = ({ lastMessageRef }) => {
	const { auth, firestore } = useContext(Context);
	const [user] = useAuthState(auth);
	const [inputValue, setInputValue] = useState('');

	// const [fileImg, setFileImg] = useState();
	// const [fileImgURL, setFileImgURL] = useState();
	// const fileReader = new FileReader();
	// fileReader.onloadend = () => {
	// 	setFileImgURL(fileReader.result);
	// }
	// const hadnleClcik = (e) => {
	// 	e.preventDefault()
	// 	const file = e.target.files[0]
	// 	setFileImg(file);
	// 	fileReader.readAsDataURL(file);
	// }
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
			setTimeout(lastMessageRef.current.scrollIntoView({ behavior: "smooth" }), 1000);
		}
	}

	return (
		<form className='form' onSubmit={sendMessage}>
			<input value={inputValue} onChange={handleChange} placeholder='Enter some message' />
			{/* <input type="file" id='file' onChange={hadnleClcik} style={{ display: 'none' }} />
			<label htmlFor="file" >
				<FiUploadCloud size={25} />
			</label> */}
			<button>Send <AiOutlineSend size={20} /></button>
		</form>
	)
}	

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useContext, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../..';
import { AiOutlineSend, AiOutlineCloudUpload } from 'react-icons/ai';
import { GrEmoji } from 'react-icons/gr';
import EmojiPicker from 'emoji-picker-react';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';
import './sendForm.scss';
export const SendForm = ({ lastMessageRef }) => {
	const { auth, firestore } = useContext(Context);
	const [user] = useAuthState(auth);
	const [inputValue, setInputValue] = useState('');
	const [emojiIsActive, setEmojiIsActive] = useState(false);
	const [file, setFile] = useState(null);
	const [imgURL, setImgURL] = useState();
	const [progressPercent, setProgressPercent] = useState();

	const handleChange = (e) => {
		setInputValue(e.target.value);
	}
	useEffect(() => {
		if (file) {
			const imagesRef = ref(storage, `images/${file.name}`);
			const uploadTask = uploadBytesResumable(imagesRef, file);
			uploadTask.on('state_changed', (snapshot) => {
				const progress =
					Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
				setProgressPercent(progress);
				progress === 100 && toast.success('Image upload');
				console.log(progress);
			},
				(error) => {
					alert(error);
				}, () => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setImgURL(downloadURL);
					})
				})
		}
	}, [file])
	const sendMessage = async (e) => {
		let date = new Date();
		let now = date.toLocaleTimeString();
		e.preventDefault();
		if (inputValue.trim() || file) {
			const data = {
				uid: user.uid,
				id: Math.random(),
				displayName: user.displayName,
				photoURL: user.photoURL,
				text: inputValue,
				imageURL: file && imgURL,
				createdAt: serverTimestamp(),
				date: now,
			}
			await addDoc(collection(firestore, 'messages'), data);
			setInputValue('');
			setFile(null);
			setTimeout(lastMessageRef.current.scrollIntoView({ behavior: "smooth" }), 700);
			setProgressPercent(0);
		}

	}
	const handleClick = () => {
		setEmojiIsActive(!emojiIsActive);
	}
	const handleClickOnEmoji = (e) => {
		setInputValue(prev => prev + e.emoji);
		setEmojiIsActive(false);

	}
	const handleChangeFile = (e) => {
		setFile(e.target.files[0])
	}
	return (
		<form className='form' onSubmit={sendMessage}>

			<input value={inputValue} onChange={handleChange} placeholder='Введіть ваше повідомлення...' />
			<input onChange={handleChangeFile} type="file" id='file' style={{ display: 'none' }} />

			<label htmlFor='file' className='label' >
				<AiOutlineCloudUpload
					color={progressPercent === 100 ? 'red' : ''}
					size={30} />
			</label>

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

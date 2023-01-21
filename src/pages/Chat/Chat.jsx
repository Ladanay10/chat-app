import { collection, orderBy, query } from 'firebase/firestore';
import React, { useContext, useRef } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from '../..';
import { Loader } from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import { NavBar } from '../../components/NavBar/NavBar';
import { SendForm } from '../../components/SendForm/SendForm';
import './chat.scss'
const Chat = () => {
	const { firestore } = useContext(Context);
	const lastMessageRef = useRef(null);
	const [messages, loading] = useCollectionData(
		query(collection(firestore, 'messages'), orderBy('createdAt'))
	)
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
							messages &&
								messages.length > 0 ? messages.map((value => (
									<Message value={value} key={value.id}>{value.text}</Message>
								))) : <div className='skeleton'>
								Чат пустий, очікуйте повідомлень...
								<Loader watch />
							</div>
						}
						<div ref={lastMessageRef}></div>
					</div>
					<SendForm lastMessageRef={lastMessageRef} />
				</div>
			</div>
		</div>
	)
}

export default Chat;

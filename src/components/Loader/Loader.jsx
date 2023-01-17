import React from 'react'
import { Comment } from 'react-loader-spinner'

export const Loader = () => {
	return (
		<div style={{ textAlign: 'center' }}>
			<Comment
				visible={true}
				height="80"
				width="80"
				ariaLabel="comment-loading"
				wrapperStyle={{}}
				wrapperClass="comment-wrapper"
				color="#fff"
				backgroundColor="#1A66FF"
			/>
		</div>
	)
}

import React from 'react'
import { Comment, Watch } from 'react-loader-spinner'

export const Loader = ({ watch }) => {
	return (
		<div style={{ textAlign: 'center' }}>
			{
				watch ?
					<Watch
						height="80"
						width="80"
						radius="48"
						color="#1A66FF"
						ariaLabel="watch-loading"
						wrapperStyle={{}}
						wrapperClassName=""
						visible={true}
					/> :
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
			}
		</div>
	)
}

import React from 'react'

const Photo = ({
	urls: { regular: photo_url },
	alt_description: photo_alt,
	likes,
	user: {
		name: user_name,
		portfolio_url: user_url,
		profile_image: { medium: user_image },
	},
}) => {
	return (
		<article className='photo'>
			<img src={photo_url} alt={photo_alt} />
			<div className='photo-info'>
				<div>
					<h4>{user_name}</h4>
					<p>{likes} likes</p>
				</div>
				<a href={user_url}>
					<img
						src={user_image}
						alt={user_name}
						className='user-img'
					/>
				</a>
			</div>
		</article>
	)
}

export default Photo

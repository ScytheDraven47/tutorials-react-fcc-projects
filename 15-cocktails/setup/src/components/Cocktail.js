import React from 'react'
import { Link } from 'react-router-dom'

const Cocktail = ({ image, name, id, isAlcoholic, glassType }) => {
	return (
		<article className='cocktail'>
			<div className='img-container'>
				<img src={image} alt={name} />
			</div>
			<div className='cocktail-footer'>
				<h3>{name}</h3>
				<h4>{glassType}</h4>
				<p>{isAlcoholic ? 'Alcoholic' : 'Non-alcoholic'}</p>
				<Link
					to={`/cocktail/${id}`}
					className='btn btn-primary btn-details'
				>
					Details
				</Link>
			</div>
		</article>
	)
}

export default Cocktail

import React from 'react'
import useFetch, { createUrl } from './useFetch'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT, API_PARAMS } from './context'

const SingleMovie = () => {
	const { id } = useParams()
	let url = createUrl(API_ENDPOINT, {
		...API_PARAMS,
		i: id,
	})
	const { isLoading, error, data: movie } = useFetch(url)

	if (isLoading) {
		return <div className='loading'></div>
	}

	if (error.show) {
		return (
			<div className='page-error'>
				<h1>{error.message}</h1>
				<Link to='/' className='btn'>
					back to movies
				</Link>
			</div>
		)
	}

	const { Poster: poster, Title: title, Plot: plot, Year: year } = movie
	console.log(movie)
	return (
		<section className='single-movie'>
			<img src={poster} alt={title} />
			<div className='single-movie-info'>
				<h2>{title}</h2>
				<p>{plot}</p>
				<h4>{year}</h4>
				<Link to='/' className='btn'>
					back to movies
				</Link>
			</div>
		</section>
	)
}

export default SingleMovie

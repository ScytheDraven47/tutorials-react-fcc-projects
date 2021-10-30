import React, { useState, useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
const clientID = `${process.env.REACT_APP_APIKEY_UNPLASH}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
	const [isLoading, setIsLoading] = useState(false)
	const [photos, setPhotos] = useState([])
	const [page, setPage] = useState(1)
	const [searchTerm, setSearchTerm] = useState('')
	const [newImages, setNewImages] = useState(false)
	const mounted = useRef(false)

	useEffect(() => {
		fetchImages()
		// eslint-disable-next-line
	}, [page])

	useEffect(() => {
		if (!mounted.current) {
			mounted.current = true
			return
		}
		if (!newImages) return
		if (isLoading) return
		setPage((prev) => prev + 1)
		// eslint-disable-next-line
	}, [newImages])

	const event = () => {
		if (
			window.innerHeight + window.scrollY >=
			document.body.scrollHeight - 16
		) {
			setNewImages(true)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', event)
		return () => window.removeEventListener('scroll', event)
	}, [])

	const fetchImages = () => {
		setIsLoading(true)
		let url = mainUrl
		let params = [`page=${page}`, `client_id=${clientID}`]
		if (searchTerm) {
			url = searchUrl
			params = [`query=${searchTerm}`, ...params]
		}
		url = params ? url.concat('?', params.join('&')) : url
		fetch(url)
			.then((response) => {
				if (!response.ok)
					throw new Error(`${response.status} ${response.statusText}`)
				return response.json()
			})
			.then((data) => {
				console.log(data)
				setPhotos((prev) => {
					if (searchTerm && page === 1) return data.results
					if (searchTerm) return [...prev, ...data.results]
					return [...prev, ...data]
				})
				setNewImages(false)
				setIsLoading(false)
			})
			.catch((error) => {
				console.error(error)
				setNewImages(false)
				setIsLoading(false)
			})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!searchTerm) return
		if (page === 1) fetchImages()
		else setPage(1)
	}

	return (
		<main>
			<section className='search'>
				<form className='search-form'>
					<input
						type='text'
						placeholder='search'
						className='form-input'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button
						type='submit'
						className='submit-btn'
						onClick={handleSubmit}
					>
						<FaSearch />
					</button>
				</form>
			</section>
			<section className='photos'>
				<div className='photos-center'>
					{photos.map((photo) => (
						<Photo key={photo.id} {...photo} />
					))}
				</div>
				{isLoading && <h2 className='loading'>loading...</h2>}
			</section>
		</main>
	)
}

export default App

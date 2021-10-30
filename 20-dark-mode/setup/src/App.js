import React, { useState, useEffect } from 'react'
import data from './data'
import Article from './Article'

const getInitialTheme = () => {
	if (localStorage.getItem('isDarkTheme') !== null) {
		return localStorage.getItem('isDarkTheme')
	}

	return (
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	)
}

function App() {
	const [isDarkMode, setIsDarkMode] = useState(getInitialTheme())

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark-theme')
			document.documentElement.classList.remove('light-theme')
		} else {
			document.documentElement.classList.add('light-theme')
			document.documentElement.classList.remove('dark-theme')
		}
	}, [isDarkMode])

	const handleToggleTheme = () => {
		localStorage.setItem('isDarkTheme', !isDarkMode)
		setIsDarkMode((prev) => !prev)
	}

	const handlePreferredTheme = (e) => {
		setIsDarkMode(e.matches ? true : false)
	}

	useEffect(() => {
		window
			.matchMedia('(prefers-color-scheme: dark')
			.addEventListener('change', handlePreferredTheme)

		return () => window.removeEventListener('change', handlePreferredTheme)
	}, [])

	return (
		<main>
			<nav>
				<div className='nav-center'>
					<h1>overreacted</h1>
					<button className='btn' onClick={handleToggleTheme}>
						toggle
					</button>
				</div>
			</nav>
			<section className='articles'>
				{data.map((datum) => (
					<Article key={datum.id} {...datum} />
				))}
			</section>
		</main>
	)
}

export default App

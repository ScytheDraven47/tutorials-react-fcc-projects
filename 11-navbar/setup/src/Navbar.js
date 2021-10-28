import React, { useState, useRef, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { links, social } from './data'
import logo from './logo.svg'

const Navbar = () => {
	const [showLinks, setShowLinks] = useState(false)
	const linksContainerRef = useRef(null)
	const linksRef = useRef(null)

	useEffect(() => {
		const linksHeight = linksRef.current.getBoundingClientRect().height
		if (showLinks) {
			linksContainerRef.current.style.height = `${linksHeight}px`
		} else {
			linksContainerRef.current.style.height = '0px'
		}
		console.log(linksHeight)
		// return () => {
		//   cleanup
		// }
	}, [showLinks])

	return (
		<nav>
			<div className='nav-center'>
				<div className='nav-header'>
					<img src={logo} alt={logo} className='logo' />
					<button
						className='nav-toggle'
						onClick={() => setShowLinks((prev) => !prev)}
					>
						<FaBars />
					</button>
				</div>

				<div className='links-container' ref={linksContainerRef}>
					<ul className='links' ref={linksRef}>
						{links.map((link) => {
							const { id, url, text } = link
							return (
								<li key={id}>
									<a href={url}>{text}</a>
								</li>
							)
						})}
					</ul>
				</div>

				<ul className='social-icons'>
					{social.map((link) => {
						const { id, url, icon } = link
						return (
							<li key={id}>
								<a
									href={url}
									target='_blank'
									rel='noopener noreferrer'
								>
									{icon}
								</a>
							</li>
						)
					})}
				</ul>
			</div>
		</nav>
	)
}

export default Navbar

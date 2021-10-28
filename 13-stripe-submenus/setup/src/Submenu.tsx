import React, { useState, useRef, useEffect } from 'react'
import { useGlobalContext } from './context'

const Submenu = () => {
	const {
		isSubmenuOpen,
		location,
		page: { page, links },
	} = useGlobalContext()

	const container = useRef<HTMLDivElement>(null!)
	const [columns, setColumns] = useState(2)

	useEffect(() => {
		setColumns(2)
		const submenu = container.current
		const { x, y } = location
		submenu.style.left = `${x}px`
		submenu.style.top = `${y}px`
		if (links.length === 3) setColumns(3)
		if (links.length > 3) setColumns(4)
	}, [location, links.length])

	return (
		<aside
			className={`submenu ${isSubmenuOpen ? 'show' : null}`}
			ref={container}
		>
			<h4>{page}</h4>
			<div className={`submenu-center col-${columns}`}>
				{links.map((link, index) => {
					const { label, icon, url } = link
					return (
						<a key={index} href={url}>
							{icon}
							{label}
						</a>
					)
				})}
			</div>
		</aside>
	)
}

export default Submenu

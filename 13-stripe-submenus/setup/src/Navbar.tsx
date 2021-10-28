import React from 'react'
import logo from './images/logo.svg'
import { FaBars } from 'react-icons/fa'
import { useGlobalContext } from './context'

const Navbar = () => {
	const { openSidebar, openSubmenu, closeSubmenu, sublinks } =
		useGlobalContext()

	const displaySubmenu = (e: React.MouseEvent<HTMLElement>) => {
		const page = (e.target as HTMLElement).textContent
		const tempBtn = (e.target as HTMLElement).getBoundingClientRect()
		const x = (tempBtn.left + tempBtn.right) / 2
		const y = tempBtn.bottom - 3
		openSubmenu(page, { x, y })
	}

	const handleSubmenu = (e: React.MouseEvent<HTMLElement>) => {
		if (!(e.target as HTMLElement).classList.contains('link-btn')) {
			closeSubmenu()
		}
	}

	return (
		<nav className='nav' onMouseOver={handleSubmenu}>
			<div className='nav-center'>
				<div className='nav-header'>
					<img src={logo} alt='stripe logo' className='nav-logo' />
					<button
						className='btn toggle-btn'
						onClick={() => openSidebar()}
					>
						<FaBars />
					</button>
				</div>
				<ul className='nav-links'>
					{sublinks.map((sublink, index) => {
						const { page } = sublink
						return (
							<li key={index}>
								<button
									className='link-btn'
									onMouseOver={displaySubmenu}
								>
									{page}
								</button>
							</li>
						)
					})}
				</ul>
				<button className='btn signin-btn'>sign in</button>
			</div>
		</nav>
	)
}

export default Navbar

import React, { useState, useContext, FC } from 'react'
import sublinks from './data'

type SublinkType = {
	label: string
	icon: JSX.Element
	url: string
}

type PageType = {
	page: string
	links: SublinkType[]
}

type CoordsType = {
	x: number
	y: number
}

type AppContextType = {
	isSubmenuOpen: Boolean
	isSidebarOpen: Boolean
	openSubmenu: Function
	openSidebar: Function
	closeSubmenu: Function
	closeSidebar: Function
	location: {
		x: number
		y: number
	}
	page: PageType
	sublinks: PageType[]
}

const AppContext = React.createContext<AppContextType>(null!)

export const AppProvider: FC = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
	const [location, setLocation] = useState<CoordsType>({ x: 0, y: 0 })
	const [page, setPage] = useState<PageType>(sublinks[0])

	const openSidebar = () => {
		setIsSidebarOpen(true)
	}

	const openSubmenu = (text: string, coords: CoordsType) => {
		const newPage = sublinks.find((link) => link.page === text)
		if (newPage) setPage(newPage)
		setLocation(coords)
		setIsSubmenuOpen(true)
	}

	const closeSidebar = () => {
		setIsSidebarOpen(false)
	}

	const closeSubmenu = () => {
		setIsSubmenuOpen(false)
	}

	return (
		<AppContext.Provider
			value={{
				isSubmenuOpen,
				isSidebarOpen,
				openSubmenu,
				openSidebar,
				closeSubmenu,
				closeSidebar,
				location,
				page,
				sublinks,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export const useGlobalContext = () => {
	return useContext(AppContext)
}

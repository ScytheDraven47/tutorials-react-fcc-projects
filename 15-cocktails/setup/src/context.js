import React, { useState, useContext, useEffect, useRef } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
	const [loading, setLoading] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [cocktails, setCocktails] = useState([])

	let typingTimeout = useRef(null)

	const fetchDrinks = useCallback(() => {
		setLoading(true)
		fetch(url.concat(searchTerm))
			.then((resp) => resp.json())
			.then((data) => {
				const { drinks } = data
				if (drinks) {
					setCocktails(
						drinks.map((drink) => ({
							id: drink.idDrink,
							name: drink.strDrink,
							image: drink.strDrinkThumb,
							isAlcoholic: drink.strAlcoholic === 'Alcoholic',
							glassType: drink.strGlass,
						}))
					)
				} else {
					setCocktails([])
				}
				setLoading(false)
			})
			.catch((error) => {
				setLoading(false)
				console.error(error)
			})
	}, [searchTerm])

	useEffect(() => {
		clearTimeout(typingTimeout.current)
		typingTimeout.current = setTimeout(() => {
			fetchDrinks()
		}, 1000)
		return () => {
			clearTimeout(typingTimeout.current)
		}
	}, [searchTerm, fetchDrinks])

	return (
		<AppContext.Provider
			value={{
				loading,
				cocktails,
				setSearchTerm,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }

import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
	const [loading, setLoading] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [cocktails, setCocktails] = useState([])

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
		fetchDrinks()
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

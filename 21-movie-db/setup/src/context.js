import React, { useState, useContext } from 'react'
// make sure to use https
import useFetch, { createUrl } from './useFetch'
export const API_ENDPOINT = `https://www.omdbapi.com/`
export const API_PARAMS = { apikey: process.env.REACT_APP_APIKEY_OMDB }
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
	// const [movies, setMovies] = useState([])
	const [searchTerm, setSearchTerm] = useState('dragon')
	let url = createUrl(API_ENDPOINT, {
		...API_PARAMS,
		s: searchTerm,
	})
	const { isLoading, error, data: movies } = useFetch(url)

	return (
		<AppContext.Provider
			value={{ isLoading, error, movies, searchTerm, setSearchTerm }}
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

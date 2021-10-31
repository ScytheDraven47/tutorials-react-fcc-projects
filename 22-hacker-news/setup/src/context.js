import React, { useContext, useEffect, useReducer, useRef } from 'react'

import {
	SET_LOADING,
	SET_ERROR,
	SET_STORIES,
	REMOVE_STORY,
	HANDLE_PAGE,
	HANDLE_SEARCH,
} from './actions'
import reducer from './reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search'

const initialState = {
	isLoading: true,
	error: { show: false, message: '' },
	hits: [],
	query: 'react',
	page: 0,
	nbPages: 0,
}

const createUrl = (url, params) => {
	if (!params) return url
	return url.concat(
		'?',
		Object.keys(params)
			.map((key) => `${key}=${params[key]}`)
			.join('&')
	)
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const typingTimeout = useRef(null)

	const fetchStories = (url) => {
		dispatch({ type: SET_LOADING })
		fetch(url)
			.then((response) => {
				if (!response.ok)
					throw new Error(`${response.status} ${response.statusText}`)
				return response.json()
			})
			.then((data) => {
				const { hits, nbPages } = data
				dispatch({ type: SET_STORIES, payload: { hits, nbPages } })
			})
			.catch((error) => {
				console.error(error.toString())
				dispatch({
					type: SET_ERROR,
					payload: { message: error.toString() },
				})
			})
	}

	const removeStory = (id) => {
		dispatch({ type: REMOVE_STORY, payload: { id } })
	}

	const handleSearch = (query) => {
		dispatch({ type: HANDLE_SEARCH, payload: { query } })
	}

	const handlePage = (x) => {
		dispatch({ type: HANDLE_PAGE, payload: { x } })
	}

	useEffect(() => {
		fetchStories(
			createUrl(API_ENDPOINT, {
				query: state.query,
				page: state.page,
			})
		)
		// eslint-disable-next-line
	}, [state.page])

	useEffect(() => {
		clearTimeout(typingTimeout.current)
		typingTimeout.current = setTimeout(() => {
			fetchStories(
				createUrl(API_ENDPOINT, {
					query: state.query,
					page: state.page,
				})
			)
		}, 1000)
		return () => {
			clearTimeout(typingTimeout.current)
		}
		// eslint-disable-next-line
	}, [state.query])

	return (
		<AppContext.Provider
			value={{ ...state, removeStory, handleSearch, handlePage }}
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

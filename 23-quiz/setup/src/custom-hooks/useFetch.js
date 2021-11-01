import axios from 'axios'
import { useEffect, useReducer, useState } from 'react'
import { FETCH_INIT, FETCH_SUCCESS, FETCH_FAILURE } from '../actions/actions'
import { dataFetchReducer } from '../reducers/dataFetchReducer'

export const useDataApi = (initialUrl, initialData) => {
	const [url, setUrl] = useState(initialUrl)

	const [state, dispatch] = useReducer(dataFetchReducer, {
		isLoading: false,
		error: '',
		data: initialData,
	})

	// //? VanillaJS fetch()
	// const fetchData = (url) => {
	// 	dispatch({ type: FETCH_INIT })
	// 	fetch(url)
	// 		.then((response) => {
	// 			if (!response.ok)
	// 				throw new Error(`${response.status} ${response.statusText}`)
	// 			return response.json()
	// 		})
	// 		.then((data) => {
	// 			if (data.error) throw new Error(data.error)
	// 			dispatch({ type: FETCH_SUCCESS, payload: { data } })
	// 		})
	// 		.catch((error) => {
	// 			console.error(error)
	// 			dispatch({
	// 				type: FETCH_FAILURE,
	// 				payload: { error: error.toString() },
	// 			})
	// 		})
	// }

	const fetchData = (url) => {
		if (!url) return
		dispatch({ type: FETCH_INIT })
		axios(url)
			.then((response) => {
				if (!response) throw new Error('Something went wrong...')
				if (response.status >= 300)
					throw new Error(`${response.status} ${response.statusText}`)
				if (response.data.error) throw new Error(response.data.error)
				if (response.data.results.length === 0)
					throw new Error('No results found.')
				dispatch({
					type: FETCH_SUCCESS,
					payload: { data: response.data.results },
				})
			})
			.catch((error) => {
				console.error(error)
				dispatch({
					type: FETCH_FAILURE,
					payload: { error: error.toString() },
				})
			})
	}

	useEffect(() => {
		fetchData(url)
	}, [url])

	return [state, setUrl]
}

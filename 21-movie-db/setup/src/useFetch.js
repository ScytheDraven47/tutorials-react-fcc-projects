import { useState, useEffect, useRef } from 'react'

const useFetch = (url) => {
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState({ show: false, message: '' })
	const [data, setData] = useState(null)
	const typingTimeout = useRef(null)

	const fetchData = (url) => {
		setIsLoading(true)
		fetch(url)
			.then((response) => {
				if (!response.ok)
					throw new Error(`${response.status} ${response.statusText}`)
				return response.json()
			})
			.then((data) => {
				if (data.Response === 'False') throw new Error(`${data.Error}`)
				console.log(data)
				setData(data.Search || data)
				setError({ show: false, message: '' })
				setIsLoading(false)
			})
			.catch((error) => {
				console.error(error)
				setError({ show: true, message: error.toString() })
				setIsLoading(false)
			})
	}

	useEffect(() => {
		clearTimeout(typingTimeout.current)
		typingTimeout.current = setTimeout(() => {
			fetchData(url)
		}, 1000)
		return () => {
			clearTimeout(typingTimeout.current)
		}
	}, [url])

	return { isLoading, error, data }
}

export const createUrl = (url, params) => {
	if (!params) return url
	return url.concat(
		'?',
		Object.keys(params)
			.map((key) => `${key}=${params[key]}`)
			.join('&')
	)
}

export default useFetch

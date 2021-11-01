import React, { useState, useContext, useEffect } from 'react'
import { useDataApi } from './custom-hooks/useFetch'

const API_ENDPOINT = 'https://opentdb.com/api.php'

const AppContext = React.createContext()

const createUrl = (url, params) => {
	if (!params) return url
	return url.concat(
		'?',
		Object.keys(params)
			.map((key) => `${key}=${params[key]}`)
			.join('&')
	)
}

const AppProvider = ({ children }) => {
	const [{ data: questions, isLoading, error }, setUrl] = useDataApi('', [])
	const [isWaiting, setIsWaiting] = useState(true)
	const [index, setIndex] = useState(0)
	const [userAnswers, setUserAnswers] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [quiz, setQuiz] = useState({
		amount: 10,
		category: 20,
		difficulty: 'easy',
	})

	useEffect(() => {
		if (questions.length > 0) setIsWaiting(false)
	}, [questions])

	const handleAnswer = (isCorrect, value) => {
		if (isCorrect) setUserAnswers((prev) => [...prev, { value, isCorrect }])
		nextQuestion()
	}

	const nextQuestion = () => {
		if (index < questions.length - 1) setIndex((prev) => prev + 1)
		else openModal()
	}

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setIsWaiting(true)
	}

	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		setQuiz((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const { amount, category, difficulty } = quiz
		setUrl(
			createUrl(API_ENDPOINT, {
				amount,
				category,
				difficulty,
			})
		)
	}

	return (
		<AppContext.Provider
			value={{
				isWaiting,
				isLoading,
				error,
				questions,
				userAnswers,
				index,
				isModalOpen,
				quiz,
				handleAnswer,
				nextQuestion,
				closeModal,
				handleChange,
				handleSubmit,
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

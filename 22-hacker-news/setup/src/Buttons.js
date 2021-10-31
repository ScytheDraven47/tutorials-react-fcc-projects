import React from 'react'
import { useGlobalContext } from './context'

const Buttons = () => {
	const { isLoading, error, page, nbPages, handlePage } = useGlobalContext()

	if (error.show)
		return (
			<div className='btn-container'>
				<h2 className='error'>{error.message}</h2>
			</div>
		)

	return (
		<div className='btn-container'>
			<button
				onClick={() => handlePage(-1)}
				disabled={isLoading || page <= 0}
			>
				{'<'}
			</button>
			<p>
				{page + 1} of {nbPages}
			</p>
			<button
				onClick={() => handlePage(1)}
				disabled={isLoading || page >= nbPages - 1}
			>
				{'>'}
			</button>
		</div>
	)
}

export default Buttons

import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
	const { setSearchTerm } = useGlobalContext()

	const searchInput = React.useRef('')

	React.useEffect(() => {
		searchInput.current.focus()
	}, [])

	const searchCocktail = () => {
		setSearchTerm(searchInput.current.value)
	}

	return (
		<section className='section search'>
			<form
				className='search-form'
				onSubmit={(e) => {
					e.preventDefault()
				}}
			>
				<div className='form-control'>
					<label htmlFor='name'>search your favorite cocktail</label>
					<input
						type='text'
						id='name'
						ref={searchInput}
						onChange={searchCocktail}
					/>
				</div>
			</form>
		</section>
	)
}

export default SearchForm

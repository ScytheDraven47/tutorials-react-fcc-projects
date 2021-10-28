import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
	const { id } = useParams()
	const [loading, setLoading] = useState(false)
	const [cocktail, setCocktail] = useState(null)

	useEffect(() => {
		setLoading(true)
		fetch(url.concat(id))
			.then((resp) => resp.json())
			.then((data) => {
				if (data.drinks) {
					const drink = data.drinks[0]
					setCocktail({
						name: drink.strDrink,
						image: drink.strDrinkThumb,
						isAlcoholic: drink.strAlcoholic === 'Alcoholic',
						glassType: drink.strGlass,
						category: drink.strCategory,
						instructions: drink.strInstructions,
						ingredients: [
							drink.strIngredient1,
							drink.strIngredient2,
							drink.strIngredient3,
							drink.strIngredient4,
							drink.strIngredient5,
							drink.strIngredient6,
							drink.strIngredient7,
							drink.strIngredient8,
							drink.strIngredient9,
							drink.strIngredient10,
							drink.strIngredient11,
							drink.strIngredient12,
							drink.strIngredient13,
							drink.strIngredient14,
							drink.strIngredient15,
						].filter(Boolean),
					})
				} else {
					setCocktail(null)
				}
				setLoading(false)
			})
			.catch((error) => {
				setLoading(false)
				console.error(error)
			})
	}, [id])

	if (loading) {
		return <Loading />
	}

	if (!cocktail) {
		return <h2 className='section-title'>no cocktail to display</h2>
	}

	const {
		name,
		image,
		isAlcoholic,
		glassType,
		category,
		instructions,
		ingredients,
	} = cocktail
	return (
		<section className='section cocktail-section'>
			<Link to='/' className='btn btn-primary'>
				back home
			</Link>
			<h2 className='section-title'>{name}</h2>
			<div className='drink'>
				<img src={image} alt={name} />
				<div className='drink-info'>
					<p>
						<span className='drink-data'>name:</span>
						{name}
					</p>
					<p>
						<span className='drink-data'>category:</span>
						{category}
					</p>
					<p>
						<span className='drink-data'>Alcoholic:</span>
						{isAlcoholic ? 'yes' : 'no'}
					</p>
					<p>
						<span className='drink-data'>glass:</span>
						{glassType}
					</p>
					<p>
						<span className='drink-data'>instructions:</span>
						{instructions}
					</p>
					<p>
						<span className='drink-data'>ingredients:</span>
						{ingredients.join(', ')}
					</p>
				</div>
			</div>
		</section>
	)
}

export default SingleCocktail

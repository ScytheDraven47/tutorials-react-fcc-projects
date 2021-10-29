import React, { useState, useEffect } from 'react'
import {
	FaEnvelopeOpen,
	FaUser,
	FaCalendarTimes,
	FaMap,
	FaPhone,
	FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
	const [isLoading, setIsLoading] = useState(false)
	const [person, setPerson] = useState(null)
	const [title, setTitle] = useState('name')
	const [value, setValue] = useState('random person')

	const getPerson = () => {
		setIsLoading(true)
		fetch(url)
			.then((response) => {
				if (!response.ok)
					throw new Error(`${response.status} ${response.statusText}`)
				return response.json()
			})
			.then((data) => {
				const {
					phone,
					email,
					login: { password },
					picture: { large: image },
					dob: { age, date: birthday },
					name: { first: firstname, last: lastname },
					location: {
						street: { number: street_number, name: street_name },
						city,
						state,
						country,
						postcode,
					},
				} = data.results[0]
				setPerson({
					phone,
					email,
					name: `${firstname} ${lastname}`,
					address: `${street_number} ${street_name}, ${state}, ${city} ${postcode}, ${country}`,
					birthday: `${new Date(
						birthday
					).toLocaleDateString()} (${age})`,
					password,
					image,
				})
				setIsLoading(false)
			})
			.catch((error) => {
				console.error(error)
			})
	}

	useEffect(() => {
		getPerson()
	}, [])

	useEffect(() => {
		if (person) setValue(person[title])
	}, [person, title])

	const handleValue = (e) => {
		if (e.target.hasAttribute('data-label')) {
			setTitle(e.target.getAttribute('data-label'))
		}
	}

	return (
		<main>
			<div className='block bcg-black'></div>
			<div className='block'>
				<div className='container'>
					<img
						src={(person && person.image) || defaultImage}
						alt='random user'
						className='user-img'
					/>
					<p className='user-title'>my {title} is</p>
					<p className='user-value'>{value}</p>
					<div className='values-list'>
						<button
							className='icon'
							data-label='name'
							onMouseOver={handleValue}
						>
							{' '}
							<FaUser />{' '}
						</button>
						<button
							className='icon'
							data-label='email'
							onMouseOver={handleValue}
						>
							{' '}
							<FaEnvelopeOpen />{' '}
						</button>
						<button
							className='icon'
							data-label='birthday'
							onMouseOver={handleValue}
						>
							{' '}
							<FaCalendarTimes />{' '}
						</button>
						<button
							className='icon'
							data-label='address'
							onMouseOver={handleValue}
						>
							{' '}
							<FaMap />{' '}
						</button>
						<button
							className='icon'
							data-label='phone'
							onMouseOver={handleValue}
						>
							{' '}
							<FaPhone />{' '}
						</button>
						<button
							className='icon'
							data-label='password'
							onMouseOver={handleValue}
						>
							{' '}
							<FaLock />{' '}
						</button>
					</div>
					<button
						className='btn'
						onClick={getPerson}
						disabled={isLoading}
					>
						{isLoading ? 'loading...' : 'random user'}
					</button>
				</div>
			</div>
		</main>
	)
}

export default App

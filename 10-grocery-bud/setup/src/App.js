import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
	let list = localStorage.getItem('list')
	return list ? JSON.parse(list) : []
}

function App() {
	const [name, setName] = useState('')
	const [list, setList] = useState(getLocalStorage)
	const [isEditing, setIsEditing] = useState(false)
	const [editID, setEditID] = useState(null)
	const [alert, setAlert] = useState({
		show: false,
		msg: '',
		type: '',
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!name) {
			showAlert(true, 'no item provided', 'danger')
		} else if (isEditing) {
			showAlert(true, 'item edited', 'success')
			setList((prev) => {
				prev.map((item) => {
					return item.id === editID ? { ...item, title: name } : item
				})
			})
			setName('')
			setEditID(null)
			setIsEditing(false)
		} else {
			showAlert(true, 'item added', 'success')
			setList((prev) => [
				...prev,
				{ id: new Date().getTime().toString(), title: name },
			])
			setName('')
		}
	}

	const showAlert = (show = false, msg = '', type = '') => {
		setAlert((prev) => ({ ...prev, show, type, msg }))
	}

	const clearList = () => {
		showAlert(true, 'clearing all items', 'danger')
		setList([])
	}

	const removeItem = (id) => {
		showAlert(true, 'removing item', 'danger')
		setList((prev) => prev.filter((item) => item.id !== id))
	}

	const editItem = (id) => {
		showAlert(true, 'editing item', 'warning')
		const item = list.find((item) => item.id === id)
		setIsEditing(true)
		setEditID(id)
		setName(item.title)
	}

	useEffect(() => {
		localStorage.setItem('list', JSON.stringify(list))
	}, [list])

	return (
		<section className='section-center'>
			{alert.show && (
				<Alert {...alert} removeAlert={showAlert} list={list} />
			)}
			<form className='grocery-form' onSubmit={handleSubmit}>
				<h3>grocery bud</h3>
				<div className='form-control'>
					<input
						type='text'
						className='grocery'
						placeholder='e.g. eggs'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<button type='submit' className='submit-btn'>
						{isEditing ? 'edit' : 'submit'}
					</button>
				</div>
			</form>
			{list.length > 0 && (
				<div className='grocery-container'>
					<List
						items={list}
						removeItem={removeItem}
						editItem={editItem}
					/>
					<button className='clear-btn' onClick={clearList}>
						clear items
					</button>
				</div>
			)}
		</section>
	)
}

export default App

import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
	const { isModalOpen, closeModal, userAnswers, questions } =
		useGlobalContext()

	return (
		<div className={`modal-container ${isModalOpen ? 'isOpen' : ''}`}>
			<div className='modal-content'>
				<h2>congrats!</h2>
				<p>
					{`You got ${(
						(userAnswers.reduce(
							(total, answer) =>
								total + (answer.isCorrect ? 1 : 0),
							0
						) /
							questions.length) *
						100
					).toFixed(0)}%`}
				</p>
				<button className='close-btn' onClick={closeModal}>
					play again
				</button>
			</div>
		</div>
	)
}

export default Modal

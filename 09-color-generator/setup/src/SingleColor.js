import React, { useState, useEffect } from 'react'
// import rgbToHex from './utils'

const SingleColor = ({ rgb, hex, weight, index }) => {
	const [alert, setAlert] = useState(false)

	useEffect(() => {
		const alertTimer = setTimeout(() => {
			setAlert(false)
		}, 3000)
		return () => clearTimeout(alertTimer)
	}, [alert])

	console.log(rgb)

	return (
		<article
			className={`color ${
				rgb[0] + rgb[1] + rgb[2] > 250 ? 'color-light' : null
			}`}
			style={{ backgroundColor: `#${hex}` }}
			onClick={() => {
				setAlert(true)
				navigator.clipboard.writeText(`#${hex}`)
			}}
		>
			<p className='percent-value'>{weight}%</p>
			<p className='color-value'>#{hex}</p>
			<p className='color-value'>rgb({rgb.join(',')})</p>
			{alert && <p className='alert'>copied to clipboard</p>}
		</article>
	)
}

export default SingleColor

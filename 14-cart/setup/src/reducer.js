const reducer = (state, action) => {
	switch (action.type) {
		case 'LOADING':
			return {
				...state,
				loading: true,
			}
		case 'DISPLAY_CART':
			return {
				...state,
				loading: false,
				cart: action.payload.cart,
			}
		case 'CLEAR_CART':
			return { ...state, cart: [] }
		case 'REMOVE_ITEM':
			return {
				...state,
				cart: state.cart.filter(
					(item) => item.id !== action.payload.id
				),
			}
		case 'INCREMENT_ITEM':
			return {
				...state,
				cart: state.cart
					.map((item) => {
						const { id, amount } = action.payload
						if (item.id === id && item.amount) {
							return {
								...item,
								amount: item.amount + amount,
							}
						}
						return item
					})
					.filter((item) => item.amount > 0),
			}
		case 'UPDATE_TOTALS':
			const { total, amount } = state.cart.reduce(
				(sum, item) => {
					return {
						total: sum.total + item.amount * item.price,
						amount: sum.amount + item.amount,
					}
				},
				{ total: 0, amount: 0 }
			)
			return { ...state, total, amount }
		default:
			throw new Error('no matching action type')
	}
}

export default reducer

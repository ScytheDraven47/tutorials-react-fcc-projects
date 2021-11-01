import { FETCH_INIT, FETCH_SUCCESS, FETCH_FAILURE } from '../actions/actions'

export const dataFetchReducer = (state, action) => {
	switch (action.type) {
		case FETCH_INIT:
			return {
				...state,
				isLoading: true,
				error: '',
			}
		case FETCH_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: '',
				data: action.payload.data,
			}
		case FETCH_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload.error,
			}
		default:
			throw new Error('invalid action')
	}
}

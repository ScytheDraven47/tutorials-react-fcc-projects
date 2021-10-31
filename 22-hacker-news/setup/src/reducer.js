import {
	SET_LOADING,
	SET_ERROR,
	SET_STORIES,
	REMOVE_STORY,
	HANDLE_PAGE,
	HANDLE_SEARCH,
} from './actions'

const reducer = (state, action) => {
	switch (action.type) {
		case SET_LOADING:
			return {
				...state,
				isLoading: true,
			}
		case SET_ERROR:
			return {
				...state,
				error: { show: true, message: action.payload.message },
			}
		case SET_STORIES:
			return {
				...state,
				isLoading: false,
				hits: action.payload.hits,
				nbPages: action.payload.nbPages,
			}
		case REMOVE_STORY:
			return {
				...state,
				hits: state.hits.filter(
					(story) => story.objectID !== action.payload.id
				),
			}
		case HANDLE_SEARCH:
			return {
				...state,
				query: action.payload.query,
				page: 0,
			}
		case HANDLE_PAGE:
			return {
				...state,
				page: state.page + action.payload.x,
			}
		default:
			throw new Error(`no matching action type: ${action.type}`)
	}
}

export default reducer

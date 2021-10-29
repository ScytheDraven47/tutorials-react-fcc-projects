const PAGE_LENGTH = 10

const paginate = (followers) => {
	return Array.from({ length: followers.length / PAGE_LENGTH }, (_, index) =>
		followers.slice(index * PAGE_LENGTH, index * PAGE_LENGTH + PAGE_LENGTH)
	)
}

export default paginate

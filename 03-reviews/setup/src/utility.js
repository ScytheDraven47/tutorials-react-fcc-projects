export const generateRandomIndex = (max) => Math.floor(Math.random() * max)

export const generateNewRandomIndex = (current, max) => {
	let newIndex = generateRandomIndex(max)
	if (newIndex !== current) return newIndex
	return generateRandomIndex(2) === 1 ? newIndex + 1 : newIndex - 1

	//? More "fair" randomness, possible infinite loop (unlikely)
	// let newIndex
	// do {
	// 	newIndex = generateRandomIndex(max)
	// } while (newIndex === current)
	// return newIndex
}

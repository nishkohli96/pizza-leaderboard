const messages = Object.freeze({
	user: {
		createSuccess: 'User created successfully.',
		createFail: 'Unable to create user.',
		fetchSuccess: 'User details fetched.',
		fetchFail: 'Unable to fetch user details.',
		notFound: 'User not found',
		insufficientBalance: 'Insufficient amount in users wallet.',
		fetchListSuccess: 'Users list fethed successfully.',
		fetchListFail: 'Unable to fetch users list'
	},
	pizza: {
		fetchListSuccess: 'List of pizzas.',
		fetchListFail: 'Unable to fetch list of pizzas.',
		notFound: 'Pizza not found in menu'
	},
	order: {
		placed: 'Order placed successfully', 
		notPlaced: 'Unable to place order',
	}
});

export default messages;

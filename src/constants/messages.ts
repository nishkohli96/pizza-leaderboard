const messages = Object.freeze({
	user: {
		createSuccess: 'User created successfully.',
		createFail: 'Unable to create user.',
		fetchSuccess: 'User details fetched.',
		fetchFail: 'Unable to fetch user details.',
		notFound: 'User not found',
		updateSuccess: 'User details updated.',
		updateFail: 'Unable to update user details.',
		deleteSuccess: 'User deleted successfully.',
		deleteFail: 'Unable to delete user.',
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
		logSuccess: 'Order has been successfully logged',
		logFail: 'Unable to log for this order',
		fetchUserSuccess: 'Orders fetched for the user',
		fetchUserFail: 'Unable to fetch orders for the user',
		missingUserId: 'User Id missing from request'
	}
});

export default messages;

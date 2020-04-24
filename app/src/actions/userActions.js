// import {
	// 	CURRENT_USER
	// } from './types';

	// import db from '../api/db';

	// export const getCurrentUser = () => async dispatch => {
	// 	let user = localStorage.getItem('user')


	// 	if (user === null) {
	// 		return {
	// 			type: CURRENT_USER,
	// 			payload: {
	// 				currentUser: null
	// 			}

	// 		}
	// 	}
	// 	const userId = JSON.parse(user);

	// 	const response = await db.get(`/user/${userId._id}`);

	// 	if (response.data.success) {
	// 		return {
	// 			type: CURRENT_USER,
	// 			payload: {
	// 				currentUser: response.data.data
	// 			}

	// 		}
	// 	}

	// }

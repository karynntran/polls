import {
	FETCH_CARD,
	FETCH_CARDS,
	CREATE_CARD,
	EDIT_CARD,
	DELETE_CARD,
	GET_USERS,
	LOG_IN,
	LOG_OUT
} from './types';

import { getUsers } from '../_helpers/userHelpers';

import db from '../api/db';

export const fetchCards = () => async dispatch => {
	const response = await db.get('/cards');

	dispatch({
		type: FETCH_CARDS,
		payload: response.data
	})
};

export const fetchCard = cardId => async dispatch => {
	const response = await db.get(`/cards/${cardId}`);

	dispatch({
		type: FETCH_CARD,
		payload: response.data
	})
};

export const createCard = formValues => async dispatch => {
	const response = await db.post('/cards', { ...formValues
	});

	dispatch({
		type: CREATE_CARD,
		payload: response.data
	})
};

export const editCard = (formValues, cardId) => async dispatch => {
	const response = await db.patch(`/cards/${cardId}`, { ...formValues,
		cardId
	});

	dispatch({
		type: EDIT_CARD,
		payload: response.data
	})
};

export const deleteCard = (cardId) => async dispatch => {
	const response = await db.delete(`/cards/${cardId}`);

	dispatch({
		type: DELETE_CARD,
		payload: cardId
	})
};

export const logIn = ({ username, password }) => async dispatch => {
	const users = await getUsers();

	if (users[username] && users[username].password === password) {
		dispatch({
			type: LOG_IN,
			payload: {
				logState: true,
				message: 'Login succeeded'
			}
		})
	} else {
		dispatch({
			type: LOG_IN,
			payload: {
				logState: false,
				message: 'Login failed'
			}
		})
	}




	// const userObj = users.then((data) => Object.values(data));
	// console.log(userObj)
	// users.filter((user) => {
	// 	if (user.username === username && user.password === password) {
	// 		user.password ===
	// 	} 
	// })





}

export const logOut = () => {
	return {
		type: LOG_OUT,
		payload: {
			logState: false,
			message: 'You have been logged out'
		}

	}
}

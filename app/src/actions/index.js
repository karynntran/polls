import {
	FETCH_CARD,
	FETCH_CARDS,
	CREATE_CARD,
	EDIT_CARD,
	DELETE_CARD,
	GET_USERS,
	LOG_IN,
	LOG_OUT,
	IS_LOGGEDIN
} from './types';

import { getUsers } from '../_helpers/userHelpers';

// import localStorage from '../localStorage';


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

export const createCard = (formValues, user) => async dispatch => {
	const userId = user.userId;
	const response = await db.post('/cards', { ...formValues,
		userId
	});

	console.log(response.data)

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
		localStorage.setItem('user', users[username])
		dispatch({
			type: LOG_IN,
			payload: {
				logState: true,
				message: 'Login succeeded',
				currentUser: users[username]
			}
		})
	} else {
		dispatch({
			type: LOG_IN,
			payload: {
				logState: false,
				message: 'Login failed',
				currentUser: null
			}
		})
	}

}

export const logOut = () => {
	localStorage.setItem('user', null)


	return {
		type: LOG_OUT,
		payload: {
			logState: false,
			message: 'You have been logged out'
		}

	}
}

export const isLoggedIn = () => {
	const isLoggedIn = localStorage.getItem('user')
	console.log(isLoggedIn)
	if (isLoggedIn) {
		return {
			type: IS_LOGGEDIN,
			payload: {
				logState: true,
				currentUser: isLoggedIn
			}

		}
	} else {
		return {
			type: IS_LOGGEDIN,
			payload: {
				logState: false,
				currentUser: null
			}

		}
	}

}

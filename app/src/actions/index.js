import {
	FETCH_CARD,
	FETCH_CARDS,
	CREATE_CARD,
	EDIT_CARD,
	DELETE_CARD,
	LOG_IN,
	LOG_OUT,
	IS_LOGGEDIN
} from './types';

import { getUsers } from '../_helpers/userHelpers';

import db from '../api/db';


export const fetchCards = () => async dispatch => {
	const response = await db.get('/cards');

	dispatch({
		type: FETCH_CARDS,
		payload: response.data.data

	})
};

export const fetchCard = cardId => async dispatch => {
	const response = await db.get(`/cards/${cardId}`);

	dispatch({
		type: FETCH_CARD,
		payload: response.data.data
	})
};

export const createCard = (formValues, user) => async dispatch => {
	const userId = user;
	const response = await db.post('/cards', { ...formValues,
		userId
	});


	dispatch({
		type: CREATE_CARD,
		payload: response.data.data
	})
};

export const editCard = (formValues, cardId) => async dispatch => {
	const response = await db.patch(`/cards/${cardId}`, { ...formValues,
		cardId
	});

	dispatch({
		type: EDIT_CARD,
		payload: response.data.data
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
	// const users = await getUsers();
	const response = await db.post(`/user/${username}/${password}`);

	console.log('login', response)
	if (response.data.success) {
		localStorage.setItem('user', JSON.stringify(response.data.user))
		dispatch({
			type: LOG_IN,
			payload: {
				logState: true,
				message: 'Login succeeded',
				currentUser: response.data.user
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
			message: 'You have been logged out',
			currentUser: null
		}

	}
}

export const isLoggedIn = () => {
	const userCheck = JSON.parse(localStorage.getItem('user'));
	if (userCheck !== null) {
		return {
			type: IS_LOGGEDIN,
			payload: {
				logState: true,
				currentUser: userCheck
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

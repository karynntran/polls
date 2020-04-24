import {
	LOG_IN,
	LOG_OUT,
	IS_LOGGEDIN
} from './types';

import db from '../api/db';
import history from '../history';


export const logIn = ({ username, password }) => async dispatch => {
	const response = await db.post(`/user/${username}/${password}`);

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
	history.push('/');
	return {
		type: LOG_OUT,
		payload: {
			logState: false,
			message: 'You have been logged out',
			currentUser: null
		}

	}
}

export const isLoggedIn = () => async dispatch => {
	const userCheck = JSON.parse(localStorage.getItem('user'));

	if (userCheck == null) {
		return {
			type: IS_LOGGEDIN,
			payload: {
				logState: false,
				currentUser: null,
				message: 'You have been logged out'
			}

		}
	}


	const response = await db.get(`/user/${userCheck._id}`);

	dispatch({
		type: IS_LOGGEDIN,
		payload: {
			logState: true,
			currentUser: response.data.data,
			message: 'You have been logged out'

		}

	})

}

import {
	LOG_IN,
	LOG_OUT,
	IS_LOGGEDIN

} from '../actions/types';

const INITIAL_STATE = {
	logState: false,
	message: '',
	currentUser: null
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOG_IN:
			return { ...state, ...action.payload }
		case LOG_OUT:
			return { ...state, ...action.payload }
		case IS_LOGGEDIN:
			return { ...state, ...action.payload }
		default:
			return state;
	}
}

import _ from 'lodash';

import {
	LOG_IN,
	LOG_OUT
} from '../actions/types';

const INITIAL_STATE = {
	logState: false,
	message: ''
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOG_IN:
			return { ...state, ...action.payload }
		case LOG_OUT:
			return { ...state, ...action.payload }

		default:
			return state;
	}
}

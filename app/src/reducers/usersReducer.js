import _ from 'lodash';

import {
	GET_USERS
} from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case GET_USERS:
			return { ...state, ..._.mapKeys(action.payload, 'userId') }
		default:
			return state;
	}
}

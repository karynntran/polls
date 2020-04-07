import _ from 'lodash';

import {
	FETCH_CARD,
	FETCH_CARDS,
	CREATE_CARD,
	EDIT_CARD,
	DELETE_CARD
} from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_CARD:
			return { ...state, [action.payload.id]: action.payload }
		case FETCH_CARDS:
			return { ...state, ..._.mapKeys(action.payload, 'id') } //mapKeys from lodash creates a new object with the same values as the given object and a provided "property"
		case CREATE_CARD:
			return { ...state, [action.payload.id]: action.payload }
		case EDIT_CARD:
			return { ...state, [action.payload.id]: action.payload }
		case DELETE_CARD:
			return _.omit(state, action.payload)
		default:
			return state;
	}
}

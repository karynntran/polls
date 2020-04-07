import {
	FETCH_CARD,
	FETCH_CARDS,
	CREATE_CARD,
	EDIT_CARD,
	DELETE_CARD
} from './types';
import cards from '../api/cards';


export const fetchCards = () => async dispatch => {
	const response = await cards.get('/cards');

	dispatch({
		type: FETCH_CARDS,
		payload: response.data
	})
};

export const fetchCard = cardId => async dispatch => {
	const response = await cards.get(`/cards/${cardId}`);

	dispatch({
		type: FETCH_CARD,
		payload: response.data
	})
};

export const createCard = formValues => async dispatch => {
	const response = await cards.post('/cards', { ...formValues
	});

	dispatch({
		type: CREATE_CARD,
		payload: response.data
	})
};

export const editCard = (formValues, cardId) => async dispatch => {
	const response = await cards.patch(`/cards/${cardId}`, { ...formValues,
		cardId
	});

	dispatch({
		type: EDIT_CARD,
		payload: response.data
	})
};

export const deleteCard = (cardId) => async dispatch => {
	const response = await cards.delete(`/cards/${cardId}`);

	dispatch({
		type: DELETE_CARD,
		payload: cardId
	})
};

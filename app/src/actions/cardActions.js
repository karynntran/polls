import {
	FETCH_CARD,
	FETCH_CARDS,
	CREATE_CARD,
	EDIT_CARD,
	DELETE_CARD,
	SUBMIT_ANSWER
} from './types';

import db from '../api/db';
import history from '../history';


export const fetchCards = () => async dispatch => {
	try {
		const response = await db.get('/cards');

		dispatch({
			type: FETCH_CARDS,
			payload: response.data.data

		})

	} catch (error) {
		console.log(error)
	}
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
	history.push('/');


	dispatch({
		type: CREATE_CARD,
		payload: response.data.data
	})
};

export const editCard = (formValues, cardId) => async dispatch => {
	const response = await db.patch(`/cards/${cardId}`, { ...formValues,
		cardId
	});

	history.push('/');


	dispatch({
		type: EDIT_CARD,
		payload: response.data.data
	})
};

export const deleteCard = (cardId) => async dispatch => {
	await db.delete(`/cards/${cardId}`);
	history.push('/');

	dispatch({
		type: DELETE_CARD,
		payload: cardId
	})
};

export const submitAnswer = (card, answerIdx) => async dispatch => {
	let cardId = card._id;
	let updatedCard = card.answers.map((answer, idx) => {
		if (idx === answerIdx) {
			answer.count++
		}
		return answer;
	})

	let newCard = { ...card, ...{ answers: updatedCard } }

	await db.patch(`/cards/${cardId}`, { ...newCard, cardId });

	dispatch({
		type: SUBMIT_ANSWER,
		payload: { ...newCard }
	})

}

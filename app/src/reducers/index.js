import { combineReducers } from 'redux';
import cardsReducer from './cardsReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';


import { reducer as formReducer } from 'redux-form';


export default combineReducers({
	cards: cardsReducer,
	form: formReducer,
	users: usersReducer,
	auth: authReducer
})

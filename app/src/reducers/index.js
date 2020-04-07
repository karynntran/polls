import { combineReducers } from 'redux';
import cardsReducer from './cardsReducer';
import { reducer as formReducer } from 'redux-form';


export default combineReducers({
	cards: cardsReducer,
	form: formReducer
})

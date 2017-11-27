import I18n from 'react-native-i18n';

import {
	LANGUAGE_CHANGED,
	WELCOME_FINISHED
} from '../types';

const INITIAL_STATE = {
	language: I18n.locale.substr(0, 2), // take over the recognized, or default if not recognized, language locale as initial state
	welcomeFinished: false
}

export default function (state = INITIAL_STATE, action) {
	// console.log(action);
	switch (action.type) {
		case LANGUAGE_CHANGED:
			return { ...state, language: action.payload };
		case WELCOME_FINISHED:
			return { ...state, welcomeFinished: action.payload }
		default:
			return state;
	}
}

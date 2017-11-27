import I18n from 'react-native-i18n';

import { 
	LANGUAGE_CHANGED,
	WELCOME_FINISHED,
} from '../types';

export const changeLanguage = (newLang) => {
	I18n.locale = newLang;

	return {
		type: LANGUAGE_CHANGED,
		payload: newLang
	}
}

export const welcomeTutoFinished = (finished) => {
	console.log('here');
	return {
		type: WELCOME_FINISHED,
		payload: finished
	}
}

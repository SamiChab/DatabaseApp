import { combineReducers } from 'redux';
import authReducer from './authReducer';
import authErrorReducer from './authErrorReducer';
import settingsReducer from './settingsReducer';
import noteReducer from './noteReducer';

export default combineReducers({
	auth: authReducer,
	authError: authErrorReducer,
	settings: settingsReducer,
	note: noteReducer
});

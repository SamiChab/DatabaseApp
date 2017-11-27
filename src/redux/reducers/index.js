import { combineReducers } from 'redux';
import authReducer from './authReducer';
import authErrorReducer from './authErrorReducer';
import settingsReducer from './settingsReducer';

export default combineReducers({
	auth: authReducer,
	authError: authErrorReducer,
	settings: settingsReducer,
});

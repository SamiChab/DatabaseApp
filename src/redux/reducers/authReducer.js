import { 
	PRENOM_CHANGED,
	NOM_CHANGED,
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	PASSWORD2_CHANGED,
	LOGIN_USER_SUCCESS,
	CREATE_USER_SUCCESS,
	DISPLAY_EMAIL_ERROR,
	DISPLAY_PASSWORD_ERROR,
	LOADING_AUTH,
	USER_FETCH_SUCCESS,
	USER_FETCH_FAIL,
	USER_DELETED,
	USER_DELETE_AFTER_LOGIN
} from '../types';

const INITIAL_STATE = {
	surname: '',
	name: '',
	email: '',
	password: '',
	password2: '',
	loading: false,
	canConnect: false,
	userProfile: false,
	userLoggedIn: false,
	userDeleteAfterLogin: false
};

export default (state = INITIAL_STATE, action) => {
	
	console.log(action);

	switch (action.type) {

		case PRENOM_CHANGED:
			return { ...state, surname: action.payload };
			/* Explication: prends tout le contenu de 'state', mets-le
			dans l'objet, puis crée la propriété prenom, qui écrasera, si elle
			existe déjà, la précédente */
		case NOM_CHANGED:
			return { ...state, name: action.payload };
		case EMAIL_CHANGED:
			return { ...state, email: action.payload };
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload[0] };
		case PASSWORD2_CHANGED:
			return { ...state, password2: action.payload[1] };
		case LOGIN_USER_SUCCESS:
			return { 
				...state,
				...INITIAL_STATE,
				user: action.payload
			};
		case CREATE_USER_SUCCESS:
			return { 
				...state,
				...INITIAL_STATE,
				user: action.payload
			};
		case DISPLAY_EMAIL_ERROR:
		case DISPLAY_PASSWORD_ERROR:
			return { 
				...state,
				password: '',
				password2: ''
			};
		case LOADING_AUTH:
			if (action.payload) {
				return {
					...state,
					loading: action.payload,
				};
			}
			return {
				...state,
				loading: action.payload
			};
		case USER_FETCH_SUCCESS:
			return { ...state, userProfile: action.payload };
		case USER_FETCH_FAIL:
			return { ...state, userProfile: undefined };		
/* 		case USER_DELETED:
			return { ...state }; */
		case USER_DELETE_AFTER_LOGIN:
			return { ...state, userDeleteAfterLogin: action.payload }
		default:
			return state;
	}
};
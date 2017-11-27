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
	TRY_LOGIN,
	TRY_SIGNIN,
	CLEAR_ERROR
} from '../types';

const INITIAL_STATE = {
	surnameError: '',
	nameError: '',
	emailError: '',
	passwordError: '',
	password2Error: '',
	canLogin: false,
	canSignin: false,
	displayErrors: false,
};

function checkName(name){
	if(name.length < 2){
		return 'Nom trop court';
	}
	return '';
}
function checkSurname(surname){
	if(surname.length < 2){
		return 'Prénom trop court';
	}
	return '';
}
function checkEmail(email){
	if(email.length < 3){
		return 'Email invalide';
	}
	if(!email.includes('@')){
		return 'Il manque l\'@';
	}
	if(!email.includes('.')){
		return 'Nom de domaine invalide';
	}
	return '';
}
function checkPassword(password){
	if(password.length < 6){
		return 'Le mot de passe doit contenir au moins 6 caractères';
	}
	return '';
}
function checkPassword2(passwords){
	if(passwords[0] !== passwords[1]){
		return 'Les mots de passe ne correspondent pas';
	}
	return '';
}

function checkLogin(errors) {
	console.log(errors);
	
	if ((errors.emailError === '') && (errors.passwordError === '')) {
		return true;
	}
	return false;
}

function checkSignin(errors) {
	console.log(errors);
	
	if ((errors.surnameError === '') && (errors.nameError === '') &&
		(errors.emailError === '') && (errors.passwordError === '') &&
		(errors.password2Error === '')) {
		return true;
	}
	return false;
}

export default (state = INITIAL_STATE, action) => {
	
	// console.log(action);

	switch (action.type) {
		case PRENOM_CHANGED:
			return { ...state, surnameError: checkSurname(action.payload) };
		case NOM_CHANGED:
			return { ...state, nameError: checkName(action.payload) };
		case EMAIL_CHANGED:
			return { ...state, emailError: checkEmail(action.payload) };
		case PASSWORD_CHANGED:
			return { ...state, passwordError: checkPassword(action.payload[0])};
		case PASSWORD2_CHANGED:
			return { ...state, password2Error: checkPassword2(action.payload) };
		case LOGIN_USER_SUCCESS:
			return { 
				...state,
				...INITIAL_STATE
			};
		case CREATE_USER_SUCCESS:
			return { 
				...state,
				...INITIAL_STATE
			};
		case DISPLAY_EMAIL_ERROR:
			return { 
				...INITIAL_STATE,
				emailError: action.payload,
				displayErrors: true
			};
		case DISPLAY_PASSWORD_ERROR:
			return { 
				...INITIAL_STATE,
				passwordError: action.payload,
				displayErrors: true
			};
		case LOADING_AUTH:
			if (action.payload) {
				return {
					...state,
					canSignin: false,
					canLogin: false
				};
			}
			return state;
		case TRY_SIGNIN:
			const surnameError = checkSurname(action.payload.surname);
			const nameError = checkName(action.payload.name);
			var emailError = checkEmail(action.payload.email);
			var passwordError = checkPassword(action.payload.passwords[0]);
			const password2Error = checkPassword2(action.payload.passwords);
			const canSignin = checkSignin({surnameError, nameError, emailError, passwordError, password2Error});
			return {
				...state,
				surnameError,
				nameError,
				emailError,
				passwordError,
				password2Error,
				canSignin,
				displayErrors: true
			}

		case TRY_LOGIN:
			emailError = checkEmail(action.payload.email);
			passwordError = checkPassword(action.payload.password);
			const canLogin = checkLogin({emailError, passwordError});
			return {
				...state,
				emailError,
				passwordError,
				canLogin,
				displayErrors: true
			}
		case CLEAR_ERROR:
			switch(action.payload) {
				case 'surname': surnameError = ''; return { ...state, surnameError};
				case 'name': nameError = ''; return { ...state, nameError};
				case 'email': emailError = ''; return { ...state, emailError};
				case 'password': passwordError = ''; return { ...state, passwordError};
				case 'password2': password2Error = ''; return { ...state, password2Error};
			}

		default:
			return state;
	}
};

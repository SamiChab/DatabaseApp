import firebase from 'firebase';
import { Alert } from 'react-native';
import I18n from 'react-native-i18n';


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
	USER_DELETE_AFTER_LOGIN,
	TRY_LOGIN,
	TRY_SIGNIN,
	CLEAR_ERROR
} from '../types';

export const nomChanged = (text) => {
	return {
		type: NOM_CHANGED,
		payload: text
	};
};

export const prenomChanged = (text) => {
	return {
		type: PRENOM_CHANGED,
		payload: text
	};
};

export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	};
};

export const password2Changed = (text) => {
	return {
		type: PASSWORD2_CHANGED,
		payload: text
	};
};

export const tryLoginEmailPassword = (object) => {
	return {
		type: TRY_LOGIN,
		payload: object
	};
};

export const trySigninEmailPassword = (object) => {
	return {
		type: TRY_SIGNIN,
		payload: object
	};
};

export const loginUserEmailPassword = ({ email, password }) => {
	console.log('About to login user');
	return (dispatch) => {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch((error) => { firebaseErrorManager(dispatch, error); })			
		;
	};
};

export const loginUserFacebook = (token, userProfile) => {
	console.log(userProfile);
	const credential = firebase.auth.FacebookAuthProvider.credential(token);
	return (dispatch) => {
		firebase.auth().signInWithCredential(credential)
			.then(user => loginUserSuccess(dispatch, user))
			.then(user => userPush(dispatch, userProfile))
			.catch((error) => { firebaseErrorManager(dispatch, error); })
		;
	};
};

export const loginUserGoogle = (idToken, userProfile) => {
	console.log(userProfile);
	const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
	return (dispatch) => {
		firebase.auth().signInWithCredential(credential)
			.then(user => loginUserSuccess(dispatch, user))
			.then(user => userPush(dispatch, userProfile))
			.catch((error) => { firebaseErrorManager(dispatch, error); })
		;
	};
};

export const createUserEmailPassword = ({ name, surname, email, password }, userProfile) => {
	console.log(userProfile);
	return (dispatch) => {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(user => createUserSuccess(dispatch, user))
			.then(() => userPush(dispatch, userProfile))
			.catch((error) => { firebaseErrorManager(dispatch, error); })
		;	
	};
};

export const deleteUser = () => {
	const { currentUser } = firebase.auth();
	console.log('About to delete user');
	
	return (dispatch) => {

		currentUser.delete()
			.then(() => dispatch({ type: USER_DELETED }))
			.then(() => {
				firebase.database().ref(`/users/${currentUser.uid}/userId`).remove()
					.then(() => console.log('DB removed'))
					.catch((error) => { firebaseErrorManager(dispatch, error); });
			})
			.catch((error) => firebaseErrorManager(dispatch, error));
	};
};

// Permet d'enregistrer le profil de l'utilisateur dans la base de données
export const userPush = (dispatch, userProfile) => {
	console.log('Push user');
	console.log(userProfile);
	const { currentUser } = firebase.auth();
	firebase.database().ref(`/users/${currentUser.uid}/userId`)
		.push(userProfile)
		.catch((error) => { firebaseErrorManager(dispatch, error); });
};

// Permet de récupérer le profil de l'utilisateur depuis la base de données
export const userFetch = () => {
	console.log('Fetch user');
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/userId`)
			.on('value', (snapshot) => {
				const snapshotValue = snapshot.val();
				if((snapshotValue !== null) && (snapshotValue !== undefined)){
					Object.keys(snapshotValue).forEach(key => {
						dispatch({ 
							type: USER_FETCH_SUCCESS,
							payload: snapshotValue[key]
						});
					});
				} else {
					dispatch({ 
						type: USER_FETCH_FAIL,
					});
				}
				
			})
		;
	};
};

export const setUserDeleteAfterLogin = (value) => {
	return {
		type: USER_DELETE_AFTER_LOGIN,
		payload: value
	};	
}

export const setLoading = (value) => {
	return {
		type: LOADING_AUTH,
		payload: value
	};
}

export const clearError = (errorName) => {
	return {
		type: CLEAR_ERROR,
		payload: errorName
	};
}

const firebaseErrorManager = (dispatch, error) => {
	let message = '';

	console.log(error);

	switch (error.code) {
		case 'auth/user-not-found':
			message = 'Il n\'y a pas de compte lié à cette adresse mail';
			displayEmailError(dispatch, message);				
			break;
		case 'auth/email-already-in-use':
			message = 'Cet email est déjà associé à un compte';
			displayEmailError(dispatch, message);
			break;
		case 'auth/invalid-email':
			message = 'Adresse mail invalide'
			displayEmailError(dispatch, message);
			break;
		case 'auth/wrong-password':
			message = 'Mot de passe incorrect';
			displayPasswordError(dispatch, message);
			break;
		case 'auth/weak-password':
			message = 'Le mot de passe doit contenir au moins 6 caractères';
			displayPasswordError(dispatch, message);			
			break;
		case 'auth/network-request-failed':
			message = 'Pas de connexion internet';
			displayAlertError(message);			
			break;
		case 'auth/too-many-requests' :
			message = 'Vous avez fait trop de tentatives de connexion. Réessayez dans quelques minutes.'
			displayAlertError(message);			
			break;		
		case 'auth/user-disabled':
			message = 'L\'utilisateur a été désactivé par un administrateur';
			displayAlertError(message);			
			break;
		case 'auth/requires-recent-login':
			recentLoginAlert(dispatch);
			break;
		default:
			console.log(error);
			displayAlertError(error.message);
			//throw (error);

	}
	loading(dispatch, false);	
};

const loginUserSuccess = (dispatch, user) => {	
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});
};

const createUserSuccess = (dispatch, user) => {
	dispatch({
		type: CREATE_USER_SUCCESS,
		payload: user
	});
};

const displayEmailError = (dispatch, errorMessage) => {
	loading(dispatch, false);
	dispatch({
		type: DISPLAY_EMAIL_ERROR,
		payload: errorMessage
	});
};

const displayAlertError = (errorMessage) => {
	Alert.alert(
		I18n.t('error'),
		errorMessage
	)
};

const recentLoginAlert = (dispatch) => {
	Alert.alert(
		I18n.t('warning'),
		I18n.t('auth.recentLogin'),
		[
			{text: I18n.t('cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			{text: I18n.t('account.logout'), onPress: () => {
				firebase.auth().signOut();
				dispatch({
					type: USER_DELETE_AFTER_LOGIN,
					payload: true				
				})
			}}
		],
		{ cancelable: false }
	)
};

const displayPasswordError = (dispatch, errorMessage) => {
	loading(dispatch, false);
	dispatch({
		type: DISPLAY_PASSWORD_ERROR,
		payload: errorMessage
	});
};

const loading = (dispatch, value) => {
	dispatch({
		type: LOADING_AUTH,
		payload: value
	});
};


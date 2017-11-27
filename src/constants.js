
export const FB_APP_ID = '136725286974979';
export const FB_OPTIONS = {permissions: ['public_profile', 'email']};

const ANDROID_GOOGLE_CLIENT_ID =  '780182783769-cv8bb2qojuv5jgs71gsevqbe5k1himlm.apps.googleusercontent.com';
const IOS_GOOGLE_CLIENT_ID =  '780182783769-7ojicoh4o1d0of10ot3uq7vq6gqvla2l.apps.googleusercontent.com';

export const GOOGLE_OPTIONS = {
	androidClientId: ANDROID_GOOGLE_CLIENT_ID,
	iosClientId: IOS_GOOGLE_CLIENT_ID,
	scopes: ['profile', 'email']
}

export const USER_PROFILE = {
	id: '',
	name: '',
	surname: '',
	email: '',
	photoURL: '',
	gender: ''
};

export const firebaseConfig = {
	apiKey: "AIzaSyDEE8wgh551maA4Kv7M0MUMwn0RFXO8WIk",
	authDomain: "database-f816d.firebaseapp.com",
	databaseURL: "https://database-f816d.firebaseio.com",
	projectId: "database-f816d",
	storageBucket: "",
	messagingSenderId: "831402254622"
};

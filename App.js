import './src/I18n/I18n';

import React, { Component } from 'react';
import { Platform, StatusBar, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import I18n from 'react-native-i18n';
import firebase from 'firebase';
import color from 'color';

import RouteDescription from './src/Route';

import SplashScreen from './src/screens/Splash';
import WelcomeScreen from './src/screens/Welcome';
import AuthScreen from './src/screens/Auth';

import * as baseStyle from './styles';

import { store, persistStoreConfig } from './src/redux/store';
import reducers from './src/redux/reducers';

import { firebaseConfig } from './src/constants';

class App extends Component {
	constructor() {
		super();   
		console.ignoredYellowBox = ['Setting a timer'];
		console.ignoredYellowBox = ['Remote debugger'];
	}

	state = {
		rehydrated: false,
		userLoggedIn: null,
		welcomeFinished: false
	}
	
	async componentWillMount() { 
		/* Pour utiliser Native-Base avec Expo, il faut charger la police Roboto_medium */
		/* await Expo.Font.loadAsync({
			'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
		}); */

 		persistStore (
			store,
			persistStoreConfig, 
			() => {
				this.setState({ rehydrated: true });
				this.setState({ welcomeFinished: store.getState().settings.welcomeFinished });		
			}
		);//.purge();

		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}

		const self = this;
		firebase.auth().languageCode = I18n.currentLocale();
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				console.log('User is logged in.');
				self.setState({ userLoggedIn: true })
			
				/* if(!user.emailVerified) {
					user.sendEmailVerification()
						.then(() => console.log('Sent Email verification'))
						.catch(() => console.log('Error, no verification email sent'));
				} else { console.log('User mail was already verified'); } */
			} else {
				console.log('No user is logged in.');
				self.setState({ userLoggedIn: false })
			}
		});

		// console.log(`Vérifier que androidStatusBarColor dans app.json vaut bien ${color(baseStyle.COLOR_PRIMARY).darken(0.2).hex()}`); // Si on utilise Expo
		
	}

	render() {
		if (Platform.OS === 'android') {
			StatusBar.setBackgroundColor(baseStyle.statusBarColor());
		}
		StatusBar.setBarStyle(baseStyle.statusBarStyle);

		I18n.locale = store.getState().settings.language;

		if(!this.state.rehydrated || (this.state.userLoggedIn === null)) {
			return <SplashScreen />
		}
		if(!this.state.welcomeFinished) {
			return(
				<View style={{ flex: 1 }}>
					<Provider store={store}>
						<WelcomeScreen
							onFinished={() => this.setState({ welcomeFinished: true })}
						/>
					</Provider>
				</View>
			);
		}
		if(!this.state.userLoggedIn) {
			return(
				<View style={{ flex: 1 }}>
					<Provider store={store}>
						<AuthScreen />
					</Provider>
				</View>
			);
		}
		return (
			<View style={{ flex: 1 }}>
				<Provider store={store}>
					<RouteDescription />
				</Provider>
			</View>
		);
	}
}

export default App;

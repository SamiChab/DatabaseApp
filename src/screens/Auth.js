import React, { Component } from 'react';
import { AsyncStorage, View, ScrollView, Text, Alert, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
//import { Facebook, Google } from 'expo';
import { StackNavigator } from 'react-navigation';

import CreateForm from '../components/CreateForm';
import LoginForm from '../components/LoginForm';
import * as baseStyle from '../../styles';
import * as actions from '../redux/actions';
import { USER } from '../redux/types';

import { FB_APP_ID, FB_OPTIONS, GOOGLE_OPTIONS } from '../constants';

import { USER_PROFILE } from '../constants';

class Auth extends Component {

	static navigationOptions = ({navigation}) => ({
		headerTitle: I18n.t('auth.title'),
		headerStyle: {
			backgroundColor: Platform.OS === 'android' ? baseStyle.COLOR_PRIMARY : baseStyle.COLOR_SECONDARY,
		},
		headerTintColor: Platform.OS === 'android' ? baseStyle.COLOR_SECONDARY : baseStyle.COLOR_PRIMARY,
	})

	state = {
		signIn: false
	}

	async createWithEmailAndPassword(object) {
		this.props.setLoading(true);
		
		const { surname, name, email, password } = object;
		var userProfile = {};//Object.create(USER_PROFILE);
		userProfile.name = name;
		userProfile.surname = surname;
		userProfile.email = email;
		userProfile.photoURL = 'https://i.imgur.com/05Zayuj.png';

		this.props.createUserEmailPassword({ name, surname, email, password }, userProfile);
	}

	async loginWithEmailAndPassword(object) {
		this.props.setLoading(true);
		
		const { email, password } = object;
		this.props.loginUserEmailPassword({ email, password });
	}

	async loginWithFacebook() {
		
		// this.props.setLoading(true);
		// const { type, token } = await Facebook.logInWithReadPermissionsAsync(FB_APP_ID, FB_OPTIONS)

		this.displayAlertError('Cette fonctionnalité n\'est disponible pour le moment que pour les projets Expo');
		return;

		if (type === 'success') {
			console.log('Login facebook success');
			
			const response = await fetch(
				`https://graph.facebook.com/me?fields=id,email,name,cover,picture,first_name,last_name,gender&access_token=${token}`);
			//console.log(await response.json());
			const responseJSON = await response.json()

			const { id, last_name, first_name, email, picture, gender } = responseJSON;
			var userProfile = Object.create(USER_PROFILE);			
			userProfile.id = id;
			userProfile.name = last_name;
			userProfile.surname = first_name;
			userProfile.email = email;
			userProfile.photoURL = picture.data.url;
			userProfile.gender = gender;

			this.props.loginUserFacebook(token, userProfile);
		} else {
			console.log('Echec de la connexion facebook');
			this.props.setLoading(false);			
		}
	}

	async loginWithGoogle() {
		
		// this.props.setLoading(true);
		// const { type, accessToken, idToken, user } = await Google.logInAsync(GOOGLE_OPTIONS);
		
		this.displayAlertError('Cette fonctionnalité n\'est disponible pour le moment que pour les projets Expo');
		return;

		if (type === 'success') {
			console.log('Login google success');

			const { id, familyName, givenName, email, photoUrl } = user;
			var userProfile = Object.create(USER_PROFILE);
			userProfile.id = id;
			userProfile.name = familyName;
			userProfile.surname = givenName;
			userProfile.email = email;
			userProfile.photoURL = photoUrl;
			
			this.props.loginUserGoogle(idToken, userProfile);
			
		} else {
			console.log('Echec de la connexion google');
			this.props.setLoading(false);
		}
	}
	
	displayAlertError(errorMessage) {
		Alert.alert(
			'Erreur',
			errorMessage
		)
	};

	renderForm() {
		if(this.state.signIn){
			return(
				<CreateForm
					onLogin={() => this.setState({ signIn: false })}
					onCreateWithEmailAndPassword={this.createWithEmailAndPassword.bind(this)}
				/>
			);
		}
		return(
			<LoginForm
				onSignin={() => this.setState({ signIn: true })}				
				onLoginWithEmailAndPassword={this.loginWithEmailAndPassword.bind(this)}
			/>
		);
	}

	render() {

		return (
			<View style={baseStyle.view}>
			<ScrollView
				style={[baseStyle.view, {marginLeft: 10, marginRight: 10, marginTop: -5}]}
				keyboardShouldPersistTaps="always"
				showsVerticalScrollIndicator={false}
			>
				{this.renderForm()}

				<Text style={{
					fontSize: 17,
					color: baseStyle.COLOR_DISABLED,
					textAlign: 'center',
					marginTop: 10
				}}>
					{I18n.t('auth.or')}
				</Text>

				<Button
					iconLeft
					block
					onPress={this.loginWithFacebook.bind(this)}
					style={{
						backgroundColor: baseStyle.COLOR_FACEBOOK,
						marginTop: 10
					}}
				>
					<FontAwesome
						name='facebook'
						color={baseStyle.COLOR_SECONDARY}
						size={25}
						style={{flex: 2, marginLeft: 15 }}
					/>
					<Text
						style={{
							textAlign: 'left',
							color: baseStyle.COLOR_SECONDARY,
							fontSize: 23,
							fontWeight: '500',
							marginLeft: 10,
							flex: 15
						}}
					>{I18n.t('auth.connectWith')}{I18n.t('auth.facebook')}</Text>
				</Button>

				<Button
					iconLeft
					block
					onPress={this.loginWithGoogle.bind(this)}
					style={{
						backgroundColor: baseStyle.COLOR_GOOGLE,
						marginTop: 10,
						marginBottom: 10
					}}
				>
					<FontAwesome
						name='google-plus'
						color={baseStyle.COLOR_SECONDARY}
						size={25}
						style={{flex: 2, marginLeft: 15 }}
					/>
					<Text
						style={{
							textAlign: 'left',
							color: baseStyle.COLOR_SECONDARY,
							fontSize: 23,
							fontWeight: '500',
							marginLeft: 10,
							flex: 15
						}}
					>{I18n.t('auth.connectWith')}{I18n.t('auth.google')}</Text>
				</Button>

			</ScrollView>
			</View>
		);
	}
}

export default Auth = StackNavigator({
	auth: { screen: connect(null, actions)(Auth) }
});

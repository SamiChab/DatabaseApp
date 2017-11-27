import React, { Component } from 'react';
import { View, Text, Animated, PanResponder, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Form, Item, Label, Button, Spinner, Input, Icon } from 'native-base';
import I18n from 'react-native-i18n';

import * as actions from '../redux/actions';

import {
	wasSelected,
	errorBool,
	successBool,
	labelColor,
	errorMessage,
	checkErrors
} from './FormValues'

import * as baseStyle from '../../styles';


class CreateForm extends Component {
	constructor(props) {
		super(props);
		const position = new Animated.ValueXY(); 

		this.state = { position };
	}

	componentWillMount() {
		this.props.setLoading(false);		
	}

	componentWillReceiveProps(nextProps){

		if(nextProps.canSignin) {
			console.log('Inscription!!');
			const { surname, name, email, password } = nextProps;		
			nextProps.onCreateWithEmailAndPassword({ name, surname, email, password });
		}
	}

	renderErrorText(errorString){	
		if(errorString === '') {
			return null;
		}
		return(
			<Animated.Text
				style={[this.state.position.getLayout(), {
					marginBottom: -17,
					marginLeft: 10,
					alignSelf: 'flex-end',
					color:'red'
				}]}
			>
				{errorString}
			</Animated.Text>
		);
	};

	onPrenomChange(text) {
		this.props.prenomChanged(text);
	}
	onNomChange(text) {
		this.props.nomChanged(text);
	}
	onEmailChange(text) {
		this.props.emailChanged(text);
	}
	onPasswordChange(text) {
		this.props.passwordChanged([text, this.props.password2]);
	}
	onPassword2Change(text) {
		this.props.password2Changed([this.props.password, text]);
	}

	onButtonPress() {
		const { surname, name, email, password, password2 } = this.props;
		const animDuration = 30;
		const animOffset = -10;

		this.props.trySigninEmailPassword({
			surname: this.props.surname,
			name: this.props.name,
			email: this.props.email,
			passwords: [this.props.password, this.props.password2]
		});

		this.state.position.setValue({ x: 0, y: 0 });
		Animated.sequence([
			Animated.timing(this.state.position, {
				duration: animDuration,
				toValue: {x: animOffset, y: 0} // return to start
			}),
			Animated.timing(this.state.position, {
				duration: animDuration,
				toValue: {x: 0, y: 0} // return to start
			}),
			Animated.timing(this.state.position, {
				duration: animDuration,
				toValue: {x: animOffset, y: 0} // return to start
			}),
			Animated.timing(this.state.position, {
				duration: animDuration,
				toValue: {x: 0, y: 0} // return to start
			}),
			Animated.timing(this.state.position, {
				duration: animDuration,
				toValue: {x: animOffset, y: 0} // return to start
			}),
			Animated.timing(this.state.position, {
				duration: animDuration,
				toValue: {x: 0, y: 0} // return to start
			})
		]).start();
		 
	}

	renderButton() {
		
		if (this.props.loading) {
			return (
				<View style={{height: 45, justifyContent:'center'}}>
				<Spinner
					color={baseStyle.COLOR_PRIMARY}
				/>
				</View>	
			);
		} 
		return (
			<Button
				bordered block
				onPress={this.onButtonPress.bind(this)}
				style={{ borderColor: baseStyle.COLOR_PRIMARY }}
			>
				<Text
					style={{
						color: baseStyle.COLOR_PRIMARY,
						fontSize: 27
					}}
				>{I18n.t('auth.register')}</Text>
			</Button>
		);		
	}

	render() {
		checkErrors(this.props);
		//console.log(this.props);
		// <Icon name='ios-person' />
		
		return (
			<Form>
				<Item
					floatingLabel
					error={errorBool.surname}
					success={successBool.surname}
				>
					<Label style={{top: 15, color:labelColor.surname}}>
						{I18n.t('auth.surname')}
					</Label>
					<Input
						onEndEditing={() => {wasSelected.surname = true; this.forceUpdate();}}
						onChangeText={this.onPrenomChange.bind(this)}
						value={this.props.surname}
					/>
				</Item>
				{this.renderErrorText(errorMessage.surname)}

				<Item
					floatingLabel
					error={errorBool.name}
					success={successBool.name}
				>
					<Label style={{top: 15, color:labelColor.name}}>
						{I18n.t('auth.name')}
					</Label>
					<Input
						onEndEditing={() => {wasSelected.name = true; this.forceUpdate();}}
						onChangeText={this.onNomChange.bind(this)}
						value={this.props.name}
					/>
				</Item>
				{this.renderErrorText(errorMessage.name)}

				<Item
					floatingLabel
					error={errorBool.email}
					success={successBool.email}
				>
					<Label style={{top: 15, color:labelColor.email}}>
						{I18n.t('auth.email')}
					</Label>
					<Input
						onEndEditing={() => {wasSelected.email = true; this.forceUpdate();}}
						onChangeText={this.onEmailChange.bind(this)}
						value={this.props.email}
					/>
				</Item>
				{this.renderErrorText(errorMessage.email)}

				<Item
					floatingLabel
					error={errorBool.password}
					success={successBool.password}
				>
					<Label style={{top: 15, color:labelColor.password}}>
						{I18n.t('auth.password')}
					</Label>
					<Input
						secureTextEntry
						onEndEditing={() => {wasSelected.password = true; this.forceUpdate();}}
						onChangeText={this.onPasswordChange.bind(this)}
						value={this.props.password}
					/>
				</Item>
				{this.renderErrorText(errorMessage.password)}

				<Item
					floatingLabel
					error={errorBool.password2}
					success={successBool.password2}
				>
					<Label style={{top: 15, color:labelColor.password2}}>
						{I18n.t('auth.confirmPassword')}
					</Label>
					<Input
						secureTextEntry
						onEndEditing={() => {wasSelected.password2 = true; this.forceUpdate();}}
						onChangeText={this.onPassword2Change.bind(this)}
						value={this.props.password2}
					/>
				</Item>
				{this.renderErrorText(errorMessage.password2)}

				<View style={{
						flexDirection: 'row',
						alignSelf: 'center',
						marginTop: 25,
						marginBottom: 20
					}}>

					<Text style={{
						fontSize: 17,
						color: baseStyle.COLOR_DISABLED,
					}}>
						{I18n.t('auth.alreadyAccount')}
					</Text>

					<TouchableOpacity onPress={() => this.props.onLogin()}>
						<Text style={{
							fontSize: 17,
							marginLeft: 5,
							color: baseStyle.COLOR_PRIMARY,
						}}>
							{I18n.t('auth.connect')}
						</Text>
					</TouchableOpacity>

				</View>

				{this.renderButton()}
			</Form>

		);
	}
}

const mapStateToProps = (state) => {

	return { 
		surname: state.auth.surname,
		name: state.auth.name,
		email: state.auth.email,
		password: state.auth.password,
		password2: state.auth.password2,
		loading: state.auth.loading,
		
		error: {
			surname: state.authError.surnameError,
			name: state.authError.nameError,
			email: state.authError.emailError,
			password: state.authError.passwordError,
			password2: state.authError.password2Error,
			auth: state.authError.authError,
		},
		canSignin: state.authError.canSignin,
		displayErrors: state.authError.displayErrors,
	};
};

export default connect(mapStateToProps, actions)(CreateForm);

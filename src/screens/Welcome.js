import React, { Component } from 'react';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import { StackNavigator } from 'react-navigation';
import I18n from 'react-native-i18n';
import _ from 'lodash';

import WelcomeSlides from './WelcomeSlides';
import getWelcomeData from './WelcomeData';

import * as actions from '../redux/actions';
import * as baseStyle from '../../styles';

class Welcome extends Component {
	constructor(props) {
		super(props);
	}
	
	static navigationOptions = ({navigation}) => ({
		headerTitle: I18n.t('welcome'),
		headerStyle: {
			backgroundColor: Platform.OS === 'android' ? baseStyle.COLOR_PRIMARY : baseStyle.COLOR_SECONDARY,
		},
		headerTintColor: Platform.OS === 'android' ? baseStyle.COLOR_SECONDARY : baseStyle.COLOR_PRIMARY,
	})
	
	render() {
		let WELCOME_DATA = getWelcomeData(I18n.currentLocale());
		return (

			<WelcomeSlides
				data={WELCOME_DATA}
				style={{ flex: 1 }}
				onComplete={() => {
					console.log("Tuto finished");
					this.props.welcomeTutoFinished(true);
					this.props.onFinished();
				}}
			/>
		);
	}
}

export default connect(null, actions)(Welcome);

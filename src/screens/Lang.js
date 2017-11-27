import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import I18n from 'react-native-i18n';

import * as actions from '../redux/actions';
import * as baseStyle from '../../styles';

class Lang extends Component {

	render() {

		return (
			<View style={baseStyle.view}>

		
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	//console.log(state);
	return {
		settings: state.settings
	}
}

export default connect(mapStateToProps, actions)(Lang);

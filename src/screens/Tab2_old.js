import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as actions from '../redux/actions';
import * as baseStyle from '../../styles';

class Tab2 extends Component {
	static navigationOptions = ({navigation}) => ({
		headerTitle: I18n.t('tabs.header'),
		title: I18n.t('tab2.title'),
		drawerLabel: I18n.t('tabs.header'),
		drawerIcon: ({ tintColor }) => <FontAwesome name="home" size={23} color={tintColor} />,
		tabBarIcon: ({ tintColor }) => <FontAwesome name="home" size={23} color={tintColor} />,
		headerRight: (
			<baseStyle.renderHeaderMainRight
				navigation={navigation}
			/>
		),
		headerLeft: (
			<baseStyle.renderHeaderMainLeft
				navigation={navigation}
			/>
		)
	})

	render() {
		return (
			<View style={baseStyle.view} />
		);
	}
}

const mapStateToProps = (state) => {
	return {
		settings: state.settings
	}
}

export default connect(mapStateToProps, actions)(Tab2);

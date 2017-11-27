import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
import { Button, List, ListItem } from 'native-base';
import firebase from 'firebase';

import * as baseStyle from '../../../styles';
import * as actions from '../../redux/actions';


class AccountSettings extends Component {

	static navigationOptions = ({navigation}) => ({
		headerTitle: I18n.t('account.title'),
	})

	render() {
		return (
			<List style={{backgroundColor: 'white'}}>
				<ListItem>
					<TouchableOpacity
						//bordered block
						onPress={() => {
							firebase.auth().signOut();
						}}
						style={{ width: baseStyle.SCREEN_WIDTH-30, flexDirection: 'row' }}
					>
						<FontAwesome
							name='sign-out'
							size={25}
							style={{flex: 2, marginLeft: 15 }}
						/>
						<Text
							style={{
								fontSize: 20,
								flex: 15
							}}
						>{I18n.t('account.logout')}</Text>
					</TouchableOpacity>
				</ListItem>	
				<ListItem>
					<TouchableOpacity
						//bordered block
						onPress={() => {
							Alert.alert(
								I18n.t('warning'),
								I18n.t('account.aboutToDelete'),
								[
									{text: I18n.t('cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
									{text: I18n.t('ok'), onPress: () => this.props.deleteUser(), style: 'destructive'},
								],
								{ cancelable: false }
							);
						}}
						style={{ width: baseStyle.SCREEN_WIDTH-30, flexDirection: 'row' }}
					>
						<FontAwesome
							name='trash-o'
							size={25}
							style={{flex: 2, marginLeft: 15 }}
						/>
						<Text
							style={{
								fontSize: 20,
								flex: 15
							}}
						>{I18n.t('account.delete')}</Text>
					</TouchableOpacity>
				</ListItem>	
			</List>
		);
	}
}

const mapStateToProps = (state) => {
	const {  } = state.reducer;
	return {  };
};

export default connect(null, actions)(AccountSettings);

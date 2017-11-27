import React, { Component } from 'react';
import { View, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, Left, Thumbnail, Body, Text, Content, List, ListItem } from 'native-base';
import { StackNavigator } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import I18n from 'react-native-i18n';

import * as actions from '../redux/actions';
import * as baseStyle from '../../styles';

const languageOptions =	Object.keys(I18n.translations).map((lang, i) => {
	return (
		<Picker.Item key={ i }
			label={ I18n.translations[lang].id }
			value={ lang } />)
});

var userState = false;

class Settings extends Component {

	static navigationOptions = ({navigation}) => ({
		title: I18n.t('settings.title'),
		drawerLabel: I18n.t('settings.title'),
		drawerIcon: ({ tintColor }) => <FontAwesome name="cog" size={23} color={tintColor} />,
		headerLeft: (
			<baseStyle.renderHeaderMainLeft
				navigation={navigation}
			/>
		)
	})

	componentWillMount() {
		//console.log(I18n.currentLocale());
		this.props.userFetch();
	}

	languageChanged = (newLang) => {
		this.props.changeLanguage(newLang);
		this.props.navigation.setParams({
			title: I18n.t('settings.title', { locale: newLang })
		})
	}

	render() {
		
		var name = 'Nom';
		var surname = 'Prénom';
		var email = 'Adresse mail';
		var photoURL = { uri: 'https://i.imgur.com/05Zayuj.png' };

		if(this.props.userProfile !== undefined) {
			name = this.props.userProfile.name;
			surname = this.props.userProfile.surname;
			email = this.props.userProfile.email;
			photoURL = {
				uri: this.props.userProfile.photoURL
			}
		}
		
		return (
			<List style={{backgroundColor: 'white'}}>
				<ListItem>
					<Left>
						<Thumbnail
							source={photoURL}
							style={{ marginRight: 5 }}
						/>
						<Body style={{ alignSelf: 'center'}}>
							<Text>{surname}{' '}{name}</Text>
							<Text note>{email}</Text>
						</Body>
					</Left>
				</ListItem>
				<ListItem
					onPress={() => this.props.navigation.navigate('account')}
				>
					<FontAwesome
						name='user'
						color={baseStyle.COLOR_PRIMARY}
						size={25}
						style={{flex: 2, marginLeft: 15 }}
					/>
					<Text
						style={{
							textAlign: 'left',
							//color: baseStyle.COLOR_GREY,
							fontSize: 17,
							//fontWeight: '500',
							marginLeft: 10,
							flex: 15
						}}
					>{I18n.t('account.title')}</Text>
				</ListItem>	
				<ListItem>	
					<FontAwesome
						name='language'
						color={baseStyle.COLOR_PRIMARY}
						size={25}
						style={{flex: 2, marginLeft: 15 }}
					/>
					<View style={{ flex: 15, flexDirection: 'row' }}>
					<Text
						style={{
							textAlign: 'left',
							fontSize: 17,
							marginLeft: 10,
							flex: 1
						}}
					>{I18n.t('settings.language')}</Text>
					<Picker style={{ flex: 2, marginRight: 10 }}
						selectedValue={ this.props.settings.language }
						onValueChange={ lang =>  this.languageChanged(lang) }
					>
						{ languageOptions }
					</Picker>
					</View>
				</ListItem>	
			</List>
		);
	}
}

const mapStateToProps = (state) => {
	//console.log(state);
	return {
		settings: state.settings,
		userProfile: state.auth.userProfile
	}
}

export default connect(mapStateToProps, actions)(Settings);

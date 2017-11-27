import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardItem, Left, Thumbnail, Body, Text, Container, Content } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';

import * as actions from '../redux/actions';
import * as baseStyle from '../../styles';

class Tab1 extends Component {

	static navigationOptions = ({navigation}) => ({
		headerTitle: I18n.t('tabs.header'),
		title: I18n.t('tab1.title'),
		drawerLabel: I18n.t('tabs.header'),
		drawerIcon: ({ tintColor }) => <FontAwesome name="address-book" size={23} color={tintColor} />,
		tabBarIcon: ({ tintColor }) => <FontAwesome name="address-book" size={23} color={tintColor} />,
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

	componentWillMount() {
		this.props.userFetch();
		if(this.props.userDeleteAfterLogin){
			this.props.navigation.navigate('account');
			console.log('Maintenant fraîchement connecté, suppression du compte');
		}
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
			//<View style={baseStyle.view}>
			<Container>
				<Content>
				<Card>
					<CardItem>
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
					</CardItem>
					<CardItem cardBody>
						<Image source={{uri: 'https://i.imgur.com/k9sbIXu.jpg'}} style={{height: 125, width: null, flex: 1}}/>
					</CardItem>
				</Card>		
				</Content>			
			</Container>
			//</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userProfile: state.auth.userProfile,
		userDeleteAfterLogin: state.auth.userDeleteAfterLogin,
		settings: state.settings
	}
}

export default connect(mapStateToProps, actions)(Tab1);

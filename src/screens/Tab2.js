import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { Fab, Icon } from 'native-base';

import * as actions from '../redux/actions';
import * as baseStyle from '../../styles';

class Tab2 extends Component {

	state = {
		refreshing: false,
		notes: []
	}

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

	componentWillMount() {
		// const serveur = 'http://localhost:5000';
		// const URL = serveur.concat('/get/notes');
		this.reloadNotes();
	}

	renderItem ({item}) {
		return (
			<TouchableOpacity
				style={styles.item}
				onPress={() => this.props.navigation.navigate(
					'note',
					{ new: false, note: item, refresh: () => { this.reloadNotes(); } }
				)}
			>
				<View style={{ flexDirection: "row", justifyContent: "space-between", }}>
					<Text style={styles.itemTitle}
					numberOfLines={1}
					>
						{item.title}
					</Text>
					<Text style={styles.itemDate}>
						{this.getDate(item.date)}
					</Text>
				</View>
				<Text
					style={styles.itemBody}
					numberOfLines={1}
				>
					{item.body}
				</Text>
			</TouchableOpacity>
		);
	}

	getDate(date) {
		var rDate = new Date(date);
		return rDate.toLocaleDateString();
	}

	reloadNotes () {
		console.log('reloadNotes');
		axios.get('http://localhost:5000/get/notes')
			.then((response) => {
				console.log(response);
				this.setState({ notes: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	reloadNotesRefreshing () {
		this.setState({ refreshing: true });
		axios.get('http://localhost:5000/get/notes')
			.then((response) => {
				// console.log(response);
				this.setState({ notes: response.data });
				this.setState({ refreshing: false });		
			})
			.catch((error) => {
				console.log(error);
				this.setState({ refreshing: false });		
			});
	}

	renderList() {
		if (this.state.notes.length === 0) {
			return(
				<Text style={{ flex: 1, fontSize: 20, color: 'gray', marginTop: 30, textAlign: 'center' }}>
					Vous n'avez pas de notes.
				</Text>
			);
		}
		return(
			<FlatList
				data={this.state.notes}
				keyExtractor={(item, index) => item._id}
				renderItem={this.renderItem.bind(this)}
				refreshing={this.state.refreshing}
				onRefresh={this.reloadNotesRefreshing.bind(this)}
			/>
		);
	}

	render() {
		return (
			<View style={{ flex: 1, marginTop: 5 }}>
				{this.renderList()}
				<Fab
					direction="up"
					containerStyle={{ }}
					style={{ backgroundColor: baseStyle.COLOR_PRIMARY }}
					position="bottomRight"
					onPress={() => this.props.navigation.navigate(
						'note',
						{ new: true, refresh: () => { this.reloadNotes(); } }
					)}
				>
					<Icon
						name="add"
						style={{
							fontSize: 35,
							lineHeight: 35
						}}
					/>
				</Fab>
			</View>
		);
	}
}

const styles = {
	itemTitle: {
		fontSize: 20,
		fontWeight: "500",
		marginBottom: 5,
		marginLeft: 15,
		marginRight: 15,
		flex: 3
	},
	itemBody: {
		fontSize: 15,
		marginLeft: 15,
		marginRight: 15
	},
	itemDate: {
		textAlign: "right",
		alignSelf: "center",
		fontSize: 15,
		marginLeft: 15,
		marginRight: 15,
		flex: 1
	},
	item: {
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: 'white',
		margin: 5,
		marginTop: 0,
		borderRadius: 3,
		shadowRadius: 1,
		shadowOpacity: 0.5,
		shadowOffset: { width: 1,  height: 1 },
		elevation: 5 
	}
}

const mapStateToProps = (state) => {
	return {
		userProfile: state.auth.userProfile,
		settings: state.settings
	}
}

export default connect(mapStateToProps, actions)(Tab2);

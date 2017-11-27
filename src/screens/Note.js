import React, { Component } from 'react';
import { Platform, View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as baseStyle from '../../styles';

class Note extends Component {
	static navigationOptions = ({navigation}) => ({
		headerTitle: null,
		headerRight: 
			<View style={{ flexDirection: 'row' }}>
			<TouchableOpacity>
				<FontAwesome
					name='trash-o'
					color={Platform.OS === 'android' ? baseStyle.COLOR_SECONDARY : 'black'}
					size={baseStyle.ICON_HEADER_SIZE}
					style={{ marginRight: 15 }}
					onPress={() => {
						console.log(navigation);
						navigation.state.params.this.deleteNote();
						navigation.goBack();
					}}
				/>
			</TouchableOpacity>
			</View>	
	})

	state = {
		title: '',
		body: '',
		new: false,
		delete: false
	}

	componentWillMount () {
		this.props.navigation.setParams({ this: this });
		if (this.props.navigation.state.params.new) {
			this.setState({ new: true/* , title: "Nouveau titre", body: "Nouveau body" */ });
			
		} else {
			const note = this.props.navigation.state.params.note;	
			this.setState({ title: note.title, body: note.body });
		}
	}

	componentWillUnmount () {
		if (!this.state.delete) { // Si on unmount pour une raison autre que la supression d'une note
			if (this.state.new) {
				this.setNote(this.state.title, this.state.body);
			} else {
				var note = this.props.navigation.state.params.note;
				note.title = this.state.title;
				note.body = this.state.body;
				
				this.updateNote(note);
			}
		}
		// this.props.navigation.state.params.refresh();
	}

	updateNote(note) {
		axios.post('http://localhost:5000/update/note', note)
			.then((response) => {
				// console.log(response);
				this.props.navigation.state.params.refresh();		
			})
			.catch((error) => {
				console.log(error);
				console.log(note);
			});
	}

	setNote(title, body) {
		axios.post('http://localhost:5000/set/note', { title: title, body: body })
			.then((response) => {
				// console.log(response);
				this.props.navigation.state.params.refresh();		
			})
			.catch((error) => {
				console.log(error);
			});
	}

	deleteNote() {
		const note = this.props.navigation.state.params.note;
		
		this.setState({ delete: true });
		console.log(note);
		
		axios.post('http://localhost:5000/delete/note', note)
			.then((response) => {
				console.log(response);
				// console.log('deleted note');
				this.props.navigation.state.params.refresh();		
			})
			.catch((error) => {
				console.log(error);
				console.log(note);
			});
	}

	handleTitle = (text) => {
		this.setState({ title: text })
	}

	handleBody = (text) => {
		this.setState({ body: text })
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				<TextInput
					style={styles.inputTitle}
					onChangeText = {this.handleTitle}
					value = {this.state.title}
					placeholder="Titre"
					returnKeyType="next"
					onSubmitEditing={(event) => { 
						this.refs.bodyInput.focus(); 
					}}
					blurOnSubmit
					multiline
					autoFocus
				>
				</TextInput>

				<TextInput
					ref='bodyInput'
					style={styles.inputBody}					
					onChangeText = {this.handleBody}
					value = {this.state.body}
					placeholder="Contenu"					
					multiline
				>
				</TextInput>
			</View>
		);
	}
}

const styles = {
	inputTitle: {
		fontSize: 20,
		fontWeight: "500",		
		marginBottom: 5,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 15
	},
	inputBody: {
		fontSize: 15,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 15
	}
}
	
export default Note;

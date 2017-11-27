import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Image } from 'react-native';
import AppIntro from 'react-native-app-intro';
import color from 'color';

import * as baseStyle from '../../styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

class WelcomeSlides extends Component {
	renderAppIntro() {
		return (
			<AppIntro
				customStyles={{
					btnContainer: { flex: 0.5, marginBottom: 5 },
					controllText: { fontWeight: 'normal', fontSize: 25 },
					full: {	width: 200 },
				}}
				showSkipButton={false}
				doneBtnLabel='Suivant'
				onDoneBtnClick={this.props.onComplete}
				activeDotColor={this.props.data[0].primaryColor}
				//dotColor='rgba(255, 255, 255, 0.3)'
				dotColor={color('white').alpha(0.3).string()}
			>
				{this.renderSlides()}
			</AppIntro>
		);
	}

	renderSlides() {
		return this.props.data.map((slide, index) => {
			return (
				<View key={index} style={[styles.slide, { backgroundColor: slide.backgroundColor }]}>
					<Image
						style={[slide.imageStyle, { marginTop: 20 }]}
						source={{ uri: slide.imageSource }}
						resizeMode="cover"
					/>
					<View style={styles.textView}>
						<View>						
							<Text style={[styles.titleText, { color: slide.primaryColor }]}>
								{slide.text}
							</Text>
						</View>
						<View>
							<Text style={[styles.descriptionText, { color: slide.primaryColor }]}>
								{slide.description}
							</Text>
						</View>
					</View>
					
					<View />
					
				</View>
			);
		});
	}

	render() {
		return (
			<ScrollView
				horizontal
				pagingEnabled
			>
				{this.renderAppIntro()}
			</ScrollView>
		);
	}
}

const styles = {
	slide: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: baseStyle.COLOR_SECONDARY,
		padding: 15,
	},
	titleText: {
		color: baseStyle.COLOR_SECONDARY,
		fontSize: 30,
		fontWeight: 'bold',
	},
	descriptionText: {
		color: baseStyle.COLOR_SECONDARY,
		fontSize: 15,
		marginTop: 10
	},
	textView: {

	}
};

export default WelcomeSlides;

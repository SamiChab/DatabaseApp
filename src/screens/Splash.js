import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'native-base';

import * as actions from '../redux/actions';
import * as baseStyle from '../../styles';


class Splash extends Component {	

	render() {
		return (
			<View style={[
				baseStyle.centerView, 
				{
					backgroundColor: baseStyle.COLOR_PRIMARY
				}
			]}>
				<Image
					style={{ 
						width: baseStyle.SCREEN_WIDTH / 4,
						height: baseStyle.SCREEN_WIDTH / 4,
					}}
					source={ require('../images/appIcon.png') }
					resizeMode="cover"
				/>
			</View>
		);
	}
}

export default Splash;

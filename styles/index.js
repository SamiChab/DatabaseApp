import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Platform, Dimensions, PixelRatio } from 'react-native';
import color from 'color';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as colors from './colors';


export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;


export const COLOR_PRIMARY = colors.green_800;
export const COLOR_SECONDARY = colors.white;
export const COLOR_DISABLED = colors.grey_700;
export const COLOR_DISABLED_AND = colors.grey_300;
export const COLOR_DISABLED_IOS = colors.grey_600;
export const COLOR_GREY = colors.grey_500;
export const COLOR_FACEBOOK = colors.facebook;
export const COLOR_GOOGLE = colors.google;

export const FONT_NORMAL = 'OpenSans-Regular';
export const FONT_BOLD = 'OpenSans-Bold';

export const BORDER_RADIUS = 5;

export const ICON_SIZE = 20;
export const ICON_HEADER_SIZE = 20;

// Material colors

export const statusBarStyle = Platform.OS === 'android' ? 'light-content' : 'dark-content';

export function statusBarColor() {
	return color(this.COLOR_PRIMARY).darken(0.2).hex();
}


export const view = { 
	flex: 1
};

export const centerView = { 
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center'
};

export const renderHeaderMainRight = (props) => {
	return (
		<View style={{ flexDirection: 'row' }}>
		<TouchableOpacity>
			<FontAwesome
				name='cog'
				color={Platform.OS === 'android' ? COLOR_SECONDARY : 'black'}
				size={ICON_HEADER_SIZE}
				style={{ marginRight: 15 }}
				onPress={() => {
					props.navigation.navigate('settings');
				}}
			/>
		</TouchableOpacity>
		</View>		
	);
};

export const renderHeaderMainLeft = (props) => {
	return (
		<View style={{ flexDirection: 'row' }}>
		<TouchableOpacity>
			<FontAwesome
				name='bars'
				color={Platform.OS === 'android' ? COLOR_SECONDARY : 'black'}
				size={ICON_HEADER_SIZE}
				style={{ marginLeft: 15 }}
				onPress={() => {
					props.navigation.navigate('DrawerOpen');
				}}
			/>
		</TouchableOpacity>
		</View>		
	);
};


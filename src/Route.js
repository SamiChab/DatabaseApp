import React, { Component } from 'react';
import { Platform, Text, View, TouchableOpacity } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

import WelcomeScreen from './screens/Welcome';
import AuthScreen from './screens/Auth';
import LangScreen from './screens/Lang';
import Tab1Screen from './screens/Tab1';
import Tab2Screen from './screens/Tab2';
import SettingsScreen from './screens/Settings';
import AccountScreen from './screens/Settings/Account';

import NoteScreen from './screens/Note';


import * as baseStyle from '../styles';

class Route extends Component {
	render() {
		const TabsDescription = TabNavigator({
				tab1: { screen: Tab1Screen },
				tab2: { screen: Tab2Screen }
			}, {
				initialRouteName: 'tab2',
				lazy: true,
				swipeEnabled: true,
				animationEnabled: true,
				tabBarPosition: Platform.OS === 'android' ? 'bottom' : 'bottom',	
				tabBarOptions: {
					upperCaseLabel: false,
					tabStyle: { margin: 0, padding: 0 },
					labelStyle: { fontSize: Platform.OS === 'ios' ? 12 : 12, margin: 0, padding: 0, marginBottom: 2 },
					activeTintColor: Platform.OS === 'android' ? baseStyle.COLOR_SECONDARY : baseStyle.COLOR_PRIMARY,
					inactiveTintColor: Platform.OS === 'android' ? baseStyle.COLOR_DISABLED_AND : baseStyle.COLOR_DISABLED_IOS,
					style: { backgroundColor: Platform.OS === 'android' ? baseStyle.COLOR_PRIMARY : baseStyle.COLOR_SECONDARY },
					indicatorStyle: {
						// borderBottomColor: baseStyle.COLOR_SECONDARY,
						// borderBottomWidth: 3,
						opacity: 0
					},
					showIcon: Platform.OS === 'android' ? true : true,
				},
			}
		);
		const DrawerDescription = DrawerNavigator(
			{
				// tabs: {	screen: Tab2Screen },
				tabs: {	screen: TabsDescription },
				settings: { screen: SettingsScreen },
			},
			{
				initialRouteName: 'tabs',
				contentOptions: {
					activeTintColor: baseStyle.COLOR_PRIMARY,
					inactiveTintColor: baseStyle.COLOR_DISABLED,
				},
			}
		);
		const RouteDescription = StackNavigator({
				//tabs: {	screen: TabsDescription },
				settings: { screen: SettingsScreen },
				account: { screen: AccountScreen },
				drawer: { screen: DrawerDescription },
				note: {	screen: NoteScreen },				
			},
			{
				initialRouteName: 'drawer',
				swipeEnabled: false,
				lazy: true,
				animationEnabled: false,		
				navigationOptions: {
					headerStyle: {
						backgroundColor: Platform.OS === 'android' ? baseStyle.COLOR_PRIMARY : baseStyle.COLOR_SECONDARY,
						// elevation: 0,
					},
					headerTintColor: Platform.OS === 'android' ? baseStyle.COLOR_SECONDARY : baseStyle.COLOR_PRIMARY,
				}
			}
		);

		return <RouteDescription />
	}
}

export default Route;

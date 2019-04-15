import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

import InfoScreen from './InfoScreen/index';
import HomeScreen from './HomeScreen/index';

const SettingsTabs = createBottomTabNavigator({

    

    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            title: "Home",
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="home"
                    size={20}
                    color={tintColor} />
            )
        }
    },
    
    InfoScreen: {
        screen: InfoScreen,
        navigationOptions: {
            tabBarLabel: "Budget",
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="memory"
                    size={20}
                    color={tintColor} />
            )
        }
    }
});

//Issue: the tab navigator needs to be wrapped inside a stack navigator
export default createStackNavigator({ SettingsTabs }, { headerMode: "none" });
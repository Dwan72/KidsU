

import {createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import TimesheetScreenRouter from '../TimesheetScreen/index';
import TimeclockScreen from './TimeclockScreen';
import TimeclockNotesScreen from './TimeclockScreen'
import MoreScreenRouter from '../MoreScreen/index';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import TabBarIcon from '../components/TabBarIcon';

const TimeclockScreenRouter = createStackNavigator(
    {
        Timeclock: { screen: TimeclockScreen },
        TimeclockNotes: { screen: TimeclockNotesScreen},
    }, {
        headerMode: 'none'
    }
);

TimeclockScreenRouter.navigationOptions = {
    tabBarLabel: 'Clock in',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
      />
    ),
};


MoreScreenRouter.navigationOptions = {
    tabBarLabel: 'More',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
      />
    ),
};

TimesheetScreenRouter.navigationOptions = {
    tabBarLabel: 'Timesheet',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
      />
    ),
};



const Tabs = createBottomTabNavigator({
    TimeclockScreenRouter,
    TimesheetScreenRouter,
    MoreScreenRouter
})





const styles = StyleSheet.create({
    buttons: {
        fontSize: 10
    }
})


const AppContainer = createAppContainer(Tabs);
export default AppContainer;


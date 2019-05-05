
import { Ionicons } from '@expo/vector-icons';
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
        name={Ionicons === 'ios' ? 'ios-clock' : 'md-clock'}
      />
    ),
};


MoreScreenRouter.navigationOptions = {
    tabBarLabel: 'More',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Ionicons === 'ios' ? 'ios-more' : 'md-more'}
      />
    ),
};

TimesheetScreenRouter.navigationOptions = {
    tabBarLabel: 'Timesheet',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Ionicons === 'ios' ? 'ios-paper' : 'md-paper'}
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


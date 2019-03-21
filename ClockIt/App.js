import React, { Component } from 'react';
//import {createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'

import LoginScreenRouter from './src/LoginScreen/index'


export default class ClockIt extends Component {
  render() {
    return <LoginScreenRouter />;
  }
}

/*
const LoginScreenRouter = createStackNavigator({
  Home: { screen: LoginScreen }
})

const AppContainer = createAppContainer(LoginScreenRouter);
export default AppContainer;
*/

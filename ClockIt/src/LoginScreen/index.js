import {createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import LoginScreen from './LoginScreen'
import OverviewScreenRouter from '../OverviewScreen/index';


const LoginScreenRouter = createStackNavigator({
    Home: { screen: LoginScreen },
    Overview: { screen: OverviewScreenRouter}
})
  
export default createAppContainer(LoginScreenRouter);
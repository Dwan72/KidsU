import {createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import LoginScreen from './LoginScreen'
import OverviewScreenRouter from '../OverviewScreen/index';
import TimeclockScreenRouter from '../TimeclockScreen/index';
import CreateAccount from './CreateAccount';

const LoginScreenRouter = createStackNavigator(
    {
        Home: { screen: LoginScreen },
        Timeclock: { screen: TimeclockScreenRouter},
        CreateAccount: {screen: CreateAccount},
    }, {
        headerMode: 'none'
    }
)
  
export default createAppContainer(LoginScreenRouter);
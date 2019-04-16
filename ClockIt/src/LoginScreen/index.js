import {createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import LoginScreen from './LoginScreen'
import OverviewScreenRouter from '../OverviewScreen/index';
import TimeclockScreenRouter from '../TimeclockScreen/index';

const LoginScreenRouter = createStackNavigator(
    {
        Home: { screen: LoginScreen },
        Timeclock: { screen: TimeclockScreenRouter},
        //ForgotPassword: {screen: ForgotPassword},
        //CreateAccount: {screen: CreateAccount},
    }, {
        headerMode: 'none'
    }
)
  
export default createAppContainer(LoginScreenRouter);
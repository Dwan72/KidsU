import {createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import LoginScreen from './LoginScreen'
import OverviewScreenRouter from '../OverviewScreen/index';
import TimeclockScreenRouter from '../TimeclockScreen/index';
import ForgotPassword from './ForgotPassword';
import CreateAccount from './CreateAccount';
import ResetPassword from './ResetPassword';

const LoginScreenRouter = createStackNavigator(
    {
        Home: { screen: LoginScreen },
        Timeclock: { screen: TimeclockScreenRouter},
        ForgotPassword: {screen: ForgotPassword},
        ResetPassword: {screen: ResetPassword},
        CreateAccount: {screen: CreateAccount},
    }, {
        headerMode: 'none'
    }
)
  
export default createAppContainer(LoginScreenRouter);
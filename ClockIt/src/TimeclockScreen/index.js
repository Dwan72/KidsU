import {createStackNavigator, createAppContainer } from 'react-navigation'
import TimeclockScreen from './TimeclockScreen'


const TimeclockScreenRouter = createStackNavigator({
    Timeclock: { screen: TimeclockScreen }
})


const AppContainer = createAppContainer(TimeclockScreenRouter);
export default AppContainer;

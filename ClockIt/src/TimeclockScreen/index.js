import {createStackNavigator, createAppContainer } from 'react-navigation'
import TimeclockScreen from './TimeclockScreen'


const TimeclockScreenRouter = createStackNavigator(
  {
    Timeclock: { screen: TimeclockScreen }
  }, {
    headerMode: 'none'
  }
)



const AppContainer = createAppContainer(TimeclockScreenRouter);
export default AppContainer;

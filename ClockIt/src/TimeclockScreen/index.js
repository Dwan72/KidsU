import {createStackNavigator, createAppContainer } from 'react-navigation'
import TimeclockScreen from './TimeclockScreen'


const TimeclockScreenRouter = createStackNavigator(
  {
    Timeclock: { screen: TimeclockScreen }
  }, {
    headerMode: 'none'
  }
)
TimeclockScreenRouter.navigationOptions = {
    tabBarLabel: 'Clock in',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
      />
    ),
};


const AppContainer = createAppContainer(TimeclockScreenRouter);
export default AppContainer;

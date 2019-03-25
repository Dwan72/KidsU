import {createStackNavigator, createAppContainer } from 'react-navigation'
import TimesheetScreen from './TimesheetScreen'


const TimesheetScreenRouter = createStackNavigator({
    Timesheet: { screen: TimesheetScreen }
})
TimesheetScreenRouter.navigationOptions = {
    tabBarLabel: 'Time Sheets',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
      />
    ),
};

const AppContainer = createAppContainer(TimesheetScreenRouter);
export default AppContainer;

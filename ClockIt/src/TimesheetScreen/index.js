import {createStackNavigator, createAppContainer } from 'react-navigation'
import TimesheetScreen from './TimesheetScreen'


const TimesheetScreenRouter = createStackNavigator(
  {
    Timesheet: { screen: TimesheetScreen }
  }, {
    headerMode: 'none'
  }
)

const AppContainer = createAppContainer(TimesheetScreenRouter);
export default AppContainer;

import {createStackNavigator, createAppContainer } from 'react-navigation'
import TimeclockScreen from './TimeclockScreen'
import TimeclockNotesScreen from './TimeclockNotes'


const TimeclockScreenRouter = createStackNavigator({
    Timeclock: { screen: TimeclockScreen },
    TimeclockNotes: { screen: TimeclockNotesScreen},
})


const AppContainer = createAppContainer(TimeclockScreenRouter);
export default AppContainer;

import {createStackNavigator, createAppContainer } from 'react-navigation'
import TimesheetScreen from './TimesheetScreen'
import AddTimesheet from './AddTimesheet'






const BottomTransition = (index, position, height) => {
  const sceneRange = [index-1, index, index + 1];
  const outputHeight = [height, 0, 0];
  const transition = position.interpolate({
    inputRange: sceneRange, 
    outputRange: outputHeight,
  });
  return {
    transform: [{ translateY: transition}]
  }
}

const NavigationConfig = () => {
  return {
    screenInterpolator: (sceneProps) => {
      const position = sceneProps. position;
      const scene = sceneProps.scene;
      const index = scene.index;
      const height = sceneProps.layout.initHeight;

      return BottomTransition(index, position, height);
    }
  }
}







const TimesheetScreenRouter = createStackNavigator(
  { 
    Timesheet: { screen: TimesheetScreen },
    AddTimesheet: { screen: AddTimesheet}
  }, 
  { transitionConfig: NavigationConfig },
  { headerMode: 'none' }
)

const AppContainer = createAppContainer(TimesheetScreenRouter);
export default AppContainer;

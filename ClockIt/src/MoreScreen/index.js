import {createStackNavigator, createAppContainer } from 'react-navigation'
import MoreScreen from './MoreScreen'


const MoreScreenRouter = createStackNavigator(
  {
    More: { screen: MoreScreen }
  }, {
    headerMode: 'none'
  }
)


const AppContainer = createAppContainer(MoreScreenRouter);
export default AppContainer;

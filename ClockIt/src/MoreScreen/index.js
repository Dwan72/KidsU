import {createStackNavigator, createAppContainer } from 'react-navigation'
import MoreScreen from './MoreScreen'


const MoreScreenRouter = createStackNavigator({
    More: { screen: MoreScreen }
})

MoreScreenRouter.navigationOptions = {
    tabBarLabel: 'More',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
      />
    ),
};

const AppContainer = createAppContainer(MoreScreenRouter);
export default AppContainer;

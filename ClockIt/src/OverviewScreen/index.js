import {createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import OverviewScreen from './OverviewScreen';
import TimeclockScreenRouter from '../TimeclockScreen/index';
import TimesheetScreenRouter from '../TimesheetScreen/index';
import MoreScreenRouter from '../MoreScreen/index';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import TabBarIcon from '../components/TabBarIcon';


const OverviewScreenRouter = createStackNavigator({
    Overview: { screen: OverviewScreen }
})
OverviewScreenRouter.navigationOptions = {
    tabBarLabel: 'Overview',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-information-circle${focused ? '' : '-outline'}`
            : 'md-information-circle'
        }
      />
    ),
};

const Tabs = createBottomTabNavigator({
    OverviewScreenRouter,
    TimeclockScreenRouter,
    TimesheetScreenRouter,
    MoreScreenRouter
})


/*
const Tabs = createBottomTabNavigator(
    {
        Overview: { screen: OverviewScreenRouter },
        Timeclock: { screen: TimeclockScreenRouter},
        Timesheet: { screen: TimesheetScreenRouter},
        More: { screen: MoreScreenRouter}
    },
    {
        swipeEnabled: false,
        tabBarComponent: props => {
            return (

                <Footer>

                <FooterTab>
                    <Button
                        active={props.navigation.state.index===0}
                        vertical
                        onPress={() => props.navigation.navigate("Overview")}
                    >
                        <Icon name="basket"/>
                        <Text style={styles.buttons}>Overview</Text>
                    </Button>
                </FooterTab>

                <FooterTab>
                    <Button
                        active={props.navigation.state.index===1}
                        vertical
                        onPress={() => props.navigation.navigate("Timeclock")}
                    >
                        <Icon name="alarm"/>
                        <Text style={styles.buttons}>Timeclock</Text>
                    </Button>
                </FooterTab>

                <FooterTab>
                    <Button
                        active={props.navigation.state.index===2}
                        vertical
                        onPress={() => props.navigation.navigate("Timesheet")}
                    >
                        <Icon name="book"/>
                        <Text style={styles.buttons}>Timesheets</Text>
                    </Button>
                </FooterTab>

                <FooterTab>
                    <Button
                        active={props.navigation.state.index===3}
                        vertical
                        onPress={() => props.navigation.navigate("More")}
                    >
                        <Icon name="apps"/>
                        <Text style={styles.buttons}>More</Text>
                    </Button>
                </FooterTab>

                </Footer>

            );
        }
    }
)
*/



const styles = StyleSheet.create({
    buttons: {
        fontSize: 10
    }
})


const AppContainer = createAppContainer(Tabs);
export default AppContainer;

import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Separator, Right, Left, Footer, Button, Icon, Body, Title } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

const times = [
  {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
  {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
  {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
  {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
  {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
  {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
  {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
  {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
  {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
  {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
]


export default class ListSeparatorExample extends React.Component{

  static navigationOptions = {
    header: null
  }
  
  render() {

    const { navigate } = this.props.navigation;
    return(      
    <Container>

      <Header>
        <Left/>
        <Body>
          <Title>Timesheets</Title>
        </Body>
        <Right>
          <Button 
            onPress = {() => this.props.navigation.navigate('AddTimesheet')}
            transparent>
            <Ionicons name="ios-add" size={30}/>
          </Button>
        </Right>
      </Header>

      <Content>

        {
          times.map((time, index) => {
            return (
              <View key={time}>
                <TouchableOpacity
                  onPress = {() => this.props.navigation.navigate('Timecard')}
                >
                  <ListItem style={styles.timeLabel}>
                      <View>
                        <Text>Shift {index+1}</Text>
                      </View>
                      <View>
                        <Text>{time.time1} - {time.time2}</Text>
                      </View>
                  </ListItem>
                </TouchableOpacity>

              </View>
            )
          })
        }

        {/* <Separator bordered>
          <Text>Wed Apr 3</Text>
        </Separator>

        <ListItem>
          <Left>
            <Text>Shift Total</Text>
          </Left>
          <Right>
            <Text>00m</Text>
          </Right>

        </ListItem>

        <ListItem last>
          <Text>Shift Total</Text>
        </ListItem>

        <Separator bordered>
          <Text>Wednesday, Mar 27</Text>
        </Separator>

        <ListItem>
          <Text>Shift total</Text>
        </ListItem>

        <ListItem last>
          <Text>Shift Total</Text>
        </ListItem> */}

      </Content>

    </Container>

    );
  }
}
const styles = StyleSheet.create({
  timeLabel:{
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between'
  },
})




import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Separator, Right, Left, Footer, Button, Icon, Body, Title } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import base64 from 'react-native-base64';


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


  timetableAPI() {

// Set the headers 
let headersGet = new Headers();

headersGet.append('Content-Type', 'application/json');
headersGet.append('Accept', 'application/json');
headersGet.append('Authorization', 'Basic ' + base64.encode("notadmin1" + ":" + "notadmin1"));

// Begin API Call 
fetch('http://ec2-23-20-253-138.compute-1.amazonaws.com:5000/api/v1/timetable/notadmin1', {
     headers: headersGet

}).then(function(json) {
    //console.log('request works - json is:', json);

    var temptimes = []; 

    for (i = 0; i < JSON.parse(json._bodyText).length; i++) {

    console.log('the 1st timetable slot:', JSON.parse(json._bodyText)[i]);
    var clockin = JSON.parse(json._bodyText)[i].clock_in; 
    var clockout = JSON.parse(json._bodyText)[i].clock_out;
    var notes = JSON.parse(json._bodyText)[i].notes; 

    // clockin (UNIX time) --> convert to calendar time 
    // clockout (UNIX time) --> convert to calendar time 
    //temptimes.push = clockin, clockout, notes; 


}

  // update this.state.times

}).catch(function(error) {
    console.log('request failed - Timetable API', error);
  })

}

  
  render() {

    const { navigate } = this.props.navigation;
    return(      
    <Container>

      <Header>
        <Left/>
        <Body>
          <Title>Timesheets</Title>
                          <TouchableOpacity onPress={() => this.timetableAPI()}>
                          <Text> Refresh </Text>
                          </TouchableOpacity>
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




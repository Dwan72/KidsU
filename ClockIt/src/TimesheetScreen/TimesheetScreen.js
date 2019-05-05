import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Separator, Right, Left, Footer, Button, Icon, Body, Title } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import base64 from 'react-native-base64';
import moment from 'moment'

// const times = [
//   {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
//   {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
//   {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
//   {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
//   {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
//   {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
//   {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
//   {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
//   {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
//   {Day: 'March 1', time1: '5:03PM', time2: '10:20PM'},
// ]
const times2 = []

export default class ListSeparatorExample extends React.Component{

  static navigationOptions = {
    header: null
  }
  constructor() {
    super()
    this.state = {
        times: []
    }
}

timetableAPI() {
// Set the headers 
let headersGet = new Headers();
headersGet.append('Content-Type', 'application/json');
headersGet.append('Accept', 'application/json');
headersGet.append('Authorization', 'Basic ' + base64.encode("notadmin1" + ":" + "notadmin1"));

handleTimePicked = (times2) => {
  this.setState({
    times: times2
  })
}

// Begin API Call 
fetch('http://ec2-23-20-253-138.compute-1.amazonaws.com:5000/api/v1/timetable/notadmin1', {
     headers: headersGet
}).then(function(json) {

      times2.length = 0;
      for (let i = (JSON.parse(json._bodyText).length-20); i < JSON.parse(json._bodyText).length; i++){
        var clockin = JSON.parse(json._bodyText)[i].clock_in; 
        var clockout = JSON.parse(json._bodyText)[i].clock_out;
        var notes = JSON.parse(json._bodyText)[i].notes; 
        var clockinCalendar = moment.unix(clockin).format("MMMM, Do YYYY HH:mm");
        var clockoutCalendar = moment.unix(clockout).format("MMMM, Do YYYY HH:mm");
        var clockInTime = moment.unix(clockin).format("HH:mm");
        var clockOutTime = moment.unix(clockout).format("HH:mm");
        var clockDate = moment.unix(clockin).format("MMMM, Do")

        times2.push({time1:clockInTime, time2:clockOutTime, day:clockDate, notesValue:notes})
      }
      

    handleTimePicked(times2)


}).catch(function(error) {
    console.log('request failed - Timetable API', error);
  })

}

  
  render() {

    const { navigate } = this.props.navigation;
    return(      
    <Container>

      <Header>
        <Left>
          <Button
            onPress = {() => this.timetableAPI()}
            transparent
            style = {{paddingLeft:15}}
            >
            
            <Ionicons name={Ionicons === 'ios' ? 'ios-refresh' : 'md-refresh'} size={25}/>
          </Button>
        </Left>
        <Body>
          <Title>Timesheets</Title>
        </Body>
        <Right>
          <Button 
            onPress = {() => this.props.navigation.navigate('AddTimesheet')}
            transparent>
            <Ionicons name={Ionicons === 'ios' ? 'ios-add' : 'md-add'} size={28}/>
          </Button>
        </Right>
      </Header>

      <Content>

        {
          this.state.times.map((time, index) => {
            return (
              <View key={time}>
                <TouchableOpacity
                  onPress = {() => this.props.navigation.navigate('Timecard')}
                >
                  <ListItem style={styles.timeLabel}>
                      <View>
                        <Text>Shift {index+1}</Text>
                      </View>

                      <View style = {styles.rightSide}>

                        <View>
                          <Text>{time.day}</Text>
                        </View>
  
                        <View>
                          <Text style = {styles.times}>{time.time1} - {time.time2}</Text>
                        </View>

                      </View>

                  </ListItem>
                </TouchableOpacity>



              </View>
            )
          })
        }

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
  
  rightSide:{
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-end',
  },
  times:{
    fontSize: 12,
    color: '#4e4e4f'
  }
  
})




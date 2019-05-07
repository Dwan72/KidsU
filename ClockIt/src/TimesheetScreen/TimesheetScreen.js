import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Separator, Right, Left, Footer, Button, Icon, Body, Title, Accordion } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import base64 from 'react-native-base64';
import moment from 'moment'

const times2 = []

export default class ListSeparatorExample extends React.Component{

  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)
    this.state = {
        times: [],
        username: this.props.navigation.dangerouslyGetParent().getParam('username', 'error'),
        password: this.props.navigation.dangerouslyGetParent().getParam('password', 'error'),
    }
}

timetableAPI() {

    const username = this.state.username;
    const password = this.state.password; 


// Set the headers 
let headersGet = new Headers();
headersGet.append('Content-Type', 'application/json');
headersGet.append('Accept', 'application/json');
headersGet.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

handleTimePicked = (times2) => {
  this.setState({
    times: times2
  })
}

// Begin API Call 
fetch('http://ec2-3-14-1-107.us-east-2.compute.amazonaws.com/api/v1/timetable/' + username, {
     headers: headersGet
}).then(function(json) {

      times2.length = 0;
      for (let i = (JSON.parse(json._bodyText).length-1); i > (JSON.parse(json._bodyText).length-20); i--){
        if (i < 0) {
          break;
        }
        var clockin = JSON.parse(json._bodyText)[i].clock_in; 
        var clockout = JSON.parse(json._bodyText)[i].clock_out;
        var notes = JSON.parse(json._bodyText)[i].notes; 
        var clockinCalendar = moment.unix(clockin).format("MMMM, Do YYYY HH:mm");
        var clockoutCalendar = moment.unix(clockout).format("MMMM, Do YYYY HH:mm");
        var clockInTime = moment.unix(clockin).format("HH:mm");
        var clockOutTime = moment.unix(clockout).format("HH:mm");
        var clockDate = moment.unix(clockin).format("MMMM, Do")
        if(notes==""){
          notes="\"no comment\""
        }

        times2.push({time1:clockInTime, time2:clockOutTime, day:clockDate, notesValue:notes})
      }
      

    handleTimePicked(times2)


}).catch(function(error) {
    console.log('request failed - Timetable API', error);
  })

}
_renderHeader(item, expanded) {
  return (
    <View style={styles.listHeaderContainer}>
      
      <View style = {{flexDirection: "column"}}>
        <Text style={styles.day}>
          {" "}{item.day}
        </Text>
        <Text style={styles.times}>
          {" "}{item.time1} - {item.time2}
        </Text>
      </View>
      
      {expanded
        ? <Ionicons style={styles.listIcon} name={Ionicons === 'ios' ? 'ios-arrow-up' : 'md-arrow-dropup'} size={15}/>
        : <Ionicons style={styles.listIcon} name={Ionicons === 'ios' ? 'ios-arrow-down' : 'md-arrow-dropdown'} size={15}/>
      }
    </View>
  );
}
_renderContent(item) {
  return (
    <Text
      style={styles.listNotesContainer}
    >
      {"  "}{item.notesValue}
    </Text>
  );
}
  
  render() {

    const { navigate } = this.props.navigation;
    const username = this.state.username;
    const password = this.state.password;
    
    return(      
    <Container>

      <Header>
        <Left>
          <Button
            onPress = {() => this.timetableAPI()}
            transparent
            style = {{paddingLeft:15}}
            >
            
            <Ionicons style={styles.navButtons} name={Ionicons === 'ios' ? 'ios-refresh' : 'md-refresh'} size={25}/>
          </Button>
        </Left>
        <Body>
          <Title>Timesheets</Title>
        </Body>
        <Right>
          <Button 
            onPress = {() => this.props.navigation.navigate('AddTimesheet', {
            username: username,
            password: password,
            })
          }
            transparent>
            <Ionicons style={styles.navButtons} name={Ionicons === 'ios' ? 'ios-add' : 'md-add'} size={28}/>
          </Button>
        </Right>
      </Header>

      <Content>

        {/* {
          this.state.times.map((time, index) => {
            return (
              <View key={time}>
                <TouchableOpacity
                  onPress = {() => this.props.navigation.navigate('Timecard')}
                >
                  <ListItem style={styles.timeLabel}>
                      <View>
                        <Text>{time.day}</Text>
                      </View>

                      <View style = {styles.rightSide}>

                        <View>
                          <Text>{time.time1} - {time.time2}</Text>
                        </View>

                      </View>

                  </ListItem>
                </TouchableOpacity>



              </View>
            )
          })
        } */}
        <Accordion
            dataArray={this.state.times}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
        />


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
  timesxxx:{
    fontSize: 12,
    color: '#4e4e4f'
  },
  day: {
    fontWeight: "600",
    color:"4B4B4B"
  },
  times: {
    fontSize:13,
    fontStyle: "italic",
    color:"#4B4B4B"
  },
  listNotesContainer: {
    padding: 10,
    backgroundColor:"#FFFFF",
    fontSize: 14
  },
  listHeaderContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F2F2F2"
  },
  listIcon: {
    fontSize: 18,
    color: "#4B4B4B"
  },
  navButtons:{
    color: "#0093D5"
  }
})




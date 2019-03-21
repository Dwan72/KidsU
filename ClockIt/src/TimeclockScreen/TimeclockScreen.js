import React from 'react';
import Fragment from 'react'; 
import Component from 'react'; 
import TimerMachine from 'react-timer-machine'
import { TouchableHighlight, AppRegistry, TouchableOpacity, StyleSheet, Alert, Button, View, Text } from 'react-native';
import { Container, Header, Content, Textarea, Form } from "native-base";

import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
momentDurationFormatSetup(moment);

export default class TimeClockScreen extends React.Component {


  constructor() {
    super();
    this.state = { count: 0, toggle: true}
    //this.state = {Notes: this.props.navigation.state.params.Notes,};
}
  static navigationOptions = {
    title: 'Time Clock',
  };

    static navigationOptions = {
        header: null
    }
    

toggle = () => {
	this.setState({
		on: !this.state.on
	})
}


// Used for Clock In and Clock Out toggle.
_onPress() {
  const newState = !this.state.toggle;
  this.setState({toggle:newState,
  count: (this.state.count+1),
  everyOther: (this.state.count%2)})
}


  render() {

      const admin = 0;
      var adminText = " zz"
      var min = 0;

    const { navigate } = this.props.navigation;
    const {toggle} = this.state;
    const ChangeText = toggle?"Clock In":"Clock Out";
    // Colors can be changed
    const changeBGColor = toggle?"#41f46e":"#f46542";
    const changeVisible = toggle?1:0;
    const changeInvisible = toggle?0:1;
    const changeOnClock = toggle?"Off the clock":"On the clock";
    const changetimerBox = toggle?"woopdewoop":"timerBox";


    return (
    


    <React.Fragment>

 

    <Text style = {[styles.timerBox, {opacity:changeInvisible}]} ></Text> 

    <Text style = {[styles.dayTotal, {opacity:changeVisible}]}> DAY TOTAL </Text>
    <Text style = {styles.status}> STATUS </Text> 
    <Text style = {[styles.dayTotalVal, {opacity:changeVisible}]}> 11h {this.state.count !== 0 
      ? this.state.count: null}m </Text>
    <Text style = {styles.statusVal}> {changeOnClock} </Text> 

    <Text style = {styles.Notes}> Notes: </Text> 
    <Textarea style = {styles.navigateNotes} returnKeyType={"done"} 
    blurOnSubmit = {true} rowSpan={5} bordered placeholder="Textarea" />


      <TouchableOpacity onPress={()=>this._onPress()} 
        activeOpacity={0.5} style={[styles.buttonClockInOut, {backgroundColor:changeBGColor}]}
      >
         <Text style={styles.text}> {ChangeText} 
         </Text>
       </TouchableOpacity>


</React.Fragment>
);
  }
}

const styles = StyleSheet.create({
  
  // Clock In and Clock Out buttons
  buttonClockInOut: {
  	textAlignVertical: 'center',
    position: 'absolute',
    bottom: '10%',
    right: '25%',
    left: '25%', 
    textAlign: 'center',
    backgroundColor: '#41f46e',
    padding: 25,
    borderRadius: 10,
    shadowRadius: 4,
    shadowOpacity: 0.3
  }
,    // Notes
    Notes: {
    textAlignVertical: 'center',
    position: 'absolute',
    top: '22%',
    left: '5%', 
    textAlign: 'center'
  },
    // Navigate to notes
    navigateNotes: {
    textAlignVertical: 'center',
    position: 'absolute',
    bottom: '40%',
    right: '25%',
    left: '5%', 
    borderColor: 'gray',
    borderWidth: 1,
    height: '35%',
    width: '90%',
    textAlign: 'center'
  },
    // Day total
    dayTotal: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
    position: 'absolute',
    top: '5%',
    left: '10%', 
    textAlign: 'center'
  },
        // Day total (Value)
    dayTotalVal: {
    textAlignVertical: 'center',
    position: 'absolute',
    top: '10%',
    left: '10%', 
    textAlign: 'center'
  },
    // Status
    status: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
    position: 'absolute',
    top: '5%',
    right: '10%', 
    textAlign: 'center'
  },
    // Status (Value)
    statusVal: {
    textAlignVertical: 'center',
    position: 'absolute',
    top: '10%',
    right: '10%', 
    textAlign: 'center'
  },
    // Rectangle Clock In Box
    timerBox: {
    backgroundColor: '#41f46e',
    textAlignVertical: 'center',
    position: 'absolute',
    left:'0%',
    right:'0%',
    top: '0%', 
    bottom: '80%',
    textAlign: 'center'
  },
  // Align the text to the center
  text: {
  	textAlign: 'center', 
  	alignItems: 'center'
  },
})
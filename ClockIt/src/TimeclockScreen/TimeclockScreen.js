import React from 'react';
import Fragment from 'react';
import Component from 'react';
import { TouchableHighlight, AppRegistry, TouchableOpacity, StyleSheet, Alert, View, Text } from 'react-native';


export default class TimeClockScreen extends React.Component {

  static navigationOptions = {
    title: 'Time Clock',
  };

  state = {
    toggle:true
  }

toggle = () => {
	this.setState({
		on: !this.state.on
	})
}

// Used for Clock In and Clock Out toggle.
_onPress() {
  const newState = !this.state.toggle;
  this.setState({toggle:newState})
}

  render() {
    const { navigate } = this.props.navigation;
    const {toggle} = this.state;
    const ChangeText = toggle?"Clock In":"Clock Out";
    // Colors can be changed
    const changeBGColor = toggle?"#41f46e":"#f46542";

    return (
      <React.Fragment>
        <Text style = {styles.dayTotal}> DAY TOTAL </Text>
        <Text style = {styles.status}> STATUS </Text>
        <Text style = {styles.dayTotalVal}> 11h 50m </Text>
        <Text style = {styles.statusVal}> Off the clock </Text>
        <Text style = {styles.navigateNotes} onPress={ ()=> navigate('TimeClockNotes') }> Nativate to notes</Text>

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
  },
  // Just in case we decide to split up the buttons,
  // This is for the Clock Out button
  buttonClockOut: {
    textAlignVertical: 'center',
    position: 'absolute',
    bottom: '10%',
    right: '5%',
    left: '51%',
    textAlign: 'center',
    backgroundColor: '#f46542',
    padding: 25,
    borderRadius: 10,
    shadowRadius: 4,
    shadowOpacity: 0.3
  },
  // Navigate to notes
    navigateNotes: {
    textAlignVertical: 'center',
    position: 'absolute',
    bottom: '40%',
    right: '25%',
    left: '25%',
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
  // Align the text to the center
  text: {
  	textAlign: 'center',
  	alignItems: 'center'
  },
})

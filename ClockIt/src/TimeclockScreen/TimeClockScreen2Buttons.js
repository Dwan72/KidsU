import React from 'react';
import Fragment from 'react'; 
import Component from 'react'; 
import { ExpoConfigView } from '@expo/samples';
import { TouchableHighlight, AppRegistry, TouchableOpacity, StyleSheet, Alert, Button, View, Text } from 'react-native';

export default class TimeClockScreen extends React.Component {
  static navigationOptions = {
    title: 'Time Clock',
  };

  constructor(props) {
    super(props)
    this.state = {
     pressStatus: false
 }
 	this.button = {
 		backgroundColor: '#000000'
 	}
  }
  
  state = {
  	on: false
  }


toggle = () => {
	this.setState({
		on: !this.state.on
	})
}

_onHideUnderlay(){
  this.setState({ pressStatus: false });
}
_onShowUnderlay(){
  this.setState({ pressStatus: true });
}




  render() {


    return (

<React.Fragment>




             <TouchableOpacity onPress={this.toggle}
        activeOpacity={0.5} style={this.state.pressStatus ? styles.buttonPress : styles.buttonClockIn}
        onHideUnderlay={this._onHideUnderlay.bind(this)}
        onShowUnderlay={this._onShowUnderlay.bind(this)}
         >
         <Text style={styles.text}> Clock In </Text>
       </TouchableOpacity>

             <TouchableOpacity onPress={this.toggle}
        activeOpacity={0.5} style={this.state.pressStatus ? styles.buttonPress : styles.buttonClockOut}
        onHideUnderlay={this._onHideUnderlay.bind(this)}
        onShowUnderlay={this._onShowUnderlay.bind(this)}
         >
         <Text style={styles.text}> Clock Out </Text>
       </TouchableOpacity>

</React.Fragment>
);
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
        backgroundColor: '#62f43a',
    paddingHorizontal: 10
  },
  buttonClockIn: {
  	textAlignVertical: 'center',
    position: 'absolute',
    bottom: '10%',
    right: '51%',
    left: '5%', 
    textAlign: 'center',
    backgroundColor: '#41f46e',
    padding: 25,
    borderRadius: 10,
    shadowRadius: 4,
    shadowOpacity: 0.3
  },
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
  countContainer: {
  	left: '25%',
  	right: '25%',
    alignItems: 'center',
    padding: 10
  },
  countText: {
  	alignItems: 'center',
    color: '#000000'
  },
  text: {
  	textAlign: 'center', 
  	alignItems: 'center'
  },
  buttonPress: {
  	textAlignVertical: 'center',
    position: 'absolute',
    bottom: '10%',
    right: '25%',
    left: '25%', 
    textAlign: 'center',
    backgroundColor: '#ff3314',
    padding: 25
  }
})
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Button } from 'react-native';

const styles = StyleSheet.create({
    userTitle: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
    position: 'absolute',
    top: '5%',
    left: '5%',
    textAlign: 'center'
  },
    userValue: {
    textAlignVertical: 'center',
    position: 'absolute',
    top: '10%',
    left: '5%',
    textAlign: 'center'
  },
  employeeTitle: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
    position: 'absolute',
    top: '20%',
    left: '5%',
    textAlign: 'center'
  },
  employeeValue: {
    textAlignVertical: 'center',
    position: 'absolute',
    top: '25%',
    left: '5%',
    textAlign: 'center'
  },
    locationTitle: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
    position: 'absolute',
    top: '35%',
    left: '5%',
    textAlign: 'center'
  },
  locationValue: {
    textAlignVertical: 'center',
    position: 'absolute',
    top: '40%',
    left: '5%',
    textAlign: 'center'
  },
  exportButtonNonAdmin: {
    opacity: 0
  },
  exportButtonAdmin: {
    textAlignVertical: 'center',
    position: 'absolute',
    bottom: '10%',
    left: '5%',
    textAlign: 'center',
    backgroundColor: '#41f46e',
    padding: 25,
    borderRadius: 10
  }
})

export default class MoreScreen extends React.Component {

    static navigationOptions = {
      title: 'More',
    };

    render() {

      const admin = 1

        return (
          <React.Fragment>
            <Text style = {styles.userTitle}>User</Text>
            <Text style = {styles.userValue}>Haleigh Rogers</Text>
            <Text style = {styles.employeeTitle}>Employee Classification</Text>
            <Text style = {styles.employeeValue}>On-site Manager</Text>
            <Text style = {styles.locationTitle}>Site Location</Text>
            <Text style = {styles.locationValue}>Carrollton Oaks</Text>
            <TouchableOpacity
              onPress={()=>this._onPress()}
              style={admin ? [styles.exportButtonAdmin] : [styles.exportButtonNonAdmin]}
              disabled={admin ? false : true}
            >
              <Text>Export Timesheet</Text>
            </TouchableOpacity>
          </React.Fragment>
        );
      }
}

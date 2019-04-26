import React from "react";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import LoginScreenRouter from '../LoginScreen/index'

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
  exportButtonLogOut: {
    textAlignVertical: 'center',
    position: 'absolute',
    bottom: '10%',
    left: '5%',
    textAlign: 'center',
    backgroundColor: '#fa8072',
    padding: 25,
    borderRadius: 10
  }
})

export default class MoreScreen extends React.Component {

  static navigationOptions = {
    title: 'More',
  }

  static navigationOptions = {
        header: null
  }

  constructor(props) {
    super(props);
    this.state = {logoutPressed: false};
  }

  loggingOut = () => {
      Alert.alert(
        "Logging Out",
        "Are you sure?",
        [
          { text: "Yes", onPress: () => this.returnToLogin() },
          { text: "Cancel",
            onPress: () => console.log("Cancel pressed"),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    }

    returnToLogin = () => {
      this.setState({logoutPressed: true})
    }

    render() {
      const { navigate } = this.props.navigation;

      if(!this.state.logoutPressed) {
        return (
          <Container>
            <Text style = {styles.userTitle}>User</Text>
            <Text style = {styles.userValue}>Haleigh Rogers</Text>
            <TouchableOpacity
              onPress={()=>this.loggingOut()}
              style={[styles.exportButtonLogOut]}>
                <Text>Log Out</Text>
            </TouchableOpacity>
          </Container>
        );
      } else {
        return (
          <LoginScreenRouter />
        );
      }

      }
}

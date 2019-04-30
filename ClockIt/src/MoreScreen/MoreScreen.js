import React from "react";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import LoginScreenRouter from '../LoginScreen/index';

const styles = StyleSheet.create({
    userTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
    userValue: {
    marginTop: 20,
    marginLeft: 10,
  },
  exportButtonLogOut: {
    textAlignVertical: 'center',
    marginTop: 400,
    marginLeft: 15,
    textAlign: 'center',
    backgroundColor: '#fa8072',
    padding: 25,
    width: 115,
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
      if(!this.state.logoutPressed) {
        const { navigate } = this.props.navigation;
        return (
          <Container>
            <Header>
              <Left/>
                <Body>
                  <Title>More</Title>
                </Body>
              <Right/>
            </Header>
            <Content>
              <Text style = {styles.userTitle}>User</Text>
              <Text style = {styles.userValue}>notadmin1</Text>
              <TouchableOpacity
                onPress={()=>this.loggingOut()}
                style={[styles.exportButtonLogOut]}>
                  <Text>Log Out</Text>
              </TouchableOpacity>
            </Content>
          </Container>
        );
      } else {
        return (
          <LoginScreenRouter />
        );
      }
  }
}

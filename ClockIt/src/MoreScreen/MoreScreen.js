import React from "react";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text,} from "native-base";
import { StyleSheet, TouchableOpacity, Alert, View } from 'react-native';
import App from '../../App';

const styles = StyleSheet.create({
  userTitle: {
    fontSize: 22,
    fontWeight: '600'
  },
  userValue: {
    fontSize: 15,
    paddingTop: 10
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
  },
  buttonLogOut: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    minWidth: '100%',
    paddingBottom: 20,
    padding: 15
  },
  allText: {
    margin: 15
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
    this.state = {
      logoutPressed: false,
      username: this.props.navigation.dangerouslyGetParent().getParam('username', 'error'),
      password: this.props.navigation.dangerouslyGetParent().getParam('password', 'error'),
    };
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
      this.props.navigation.navigate('Home');
      this.setState({username: 'NULL'});
      this.setState({password: 'NULL'});
    }

    render() {
      if(!this.state.logoutPressed) {
        const { navigate } = this.props.navigation;
        return (
          <Container style = {{justifyContent: 'space-between'}}>
            <Header>
              <Left/>
                <Body>
                  <Title>More</Title>
                </Body>
              <Right/>
            </Header>
            <Content>
              <View style = {styles.allText}>
                <Text style = {styles.userTitle}>Username:</Text>
                <Text style = {styles.userValue}>{this.state.username}</Text>
              </View>

{/* 
              <TouchableOpacity
                onPress={()=>this.loggingOut()}
                style={[styles.exportButtonLogOut]}>
                  <Text>Log Out</Text>
              </TouchableOpacity> */}

            </Content>

            <View style = {styles.buttonLogOut}>
                <Button full danger
                  onPress={()=>this.loggingOut()}
                  >
                  <Text>Log Out</Text>
                </Button>
            </View>

          </Container>
        );
      } else {
        return (
          <App />
        );
      }
  }
}

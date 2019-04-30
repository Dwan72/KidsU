import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image,Button, Alert } from 'react-native';
import KIDS from './KIDSU.png';

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    marginLeft: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2f5eaa',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 600,
    width: 330,
  },
  logincontainer:{
    backgroundColor: '#2d2d29',
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#393C3D',
    width: 200
  },
  buttonContainer: {
    backgroundColor: '#E7E9EA',
    paddingVertical: 15,
    width: 200
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '700',
  },
  text: {
    color: '#D61A3A',
    fontSize: 20,
    marginBottom: 30,
    marginTop: 30
  },
  CALink: {
    top: 30
  },
});

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onButtonPress = () => {
    const { password, username } = this.state;
    if (username == '') {
        alert('Please fill in username');
    } else if (password  == '' ) {
        alert('Please fill in password');
    } else if (password.length < 8) {
       alert('Password must be at least 8 characters long');
    } else {
      this.setState({username: username})
      this.setState({password: password})
    }

    if(username != '' && password != '' && password.length >= 8) {
      this.props.navigation.navigate('Timeclock');

      fetch('http://' + username + ':' + password + '@ec2-23-20-253-138.compute-1.amazonaws.com:5000/api/v1/locations', {
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((json) => {
        console.log('request successfull ', json);
      }).catch((error) => {
        console.log('request failed ', error)
        alert("The request to login failed. Try again later")
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> KIDS-U </Text>

        <Image
        style={{width: 200, height: 200, marginBottom: 20}}
         source={require('./KIDSU.png')}/>

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={username => this.setState({ username })}
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Username"
          placeholderTextColor="#050506"/>

        <TextInput
          style={styles.input}
          returnKeyType="go"
          onChangeText={password => this.setState({ password })}
          placeholder="Password"
          placeholderTextColor="#050506"
          secureTextEntry/>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onButtonPress}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <Text  style={styles.CALink}
        onPress = {() => this.props.navigation.navigate('CreateAccount')}>
          Create Account
        </Text>

      </View>
    );
  }
}

import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, Image,Button
} from 'react-native';

import KIDS from './KIDSU.png';

const styles = StyleSheet.create({
  container: {

    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2f5eaa',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 600,
    width: 330,
    top: 150,
    left: 40,

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
  button2Container: {
    backgroundColor: '#56ce46',
    paddingVertical: 15,
    width: 200,
    height: 20,
    top: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
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
    marginTop: 30,

  },

});


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }



  onButtonPress = () => {

    // Make sure that the email is a valid email
    // Make sure that the password is at least 8 characters long
    // Make a call to your backend database and try to find that user
    // If there is a user in the database with this email and password then you will log them in and then redirect them somewhere
    const { password, email } = this.state;
    console.log('Email:', email, 'Password:', password);

    // After ths user logs in, redirect them
    //  this.props.navigation.navigate('Overview');
    this.props.navigation.navigate('Timeclock');
  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> KIDS-U </Text>
        <Image
        style={{width: 200, height: 200, marginBottom: 20}}
         source={require('./KIDSU.png')}
          />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={email => this.setState({ email })}
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Email"
          placeholderTextColor="#050506"
        />

        <TextInput
          style={styles.input}
          returnKeyType="go"
          onChangeText={password => this.setState({ password })}
          placeholder="Password"
          placeholderTextColor="#050506"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onButtonPress}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

          <Text onPress = {() => this.props.navigation.navigate('CreateAccount')}>Create Account</Text>



      </View>

    );
  }
}

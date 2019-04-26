import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Text,
   View } from 'native-base';
import {StyleSheet,TextInput,TouchableOpacity, Image, Button, Picker} from 'react-native';

const styles = StyleSheet.create({

  container: {

    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'center',
    width: 415,
    height: 880


  },


  text: {

  },
  input: {
    height: 50,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#393C3D',
    width: 300,
    top: 85,
    borderColor: 'rgba(225,225,225,0.2)',
    borderWidth: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonContainer: {
    backgroundColor: '#E7E9EA',
    padding: 10,
    width: 80,
    marginTop: 120,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  error:{
    height: 50,
    backgroundColor: '#ea1207',
    marginBottom: 10,
    padding: 10,
    color: '#393C3D',
    width: 300,
    top: 85,
    borderColor: 'rgba(225,225,225,0.2)',
    borderWidth: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  }
});


export default class CreateAccount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user:'',
      password:'',
      firstname: '',
      lastname: '',
      email:'',
      ValidPWd: true
    };
  }

  onButtonPress = () => {
    const {user, password, firstname, lastname, email} = this.state;
    console.log(
      'Username:', user,
      'Password:', password,
      'First Name:', firstname,
    'Last Name:', lastname,
    'Email:', email,
  );

      if (user == '' || password  == '' || firstname  == ''  || lastname  == ''  || email  == '' ){
          alert('Please Fill out All the values');
        }
      else{
        fetch('http://ec2-23-20-253-138.compute-1.amazonaws.com:5000/api/v1/register', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
          body: JSON.stringify({
          user: user,
          password: password,
          fname: firstname,
          lname: lastname,
          email: email,
      })
    }).then(function(json) {
          console.log('request succeeded with json response', json)
      }).catch(function(error) {
          console.log('request failed', error)
      })
        alert('Account created! Please wait for Approval.');
      }
    }

    validatePassword = () =>{
      //pwd =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        const {password} = this.state;
        const len = 8;
        if (password >= len){
            ValidPWd: true
        }
        else{
          ValidPWd: false
        }
    }

render() {
    const { navigate } = this.props.navigation;

     return (
        <View  style={styles.container}>

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={firstname => this.setState({ firstname })}
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="next"
          placeholder="First Name"
          placeholderTextColor="#050506"
          clearButtonMode="always"/>

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={lastname => this.setState({ lastname })}
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Last Name"
          placeholderTextColor="#050506"
          clearButtonMode="always"/>

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={user => this.setState({ user })}
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Username"
          placeholderTextColor="#050506"
          clearButtonMode="always"/>

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={password => this.setState({ password })}
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="go"
          placeholder="Password"
          placeholderTextColor="#050506"
          clearButtonMode="always"/>

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={email => this.setState({ email })}
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Email"
          placeholderTextColor="#050506"
          clearButtonMode="always"/>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onButtonPress}>
            <Text  style={styles.text} >Submit</Text>
        </TouchableOpacity>
        </View>
       );
     }
   }

import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Text,
   View } from 'native-base';
import {StyleSheet,TextInput,TouchableOpacity, Image, Button, Picker} from 'react-native';
import LoginScreenRouter from '../LoginScreen/index';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    width: 350,
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
  submitButtonContainer: {
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
  backButtonContainer: {
    backgroundColor: '#E7E9EA',
    padding: 10,
    width: 60,
    marginTop: 30,
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
  },
  text2: {
    color: 'rgb(209, 24, 0)',
    fontSize: 9,
    alignItems: 'center',
    paddingLeft:60,
    paddingRight:60,
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
      ValidPWd: true,
      submissionFinished: false,
    };
  }

  onSubmitButtonPress = () => {
    const {user, password, firstname, lastname, email} = this.state;
    console.log(
      'Username:', user,
      'Password:', password,
      'First Name:', firstname,
    'Last Name:', lastname,
    'Email:', email,
  );

      if (user == '' || password  == '' || firstname  == ''  || lastname  == ''  || email  == '' ){
          alert('Please fill out ALL the values');
        }
        else if (password.length < 8){
          this.setState({Error:'Password must be at least 8 characters long'})
      }
      else{
        fetch('http://ec2-3-14-1-107.us-east-2.compute.amazonaws.com/api/v1/register', {
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
      if (json == null) {
          console.log('request succeeded with json response', json);
          alert('Account created! Please wait for approval.');
          this.setState({submissionFinished: true});
        }
        else {
          alert('Server Error. Account has not been created.');
          this.setState({submissionFinished: true});
        }
      }).catch(function(error) {
          console.log('request failed', error)
      })

      }
}

onBackButtonPress = () => {
  this.setState({submissionFinished: true});
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

    if(!this.state.submissionFinished) {
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
          
<Text style={styles.text2}> {this.state.Error} </Text>
         <TouchableOpacity
           style={styles.submitButtonContainer}
           onPress={this.onSubmitButtonPress}>
             <Text  style={styles.text} >Submit</Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={styles.backButtonContainer}
           onPress={this.onBackButtonPress}>
             <Text  style={styles.text} >Back</Text>
         </TouchableOpacity>
         </View>
        );
    } else {
      return (
        <LoginScreenRouter />
      );
    }
  }
}

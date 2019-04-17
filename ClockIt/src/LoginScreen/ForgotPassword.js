import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Text,
   View } from 'native-base';
import {StyleSheet,TextInput,TouchableOpacity, Image, Button} from 'react-native';
import Padlock from './lock.png';
//#b1d0e2
//#2694d3

  const styles = StyleSheet.create({

    container: {

      alignItems: 'center',
      width: 415,
      height: 880

    },


    text: {
      color: '#000000',
      fontSize: 40,
      marginBottom: 30,
      marginTop: 30,
      textAlign:'center',
      top:70


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
      width: 100,
      left: 120,
      top: 120,
      borderWidth: 2,
      borderColor: '#ffffff',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    PreviousbuttonContainer: {
      backgroundColor: '#E7E9EA',
      padding: 10,
      width: 400,

      top: 50,
      borderWidth: 2,
      borderColor: '#ffffff',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },

  });


export default class ForgotPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email:''

    };
  }


    onButtonPress = () => {
      const { email} = this.state;
      console.log('Email:', email);
      this.props.navigation.navigate('ResetPassword');
    }

    previousScreen = () => {

      this.props.navigation.navigate('Home');
    }

       render() {

             const { navigate } = this.props.navigation;

       return (
        <View  style={styles.container}>
        <TouchableOpacity
          style={styles.PreviousbuttonContainer}
          onPress={this.previousScreen}>
          <Text>  Login Screen</Text>
          </TouchableOpacity>

        <Image
        style={{width: 180, height: 180, marginBottom: 20, top: 100}}
         source={require('./lock.png')}
          />

        <Text style={styles.text}> Forgot Your Password?</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={email => this.setState({ email })}
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Type Your Email"
          placeholderTextColor="#050506"
        />

        <TouchableOpacity
          style={styles.buttonContainer}
              onPress={this.onButtonPress}>

          <Text>Send</Text>
          </TouchableOpacity>


        </View>
       );
     }
   }

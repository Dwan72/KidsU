import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Text,
   View } from 'native-base';
import {StyleSheet,TextInput,TouchableOpacity, Image, Button, Picker} from 'react-native';

const styles = StyleSheet.create({

  container: {

    backgroundColor: '#ffffff',
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

});


export default class CreateAccount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email:'',
      phonenumber: '',
      birthday:'',
      gender:'',
      position: '',
      password:''
    };
  }

  onButtonPress = () => {
    const {firstname, lastname, email, phonenumber, birthday, gender,position,password} = this.state;
    console.log('First Name:', firstname,
    'Last Name:', lastname,
    'Email:', email,
    'Phone number:', phonenumber,
    'Birthday:', birthday,
    'Gender:', gender,
    'Position:', position,
    'Password:', password
  );

  }




       render() {

      const { navigate } = this.props.navigation;

       return (
        <View  style={styles.container}>

        <Picker
        selectedValue={this.state.language}
        style={{height: 50, width: 115, top: 90}}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({language: itemValue})
        }>
        <Picker.Item label="Admin" value="Admin" />
        <Picker.Item label="Employee" value="Employee" />
        </Picker>

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={firstname => this.setState({ firstname })}
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Firstname"
          placeholderTextColor="#050506"
        />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={lastname => this.setState({ lastname })}
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Lastname"
          placeholderTextColor="#050506"
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
          autoCapitalize="none"
          onChangeText={phonenumber => this.setState({ phonenumber })}
          autoCorrect={false}
          keyboardType="phone-pad"
          returnKeyType="next"
          placeholder="Phone number"
          placeholderTextColor="#050506"
        />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={birthday => this.setState({ birthday })}
          autoCorrect={false}
          keyboardType="number-pad"
          returnKeyType="number"
          placeholder="Birthday"
          placeholderTextColor="#050506"
        />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={gender => this.setState({ gender })}
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="next"
          placeholder="Gender"
          placeholderTextColor="#050506"
        />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={position => this.setState({ position })}
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="next"
          placeholder="Position"
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
          onPress={this.onButtonPress}>
          <Text>Send</Text>
          </TouchableOpacity>



        </View>
       );
     }
   }

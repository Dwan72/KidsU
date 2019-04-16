// import React, { Component } from 'react';
// import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

// export default class LoginScreen extends Component {
    
//     loginPressed = () => {
//         this.props.navigation.navigate('Overview')
//     }
//     static navigationOptions = {
//         header: null,
//         title: null,
//     };
  
//     render() {
//     return (
//         <Container>
//             <Header>
//                 <Text>this is a header</Text>
//             </Header>
//             <Content>

//                 <Form>
//                     <Item inlineLabel>
//                         <Label>Username</Label>
//                     <Input />
//                     </Item>
//                     <Item inlineLabel last>
//                         <Label>Password</Label>
//                     <Input />
//                     </Item>
//                 </Form>
            
//                 <Button block success
//                     style={{ marginLeft: 10, marginRight: 10}}
//                     onPress={this.loginPressed}
//                 >
//                     <Text>Login</Text>
//                 </Button>
//             </Content>
//         </Container>
//     );
//   }
// }

import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginContainer: {
    padding: 20
  },
  input: {
    height: 40,
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
    marginBottom: 30

  }
});


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

  //  this.onButtonPress = this.onButtonPress.bind(this);
  }
static navigationOptions = {
    header: null,
    title: null,
};

  onButtonPress = () => {

    // Make sure that the email is a valid email
    // Make sure that the password is at least 8 characters long
    // Make a call to your backend database and try to find that user
    // If there is a user in the database with this email and password then you will log them in and then redirect them somewhere
    const { password, email } = this.state;
    console.log('hello I am clicked', password, email);

    // After ths user logs in, redirect them

    this.props.navigation.navigate('Timeclock');
  }

  render() {

    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.text}> KIDS-U </Text>
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
          <Text style={styles.buttonText } onPress={()=> navigate('HomeScreen')}>LOGIN</Text>
        </TouchableOpacity>


      </View>

    );
  }
}
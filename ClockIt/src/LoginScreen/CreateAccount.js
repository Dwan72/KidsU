import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text,
  StyleSheet, View, TouchableOpacity, TextInput, Image } from 'native-base';

export default class CreateAccount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email:'',
      birthday:'',
      gender:'',
      password:''
    };
  }


  loginPressed = () => {
     this.props.navigation.navigate('Overview')
     }

       render() {

             const { navigate } = this.props.navigation;

       return (
           <Container>
               <Header>
                   <Text>Create Account</Text>
               </Header>
               <Content>

                   <Form>
                       <Item inlineLabel>
                           <Label>First Name</Label>
                       <Input />
                       </Item>

                       <Item inlineLabel last>
                           <Label>Last Name</Label>
                       <Input />
                       </Item>

                       <Item inlineLabel>
                           <Label>Email</Label>
                       <Input />
                       </Item>

                       <Item inlineLabel>
                           <Label>Phone Number</Label>
                       <Input />
                       </Item>

                       <Item inlineLabel>
                           <Label>Date of Birth</Label>
                       <Input />
                       </Item>

                       <Item inlineLabel>
                           <Label>Gender</Label>
                       <Input />
                       </Item>
                       <Item inlineLabel>
                           <Label>Password</Label>
                       <Input />
                       </Item>


                   </Form>

                   <Button block success
                     style={{ marginLeft: 10, marginRight: 10}}
                       onPress={this.loginPressed}
                   >


                       <Text>Submit</Text>
                   </Button>
               </Content>
           </Container>
       );
     }
   }

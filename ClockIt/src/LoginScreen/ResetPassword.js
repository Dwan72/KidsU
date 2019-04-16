import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text,
  StyleSheet, View, TouchableOpacity, TextInput, Image } from 'native-base';

export default class ResetPassword extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      password: ''
    };
  }

     render() {

           const { navigate } = this.props.navigation;

     return (
         <Container>
             <Header>
                 <Text>Reset Password</Text>
             </Header>
             <Content>

                 <Form>
                     <Item inlineLabel>
                         <Label>Password</Label>
                     <Input />
                     </Item>
                     <Item inlineLabel last>
                         <Label>Password</Label>
                     <Input />
                     </Item>
                 </Form>



             </Content>
         </Container>
     );
   }
 }

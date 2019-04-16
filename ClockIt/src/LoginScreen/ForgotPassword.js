import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text,
  StyleSheet, View, TouchableOpacity, TextInput, Image } from 'native-base';







export default class ForgotPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: ''

    };
  }


     render() {

           const { navigate } = this.props.navigation;

     return (

         <Container>
                <Header>
                    <Text>Forgot Password</Text>
                </Header>
                <Content>


                    <Form>
                    <Text  style={{ fontSize:20}}> Forgot Password </Text>
                        <Item inlineLabel>
                            <Label>Email</Label>
                        <Input />
                        </Item>


                    </Form>

                   <Button  style={{ marginLeft: 10, marginRight: 10}}
                     onPress = {() => this.props.navigation.navigate('ResetPassword')} >Submit</Button>




                </Content>
            </Container>


     );
   }
 }

import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

export default class ForgotPassword extends React.Component {



     render() {

    const { navigate } = this.props.navigation;

     return (
         <Container>
             <Header>
                 <Text>Forgot Password</Text>
             </Header>
             <Content>

                 <Form>
                     <Item inlineLabel>
                         <Label>Username</Label>
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

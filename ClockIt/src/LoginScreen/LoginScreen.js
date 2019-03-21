import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';



export default class LoginScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',

      };

  this.loginPressed = this.loginPressed.bind(this);
}


   loginPressed = () => {

     let v = this.state.password;
     let len = v.length;
     if( this.state.username != null && this.state.password != null ){
      const { username, password } = this.state;
      console.log('Username:', username,'Password:', password);
       this.props.navigation.navigate('Overview')

     }
     else{

         console.log("Error");
     }

    };





    render() {
    return (
        <Container>
            <Header />
            <Content>

                <Form>
                    <Item inlineLabel>
                        <Label>Username</Label>
                    <Input onChangeText={username => this.setState({ username })}/>
                    </Item>
                    <Item inlineLabel last>
                        <Label>Password</Label>
                    <Input onChangeText={password => this.setState({ password })}/>
                    </Item>
                </Form>

                <Button block success
                    style={{ marginLeft: 10, marginRight: 10}}
                    onPress={this.loginPressed}
                >
                    <Text>Login</Text>
                </Button>
            </Content>
        </Container>
    );
  }
}

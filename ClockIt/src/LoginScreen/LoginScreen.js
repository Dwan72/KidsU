import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';



const emailRegex = RegExp(

  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

);



export default class LoginScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',

      };

  this.loginPressed = this.loginPressed.bind(this);
}


    loginPressed = () => {

        const { email, password } = this.state;
        console.log('Email:', email,'Password:', password);
       this.props.navigation.navigate('Overview')
    }



   handleChange = e => {

     e.preventDefault();

     const { name, value } = e.target;

      switch (name) {

        case "email":
         emailRegex.test(value) ? "" : "invalid email address";
          break;

        case "password":
          formErrors.password =
          value.length < 8 ? "minimum 8 characaters required" : "";
           break;

       default:
           break;
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
                    <Input handleChange={email => this.setState({ email })} />
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

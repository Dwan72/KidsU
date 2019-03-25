import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

export default class LoginScreen extends Component {
    
    loginPressed = () => {
        this.props.navigation.navigate('Overview')
    }
    static navigationOptions = {
        header: null
    }
  
    render() {
    return (
        <Container>
            <Header>
                <Text>this is a header</Text>
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


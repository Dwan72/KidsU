import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Separator, Right, Left, Footer, Button, Icon, Body, Title } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation'


export default class ListSeparatorExample extends React.Component{

  static navigationOptions = {
    header: null
  }
  
  

  render() {

    const { navigate } = this.props.navigation;
    return(      
    <Container>

      <Header>
        <Left/>
        <Body>
          <Title>Timesheets</Title>
        </Body>
        <Right>
          <Button 
            onPress = {() => this.props.navigation.navigate('AddTimesheet')}
            transparent>
            <Ionicons name="ios-add" size={30}/>
          </Button>
        </Right>
      </Header>

      <Content>

        <Separator bordered>
          <Text>Wed Apr 3</Text>
        </Separator>

        <ListItem>
          <Left>
            <Text>Shift Total</Text>
          </Left>
          <Right>
            <Text>00m</Text>
          </Right>

        </ListItem>

        <ListItem last>
          <Text>Shift Total</Text>
        </ListItem>

        <Separator bordered>
          <Text>Wednesday, Mar 27</Text>
        </Separator>

        <ListItem>
          <Text>Shift total</Text>
        </ListItem>

        <ListItem last>
          <Text>Shift Total</Text>
        </ListItem>

      </Content>

    </Container>

    );
  }


}






import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Separator, Right, Button, Icon, Body, Title } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default class ListSeparatorExample extends Component{

  static navigationOptions = {
    header: null
  }
  render() {
    return(      
    <Container>

      <Header>
        <Body>
          <Title>Header</Title>
        </Body>
        <Right>
          <Button transparent>
            <Ionicons name="ios-add" size={30}/>
          </Button>
        </Right>
      </Header>

      <Content>

        <Separator bordered>
          <Text>MIDFIELD</Text>
        </Separator>

        <ListItem>
          <Text>Caroline Aaron</Text>
        </ListItem>

        <ListItem last>
          <Text>Lee Allen</Text>
        </ListItem>

        <Separator bordered>
          <Text>MIDFIELD</Text>
        </Separator>

        <ListItem>
          <Text>Caroline Aaron</Text>
        </ListItem>

        <ListItem last>
          <Text>Lee Allen</Text>
        </ListItem>

      </Content>
    </Container>

    );
  }


}






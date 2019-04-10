import React from "react";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";

export default class OverviewScreen extends React.Component {
  static navigationOptions = {
  };
    render() {
        return (
          <Container>
            <Header>
              <Left/>
              <Body>
                <Title>Overview</Title>
              </Body>
              <Right />
            </Header>
          </Container>
        );
      }
}
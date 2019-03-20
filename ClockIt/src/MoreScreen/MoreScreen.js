import React from "react";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";

export default class MoreScreen extends React.Component {
    render() {
        return (
          <Container>
            <Header>
              <Left/>
              <Body>
                <Title>More</Title>
              </Body>
              <Right />
            </Header>
          </Container>
        );
      }
}
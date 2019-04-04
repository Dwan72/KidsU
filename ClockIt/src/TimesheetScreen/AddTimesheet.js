import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Separator, Right, Button, Icon, Body, Title, Left } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation'


export default class AddTimesheet extends Component {
    static navigationOptions = {
        header: null
    }
    render() {

        const { navigate } = this.props.navigation;

        return(
            <Container>
                <Header>
                    <Left>
                        <Button
                            onPress = {() => this.props.navigation.navigate('Timesheet')}
                            transparent>
                            <Ionicons name="ios-close" size={30}/>
                        </Button>
                    </Left>
                </Header>
                <Body>
                    <Grid>
                        <Col>
                            <Row size={10}>
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
        
                                </Content>
                            </Row>
                            <Row size={1}>
                                <Button full Info
                                    onPress = {() => this.props.navigation.navigate('Timesheet')}>
                                    <Text>SAVE TIMESHEET</Text>
                                </Button>
                            </Row>
                        </Col>
                    </Grid>
                </Body>
            </Container>
        );
    }



}
import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Separator, Right, Left, Footer, FooterTab, Button, Icon, Body, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Ionicons } from '@expo/vector-icons';
import { Segment, Form, Textarea } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {TouchableOpacity } from 'react-native'

export default class AddTimesheet extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        isDateTimePickerVisible: false,
        datetime: '',
    };

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    _handleDatePicked = (datetime) => {
        this._hideDateTimePicker();
        this.state.datetime = datetime;
    };

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
                    <Body>
                        <Title>Add Timesheet</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>

                    <List>
                        <ListItem>
                            <Left>
                                <TouchableOpacity onPress={this._showDateTimePicker}>
                                    <Text>Start Time</Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this._handleDatePicked}
                                    onCancel={this._hideDateTimePicker}
                                    mode={'datetime'}
                                />
                            </Left>
                            <Body/>
                            <Right>
                                <Text>{this.state.datetime}</Text>
                            </Right>
                        </ListItem>

                        <ListItem>
                            <Left>
                            <TouchableOpacity onPress={this._showDateTimePicker}>
                                    <Text>End Time</Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this._handleDatePicked}
                                    onCancel={this._hideDateTimePicker}
                                    mode={'datetime'}
                                />
                            </Left>
                            <Body/>
                            <Right/>
                        </ListItem>

                        <ListItem>
                            <Left>
                                <Text>Total</Text>
                            </Left>
                            <Body/>
                            <Right/>
                        </ListItem>
                    </List>

                    <Text>Notes</Text>
                    <Form>
                        <Textarea rowSpan={5} bordered placeholder="Enter Notes" />
                    </Form>

                </Content>


                <Footer noShadow>
                    <FooterTab>
                        <Button full primary
                            onPress = {() => this.props.navigation.navigate('Timesheet')}>
                            <Text>SAVE TIMESHEET</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            
            </Container>
        );
    }
}

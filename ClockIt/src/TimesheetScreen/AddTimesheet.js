import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Separator, Right, Left, Footer, FooterTab, Button, Icon, Body, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Ionicons } from '@expo/vector-icons';
import { Segment, Form, Textarea } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TouchableOpacity, View, StyleSheet , TextInput } from 'react-native'

export default class AddTimesheet extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        showStartDatePicker: false,
        showEndDatePicker: false,
        startTime: '',
        endTime: '',
    };

    handleStartDatePress = () => { this.setState({ showStartDatePicker: true }); }
    handleStartDatePickerHide = () => { this.setState({ showStartDatePicker: false}); }

    handleEndDatePress = () => { this.setState({ showEndDatePicker: true }); }
    handleEndDatePickerHide = () => { this.setState({ showEndDatePicker: false}); }

    handleStartDatePicked = (startTime) => {
        this.setState({
            startTime,
        });
        this.handleStartDatePickerHide();
    }
    handleEndDatePicked = (endTime) => {
        this.setState({
            endTime,
        });
        this.handleEndDatePickerHide();
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
                    <Body>
                        <Title>Add Timesheet</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <List>
                        <ListItem>
                            <View style = {styles.label}>
                                <TouchableOpacity
                                    onPress={this.handleStartDatePress}>
                                    <Text>Start Time</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {styles.time}>
                                <TextInput
                                    placeholder="Time"
                                    spellCheck={false}
                                    value={this.state.startTime.toString()}
                                    editable={!this.state.showStartDatePicker}
                                    onFocus={this.handleStartDatePress}/>
                            </View>
                            <DateTimePicker
                                isVisible={this.state.showStartDatePicker}
                                onConfirm={this.handleStartDatePicked}
                                onCancel={this.handleStartDatePickerHide}
                                mode={'datetime'}
                                is24Hour={false}
                            />

                        </ListItem>

                        <ListItem>
                        <View style = {styles.label}>
                                <TouchableOpacity
                                    onPress={this.handleEndDatePress}
                                    >
                                    <Text>End Time</Text>
                                </TouchableOpacity>
                            </View>

                            <View style = {styles.time}>
                                <TextInput
                                    placeholder="Time"
                                    spellCheck={false}
                                    value={this.state.endTime.toString()}
                                    editable={!this.state.showEndDatePicker}
                                    onFocus={this.handleEndDatePress}
                                />
                            </View>

                            <DateTimePicker
                                isVisible={this.state.showEndDatePicker}
                                onConfirm={this.handleEndDatePicked}
                                onCancel={this.handleEndDatePickerHide}
                                mode={'datetime'}
                                is24Hour={false}
                            />

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

const styles = StyleSheet.create({
    label:{
        alignItems: 'flex-start'
    },
    time:{
        alignItems: 'flex-end'
    }
})

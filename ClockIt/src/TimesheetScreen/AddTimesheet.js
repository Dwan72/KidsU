import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Separator, Right, Left, Footer, FooterTab, Button, Icon, Body, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Ionicons } from '@expo/vector-icons';
import { Segment, Form, Textarea } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TouchableOpacity, View, StyleSheet , TextInput } from 'react-native'
import moment from 'moment'
import base64 from 'react-native-base64';


export default class AddTimesheet extends Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            showStartDatePicker: false,
            showEndDatePicker: false,
            showTotalTime: false,
            startTime: '',
            rawStartTime: '',
            endTime: '',
            rawEndTime: '',
            totalTime: ''
        }
    }

    handleStartDatePress = () => { this.setState({ showStartDatePicker: true }); }
    handleStartDatePickerHide = () => { this.setState({ showStartDatePicker: false}); }

    handleEndDatePress = () => { this.setState({ showEndDatePicker: true }); }
    handleEndDatePickerHide = () => { this.setState({ showEndDatePicker: false}); }


    handleStartDatePicked = (time) => {
        this.setState({
            showStartDatePicker: false,
            rawStartTime: time,
            startTime: moment(time).format('MMMM, Do YYYY HH:mm')
        });
    }
    handleEndDatePicked = (time) => {
        this.setState({
            showEndDatePicker: false,
            rawEndTime: time,
            endTime: moment(time).format('MMMM, Do YYYY HH:mm')
        });
        this.calculateTotalTime();
        this.setState({
            showTotalTime: true
        })
    }
    calculateTotalTime = () => {
        var start = moment(this.state.rawStartTime, "HH:mm");
        var end = moment(this.state.rawEndTime, "HH:mm");
        var duration = moment.duration(end.diff(start));

        this.setState({
            totalTime: moment.utc(+duration).format('HH:mm')
        })
    }


clockInAPI(timestamp) {

    // ex: March 01 2019 --> UNIX Time 
    // = 3982183918242/1000; 


    let headersPost = new Headers();
headersPost.append('Content-Type', 'application/json');
headersPost.append('Authorization', 'Basic ' + base64.encode("notadmin1" + ":" + "notadmin1"));

// let timestamp = the time user puts in as 'from' 

     fetch('http://ec2-23-20-253-138.compute-1.amazonaws.com:5000/api/v1/clock-in', {
  method: 'POST',
  headers: headersPost,
  body: JSON.stringify({
    user: "notadmin1",
    clockInTime: timestamp,
  })
}).then(function(json) {
    console.log('request succeeded with json response', json);   
    callback();
  }).catch(function(error) {
    console.log('request failed - Clock in API', error);
    this.setState({spinner: 0});
  })
}

clockOutAPI() {

    let timestamp = this.state.startTime;

    let headersPost = new Headers();
headersPost.append('Content-Type', 'application/json');
headersPost.append('Authorization', 'Basic ' + base64.encode("notadmin1" + ":" + "notadmin1"));

// Let timestamp = user clockout time 

fetch('http://ec2-23-20-253-138.compute-1.amazonaws.com:5000/api/v1/clock-out', {
  method: 'POST',
  headers: headersPost,
  body: JSON.stringify({
    user: "notadmin1",
    clockOutTime: timestamp,
  })
}).then(function(json) {

    console.log('request succeeded with json response', json);   
    callback();
  }).catch(function(error) {
    console.log('request failed', error);
  })

}

notesAPI(notesTimestampIn, notesTimestampOut, notesHolder) {

fetch('http://ec2-23-20-253-138.compute-1.amazonaws.com:5000/api/v1/notes', {
  method: 'POST',
  headers: headersPost,
  body: JSON.stringify({
    notes: notesHolder,
    clockInTime: notesTimestampIn,
    clockOutTime: notesTimestampOut
  })
}).then(function(json) {

    this.setState({spinner: 0});
    console.log('request succeeded with json response111', (json._bodyText));

  }).catch(function(error) {
    this.setState({spinner: 0});
    console.log('request failed - Notes API', error);
  })


}

    render() {

        const { navigate } = this.props.navigation;

        return(
            <Container>
                <Header>
                    <Left style={{paddingLeft: 10}}>
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
                    <List style = {styles.list}>

                        <ListItem style={styles.item}>

                            <View style={styles.label}>
                                <TouchableOpacity
                                    onPress={this.handleStartDatePress}
                                    >
                                    <Text>Start Time</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style = {styles.time}>
                                <TextInput
                                    placeholder="00:00"
                                    spellCheck={false}
                                    value={this.state.startTime}
                                    editable={!this.state.showStartDatePicker}
                                    onFocus={this.handleStartDatePress}
                                />
                            </View>

                            <DateTimePicker
                                isVisible={this.state.showStartDatePicker}
                                onConfirm={this.handleStartDatePicked}
                                onCancel={this.handleStartDatePickerHide}
                                mode={'datetime'}
                                is24Hour={false}
                            />
                      
                        </ListItem>

                        <ListItem style = {styles.item}>
                            <View style = {styles.item}>
                                <View style = {styles.label}>
                                    <TouchableOpacity
                                        onPress={this.handleEndDatePress}>
                                        <Text>End Time</Text>
                                    </TouchableOpacity>
                                </View>
                            
                                <View style = {styles.time}>
                                    <TextInput
                                        placeholder="00:00"
                                        spellCheck={false}
                                        value={this.state.endTime}
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
                            </View>
                            

                        </ListItem>

                        {/* <ListItem style = {styles.item}>

                            <View style = {styles.label}>
                                <Text>Total Time</Text>
                            </View>

                            <View style = {styles.time}>
                                { this.state.showTotalTime && <TextInput
                                    placeholder="Total"
                                    spellCheck={false}
                                    value = {this.state.totalTime}
                                    editable = {false}
                                />}
                            </View>

                        </ListItem> */}
                    </List>

                    <View style = {styles.textBox}>
                        <Text style = {styles.textBoxLabel}>Notes</Text>
                        <Form>
                            <Textarea rowSpan={5} bordered placeholder="Enter Notes" />
                        </Form>
                    </View>

                </Content>
                <Footer>
                    <FooterTab>
                        <Button full primary
                            onPress = {() => // clockinAPI --> clockout API --> notesAPI --> 
                                // create alert success

                                //, this.props.navigation.navigate('Timesheet')}>
                            <Text>SAVE TIMESHEET</Text>
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    list:{
        paddingTop: 20
    },
    item:{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },
    label:{
    },
    time:{
    },
    textBox: {
        paddingTop: 35,
        paddingLeft: 15,
        paddingRight: 15
    },
    textBoxLabel:{
        fontFamily: 'San Francisco',
        fontWeight: 'bold',
        fontSize: 14,
    }

})

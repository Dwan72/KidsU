import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Separator, Right, Left, Footer, FooterTab, Button, Icon, Body, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Ionicons } from '@expo/vector-icons';
import { Segment, Form, Textarea } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TouchableOpacity, View, StyleSheet , TextInput, Alert } from 'react-native'
import moment from 'moment'
import base64 from 'react-native-base64';


export default class AddTimesheet extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)
        this.state = {
            textInput_Holder: '',
            username: this.props.navigation.dangerouslyGetParent().getParam('username', 'error'),
            password: this.props.navigation.dangerouslyGetParent().getParam('password', 'error'),
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


 clockInAPI(timestamp1, callback) {

        const username = this.state.username;
    const password = this.state.password; 

     var unixStart = moment(timestamp1).unix();
    
     let headersPost = new Headers();
     headersPost.append('Content-Type', 'application/json');
     headersPost.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

 // let timestamp = the time user puts in as 'from' 

     fetch('http://ec2-3-14-1-107.us-east-2.compute.amazonaws.com/api/v1/clock-in', {
         method: 'POST',
         headers: headersPost,
         body: JSON.stringify({
             user: username,
             clockInTime: unixStart,
         })
     }).then(function(json) {
         console.log('request succeeded with json response', json);   
         callback();
     }).catch(function(error) {
         console.log('request failed - Clock in API', error);
         this.setState({spinner: 0});
     })
 }

 clockOutAPI(timestamp2, callback) {

    const username = this.state.username;
    const password = this.state.password; 

    var unixEnd = moment(timestamp2).unix();

     let headersPost = new Headers();
     headersPost.append('Content-Type', 'application/json');
     headersPost.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

 // Let timestamp = user clockout time 

 fetch('http://ec2-3-14-1-107.us-east-2.compute.amazonaws.com/api/v1/clock-out', {
   method: 'POST',
   headers: headersPost,
     body: JSON.stringify({
     user: username,
     clockOutTime: unixEnd,
   })
 }).then(function(json) {
     console.log('request succeeded with json response', json);   
     callback();
   }).catch(function(error) {
     console.log('request failed', error);
   })
 }

 clockingPlusRoute = (time1, time2, notes) => {

        var unixStart = moment(time1).unix();
    var unixEnd = moment(time2).unix();

    if (unixStart > unixEnd) {
    Alert.alert(
      "Error",
      "Please check your start and end times.",
      [
        { text: "Ok"}
      ],
      { cancelable: false }
    );
    }
    else {

     this.clockInAPI(time1, () => 
        {this.clockOutAPI(time2, () => 
        {this.notesAPI(time1, time2, notes, () =>
            {this.alertSave()}

            );}
        );
 })
 }
     //this.props.navigation.navigate('Timesheet');
 }

alertSave() {

                    Alert.alert(
      "Saving Timesheet",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => this.props.navigation.navigate('Timesheet') },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );

}

notesAPI(notesTimestampIn, notesTimestampOut, notesHolder, callback) {

    const username = this.state.username;
    const password = this.state.password; 

     let headersPost = new Headers();
     headersPost.append('Content-Type', 'application/json');
     headersPost.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

    var unixStart = moment(notesTimestampIn).unix();
    var unixEnd = moment(notesTimestampOut).unix();


fetch('http://ec2-3-14-1-107.us-east-2.compute.amazonaws.com/api/v1/notes', {
  method: 'POST',
  headers: headersPost,
  body: JSON.stringify({
    notes: notesHolder,
    clockInTime: unixStart,
    clockOutTime: unixEnd
  })
}).then(function(json) {
    console.log('request succeeded with json response', (json._bodyText));
    callback();

  }).catch(function(error) {
    console.log('request failed - Notes API', error);
  })


}

    render() {

        const { navigate } = this.props.navigation;

        return(
            <Container style = {styles.container}>
                <Header>
                    <Left style={{paddingLeft: 10}}>
                        <Button
                            onPress = {() => this.props.navigation.navigate('Timesheet')}
                            transparent>
                            <Ionicons style={styles.exitScreenIcon} name={Ionicons === 'ios' ? 'ios-close' : 'md-close'} size={30}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Add Timesheet</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <View>
                        <View style = {styles.listPlusNotes}>
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
                            </List>
        
                            <View style = {styles.textBox}>
                                <Text style = {styles.textBoxLabel}>Notes</Text>
                                <Form>
                                    <Textarea rowSpan={5} bordered placeholder="Enter Notes" 
                                    onChangeText={data => this.setState({ textInput_Holder: data })}
                                    value={this.state.textInput_Holder}
                                    returnKeyType={"done"} blurOnSubmit = {true}
                                    />
                                </Form>
                            </View>
                        </View>

                    </View>
                </Content>
                <View style = {styles.button}>
                    <Button full primary
                        onPress = {() => this.clockingPlusRoute(this.state.rawStartTime, this.state.rawEndTime, this.state.textInput_Holder)}>
                        <Text>SAVE TIMESHEET</Text>
                    </Button>
                </View>
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
    },
    container:{
        flex: 1,
        justifyContent: 'space-between',
        
    },
    button:{
        position: 'absolute',
        bottom: 0,
        flex: 1,
        minWidth: '100%',
        paddingBottom: 20,
        padding: 15

    },
    listPlusNotes:{
        flex:1
    },
    exitScreenIcon: {
        color: "#0093D5"
    }

})

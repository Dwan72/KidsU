import React from 'react';
import { TouchableOpacity, StyleSheet, Alert, View} from 'react-native';
import { Spinner, Container, Header, Content, Textarea, List, ListItem, Right, Left, Body, Title, Text, Button } from 'native-base';
import base64 from 'react-native-base64';

export default class TimeClockScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.navigation.dangerouslyGetParent().getParam('username', 'error'),
      password: this.props.navigation.dangerouslyGetParent().getParam('password', 'error'),
      spinner: 0,
      count: 0,
      toggle: true,
      arrayHolder:
      [{title: 'FOUR'},
      {title: 'FIVE'}],
      textInput_Holder: ''
    }
    //this.state = {Notes: this.props.navigation.state.params.Notes,};


  }

writeText = text => {
  this.setState({appText: text})
}

static navigationOptions = {
    title: 'Time Clock',
};

static navigationOptions = {
    header: null
}



toggle = () => {this.setState({on: !this.state.on})}


validateLocation(callback) {
  
    const username = this.state.username;
    const password = this.state.password; 

this.setState({spinner: 1});
let headersGet = new Headers();

headersGet.append('Content-Type', 'application/json');
headersGet.append('Accept', 'application/json');
headersGet.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));


let headersPost = new Headers();
headersPost.append('Content-Type', 'application/json');
headersPost.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

fetch('http://ec2-3-14-1-107.us-east-2.compute.amazonaws.com/api/v1/locations', {
     headers: headersGet

}).then(function(json) {
    console.log('request succeeded with json response', JSON.parse(json._bodyText)[0].xcoord);
    var xlocation = JSON.parse(json._bodyText)[0].xcoord;
    var ylocation = JSON.parse(json._bodyText)[0].ycoord;
// JSON.parse(json.bodyText)[0].xcoord
// validate location
var geoOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  var currentLat = crd.latitude*1000000;
  var currentLon = crd.longitude*1000000;
  console.log(currentLat, currentLon);

  var maxxlocation = xlocation + 2000000;
  var minxlocation = xlocation - 2000000;
  var maxylocation = ylocation + 2000000;
  var minylocation = ylocation - 2000000;

  if ((minxlocation < currentLon && currentLon < maxxlocation) &&
    (minylocation < currentLat && currentLat < maxylocation)) {

    var timestamp = Date.now()/1000;

 fetch('http://ec2-3-14-1-107.us-east-2.compute.amazonaws.com/api/v1/clock-in', {
  method: 'POST',
  headers: headersPost,
  body: JSON.stringify({
    user: username,
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
  else 
  {
    Alert.alert(
      "You are not in the designated area",
      "Please be within xxx feet of the location.",
      [
        { text: "Ok", onPress: () => console.log("Ok Pressed") },
      ],
      { cancelable: false }
    );
  }
}

return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(success, error, geoOptions);
  })

// end of validating location
 }).catch(function(error) { 
  console.log('request failed - Validating Location', error);
     Alert.alert(
      "Validating Location Failed",
      "Please check your network",
      [
        { text: "Ok", onPress: () => console.log("Ok Pressed") },
      ],
      { cancelable: false }
    );
   })
}

clockingIn() {
this.validateLocation(() => {this.changeSpinner();})
}


changeSpinner() {
      const newState = !this.state.toggle;
      this.setState({spinner: 0});
      this.setState({toggle:newState})
}

_pushNotes() {
var timestamp = Date.now()/1000;
  let headersGet = new Headers();

    const username = this.state.username;
    const password = this.state.password; 

headersGet.append('Content-Type', 'application/json');
headersGet.append('Accept', 'application/json');
headersGet.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));


let headersPost = new Headers();
headersPost.append('Content-Type', 'application/json');
headersPost.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

    var notesHolder = this.state.textInput_Holder;
    const newState = !this.state.toggle;
    this.setState({toggle:newState})
    this.setState({textInput_Holder:""}); // reset notes box
    this.setState({data:""});

fetch('http://ec2-3-14-1-107.us-east-2.compute.amazonaws.com/api/v1/timetable/' + username, {
     headers: headersGet
}).then(function(json) {

        let notesTimestampIn = 0;
        let notesTimestampOut = 0;

        // Find ClockOutTime that matches the current timestamp
    for (i = JSON.parse(json._bodyText).length-1; i > 0; i--)
    {
      if (timestamp+5 > JSON.parse(json._bodyText)[i].clock_out &&
           timestamp-5 < JSON.parse(json._bodyText)[i].clock_out) {
        notesTimestampIn = JSON.parse(json._bodyText)[i].clock_in;
        notesTimestampOut = JSON.parse(json._bodyText)[i].clock_out;
        break;
      }
    }

      // Pushing notes
 fetch('http://ec2-3-14-1-107.us-east-2.compute.amazonaws.com/api/v1/notes', {
  method: 'POST',
  headers: headersPost,
  body: JSON.stringify({
    notes: notesHolder,
    clockInTime: notesTimestampIn,
    clockOutTime: notesTimestampOut
  })
}).then(function(json) {

    this.setState({spinner: 0});
    console.log('request succeeded with json response', (json._bodyText));

  }).catch(function(error) {
    this.setState({spinner: 0});
    console.log('request failed - Notes API', error);
  })
  }).catch(function(error) {
    this.setState({spinner: 0});
    console.log('request failed - Timetable API', error);
  })

}

clockingOut = () => {

    const username = this.state.username;
    const password = this.state.password; 


let headersPost = new Headers();
headersPost.append('Content-Type', 'application/json');
headersPost.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));


function clockOutAPI(callback) {
    var timestamp = Date.now()/1000;
 fetch('http://ec2-3-14-1-107.us-east-2.compute.amazonaws.com/api/v1/clock-out', {
  method: 'POST',
  headers: headersPost,
  body: JSON.stringify({
    user: username,
    clockOutTime: timestamp,
  })
}).then(function(json) {

    console.log('request succeeded with json response', json);   
    callback();
  }).catch(function(error) {
    console.log('request failed', error);
  })
}
    Alert.alert(
      "You are clocking out",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => clockOutAPI(() => {this._pushNotes();}) },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    const {toggle} = this.state;
    const changeBGColor = toggle?"#48d1cc":"#fa8072";
    const changeVisible = toggle?1:0;
    const changeInvisible = toggle?0:1;
    const changeOnClock = toggle?"OFF THE CLOCK":"ON THE CLOCK";
    const changetimerBox = toggle?"woopdewoop":"timerBox";
    const spinner = this.state.spinner;


    return (
          <Container style = {{justifyContent:'space-between'}}>
            <Header>
              <Left/>
              <Body>
                <Title>Time Clock</Title>
              </Body>
              <Right />
            </Header>
            <Content style = {styles.contentContainer}>

              <View style = {styles.statusText}>
                  <Text style = {{fontWeight: "600"}}>STATUS</Text>
                  <View style={{paddingTop: 5}}><Text style = {styles.statusVal}> {changeOnClock} </Text></View>
              </View>
            
            <View style = {styles.notesContainer}>
              <Text>Notes:</Text>
              <View style = {styles.textBox}>
                <Textarea style = {styles.navigateNotes} 
                  returnKeyType={"done"}
                  onChangeText={data => this.setState({ textInput_Holder: data })}
                  blurOnSubmit = {true} 
                  rowSpan={8} 
                  bordered placeholder="Enter your notes here"
                  value={this.state.textInput_Holder} />
              </View>
            </View>

            <Spinner color='blue' animating={spinner} />
{/* 
            <TouchableOpacity onPress={()=>this.clockingIn()} 
              disabled={changeInvisible}
              activeOpacity={0.5} 
              style={[styles.buttonClockInOut,
                  {backgroundColor:changeBGColor, opacity:changeVisible}]}>
                <Text style={styles.text}> Clock In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.clockingOut()} 
              disabled={changeVisible}
              activeOpacity={0.5} 
              style={[styles.buttonClockInOut,
                  {backgroundColor:changeBGColor, opacity:changeInvisible}]}>
              <Text style={styles.text}> Clock Out</Text>
            </TouchableOpacity> */}

      </Content>
      
      <View style = {styles.buttonContainer}>
        <Button full success
            onPress={()=>this.clockingIn()}
            disabled={changeInvisible}
            style = {{opacity:changeVisible, minWidth: '100%',  }}
            >
            <Text>Clock In</Text>
          </Button>
  
        <Button full danger
            onPress={()=>this.clockingOut()}
            disabled={changeInvisible}
            style = {{opacity:changeInvisible, minWidth: '100%', }}
            >
            <Text>Clock Out</Text>
        </Button>

      </View>
    </Container>
    );
  }
}

const styles = StyleSheet.create({

  buttonClockInOut: {
  	textAlignVertical: 'center',
    textAlign: 'center',
    backgroundColor: '#41f46e',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 25,
    paddingTop: 30,
    borderRadius: 10,
    shadowRadius: 4,
    shadowOpacity: 0.3
  },
    notesContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'left',
      textAlign: 'left',
      padding: 15
  },
  textBox: {
    paddingTop: 5
  },
    navigateNotes: {
  },
    dayTotal: {
      fontWeight: 'bold',
      textAlignVertical: 'center',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      textAlign: 'center'
  },
    dayTotalVal: {
      textAlignVertical: 'center',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      textAlign: 'center'
  },
    status: {
      fontWeight: 'bold',
      textAlignVertical: 'center',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      textAlign: 'center'
  },
    statusVal: {
      fontSize: 13,
      textAlign: 'left'
  },
    timerBox: {
      backgroundColor: '#48d1cc',
      textAlignVertical: 'center',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      textAlign: 'center'
  },
    rightAlign: {
      textAlign: 'right',
      alignItems: 'center',
  },
    text: {
  	   textAlign: 'center',
  	   alignItems: 'center'
  },
  contentContainer: {
    flexDirection: 'column',
    justiyContent: 'space-around',
  },
  statusText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 10
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    minWidth: '100%',
    paddingBottom: 20,
    padding: 15
  },
})

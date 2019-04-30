import React from 'react';
import Fragment from 'react'; 
import Component from 'react'; 
import TimerMachine from 'react-timer-machine'
import { TouchableHighlight,TextInput, FlatList, AppRegistry, TouchableOpacity, StyleSheet, Alert, View, Text } from 'react-native';
import { Spinner, Container, Header, Content, Textarea, Form, List, ListItem, Separator, Right, Left, Footer, FooterTab, Button, Icon, Body, Title } from 'native-base';


export default class TimeClockScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = { 
      spinnerOpacity: 1,
      count: 0, 
      toggle: true,
      arrayHolder: [{
      title: 'FOUR'
    },
    {
      title: 'FIVE'
    }],
      textInput_Holder: ''
    }
    //this.state = {Notes: this.props.navigation.state.params.Notes,};
   this.array = [{
      title: 'Notes will appear here:'
    }
    ]
 
    }

    writeText = text => {
      this.setState({
        appText: text
      })
    }



  static navigationOptions = {
    title: 'Time Clock',
  };

    static navigationOptions = {
        header: null
    }
    

joinData = () => {
  this.array.push({title : this.state.textInput_Holder});
  this.setState({ arrayHolder : [...this.array] })
  console.log("Cancel Pressed")
}

test(callback) {
  console.log('1111');
  callback();
}

toggle = () => {
	this.setState({
		on: !this.state.on
	})
}
  componentDidMount() {
 
    this.setState({ arrayHolder: [...this.array] })
 
  }

  GetItem(item) {
 
    Alert.alert(item);
 
  }




  trytest(callback) {

fetch('http://notadmin1:notadmin1@ec2-23-20-253-138.compute-1.amazonaws.com:5000/api/v1/locations', {
  headers: {
    'Content-Type': 'application/json'
  },
}).then(function(json) {
    console.log('request succeeded with json response111', JSON.parse(json._bodyText)[0].xcoord)
    var xlocation = JSON.parse(json._bodyText)[0].xcoord;
    var ylocation = JSON.parse(json._bodyText)[0].ycoord;

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
    (minylocation < currentLat && currentLat < maxylocation))
  {
    var timestamp = Date.now()/1000;

 fetch('http://ec2-23-20-253-138.compute-1.amazonaws.com:5000/api/v1/clock-in', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user: "notadmin1",
    clockInTime: timestamp,
  })
}).then(function(json) {
    console.log('request succeeded with json response222', json);   
    callback();
  }).catch(function(error) {
    console.log('request failed', error);
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
    console.log('request failed', error)
  })

  }

trysuccess() {
this.trytest(() => {this.clockingIn();})


}

validateLocation() {

}
clockingIn() {
  const newState = !this.state.toggle;
  this.setState({toggle:newState})
}

_pushNotes() { 
    var item = this.state.textInput_Holder;
    const newState = !this.state.toggle;
    this.setState({toggle:newState})
    this.array.push({title : item});
    this.setState({ arrayHolder: [...this.array] })

    this.props.navigation.push({
      screen: 'TimesheetScreen',
      item: 'item',
      passProps: {
        data: item
      },
    });


    this.setState({textInput_Holder:""}); // reset notes box 
    this.setState({data:""});


    }

clockingOut = () => {
  var timestamp = Date.now()/1000;

function clockOutAPI(callback) {
 fetch('http://ec2-23-20-253-138.compute-1.amazonaws.com:5000/api/v1/clock-in', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user: "notadmin1",
    clockInTime: timestamp,
  })
}).then(function(json) {
    console.log('request succeeded with json response333333', json);   
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
    // Colors can be changed
    const changeBGColor = toggle?"#48d1cc":"#fa8072";
    const changeVisible = toggle?1:0;
    const changeInvisible = toggle?0:1;
    const changeOnClock = toggle?"Off the clock":"On the clock";
    const changetimerBox = toggle?"woopdewoop":"timerBox";

    const spinnerOpacity = this.state.spinnerOpacity;


    return (
    

          <Container>
            <Header>
              <Left/>
              <Body>
                <Title>Time Clock</Title>


              </Body>
              <Right />
            </Header>
            <Content>

<List>

                        <ListItem>
                        <View style = {styles.label}>
                                    <Text>STATUS</Text><Text style = {styles.statusVal}> {changeOnClock} </Text>   
                            </View>     
                            
                        </ListItem>
                    </List>
<Text style = {styles.Notes}>Notes:</Text>
                    <Textarea style = {styles.navigateNotes} returnKeyType={"done"} 
                    onChangeText={data => this.setState({ textInput_Holder: data })}
                    blurOnSubmit = {true} rowSpan={8} bordered placeholder="Enter your notes here" 
                    value={this.state.textInput_Holder} />


      <TouchableOpacity onPress={()=>this.trysuccess()} disabled={changeInvisible} 
        activeOpacity={0.5} style={[styles.buttonClockInOut, {backgroundColor:changeBGColor, opacity:changeVisible}]}
      >
      <Text style={styles.text}> Clock In
         </Text>
       </TouchableOpacity>


      <TouchableOpacity onPress={()=>this.clockingOut()} disabled={changeVisible} 
        activeOpacity={0.5} style={[styles.buttonClockInOut, {backgroundColor:changeBGColor, opacity:changeInvisible}]}
      >
      <Text style={styles.text}> Clock Out
         </Text>
       </TouchableOpacity>

<List>
        <FlatList
          data={this.state.arrayHolder}
          extraData={this.state.arrayHolder}
          keyExtractor={(index) => index.toString()}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) => <Text style={styles.item}>
           {item.title} </Text>}
        />

</List>
            </Content>
          </Container>

);
  }
}

const styles = StyleSheet.create({
  
  // Clock In and Clock Out buttons
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
  }
,    // Notes
    Notes: {
            flex: 1,
        flexDirection: 'column',
        justifyContent: 'left',
        paddingTop: 5,
    textAlign: 'left'
  },
    // Navigate to notes
    navigateNotes: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
    borderColor: 'gray',
    textAlign: 'center'
  },
    // Day total
    dayTotal: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
            flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    textAlign: 'center'
  },
        // Day total (Value)
    dayTotalVal: {
    textAlignVertical: 'center',
            flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
,        alignItems: 'stretch',
    textAlign: 'center'
  },
    // Status
    status: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
            flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    textAlign: 'center'
  },
    // Status (Value)
    statusVal: {
    textAlignVertical: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'left'
  },
    // Rectangle Clock In Box
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
  // Align the text to the center
  text: {
  	textAlign: 'center', 
  	alignItems: 'center'
  },
})
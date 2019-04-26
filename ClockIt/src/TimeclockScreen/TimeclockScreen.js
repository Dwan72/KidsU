import React from 'react';
import Fragment from 'react';
import Component from 'react';
import TimerMachine from 'react-timer-machine'
import { TouchableHighlight,TextInput, FlatList, AppRegistry, TouchableOpacity, StyleSheet, Alert, View, Text } from 'react-native';
import { Spinner, Container, Header, Content, Textarea, Form, List, ListItem, Separator, Right, Left, Footer, FooterTab, Button, Icon, Body, Title } from 'native-base';

export default class TimeClockScreen extends React.Component {

  constructor(props) {
    super(props);
    this._pushNotes= this._pushNotes.bind(this);
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
    }]
}

    writeText = text => {
      this.setState({
        appText: text
      })
    }

  static navigationOptions = {
    title: 'Time Clock',
  }

  static navigationOptions = {
        header: null
  }

joinData = () => {
  this.array.push({title : this.state.textInput_Holder});
  this.setState({ arrayHolder : [...this.array] })
  console.log("Cancel Pressed")
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

trytest() {

fetch('http://notadmin1:notadmin1@ec2-23-20-253-138.compute-1.amazonaws.com:5000/api/v1/locations', {
  headers: {
    'Content-Type': 'application/json'
  },
}).then(function(json) {
    console.log('request succeeded with json response', json)
  }).catch(function(error) {
    console.log('request failed', error)
  })

  }

clockingIn() {

  // if validate location, then invoke _onPress
  var geoOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

  return navigator.geolocation.getCurrentPosition(success, error, geoOptions);

}

validateLocation() {

}
_onPress() {
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
    Alert.alert(
      "You are clocking out",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => this._pushNotes() },
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
    const admin = 0;
    var adminText = " zz"
    var min = 0;

    const { navigate } = this.props.navigation;
    const {toggle} = this.state;
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
                <Text>DAY TOTAL</Text><Text>testing</Text>
            </View>
          </ListItem>
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

      <TouchableOpacity onPress={()=>this.clockingIn()} disabled={changeInvisible}
        activeOpacity={0.5} style={[styles.buttonClockInOut,
          {backgroundColor:changeBGColor, opacity:changeVisible}]}>
      <Text style={styles.text}> Clock In </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>this.clockingOut()} disabled={changeVisible}
        activeOpacity={0.5} style={[styles.buttonClockInOut,
          {backgroundColor:changeBGColor, opacity:changeInvisible}]}>
      <Text style={styles.text}> Clock Out </Text>
      </TouchableOpacity>

      <List>
        <FlatList
          data={this.state.arrayHolder}
          extraData={this.state.arrayHolder}
          keyExtractor={(index) => index.toString()}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) => <Text style={styles.item}>
           {item.title} </Text>}/>
      </List>

      <TouchableOpacity onPress={()=>this.clockingIn()}
        activeOpacity={0.5} style={[styles.buttonClockInOut]}>
        <Text style={styles.text}> Test Location API </Text>
      </TouchableOpacity>
      </Content>
    </Container>);
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
    Notes: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'left',
        paddingTop: 5,
        textAlign: 'left'
  },
    navigateNotes: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      borderColor: 'gray',
      textAlign: 'center'
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
      textAlignVertical: 'center',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
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
})

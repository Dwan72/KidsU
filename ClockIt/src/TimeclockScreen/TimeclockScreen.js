import React from 'react';
import Fragment from 'react'; 
import Component from 'react'; 
import TimerMachine from 'react-timer-machine'
import { TouchableHighlight, AppRegistry, TouchableOpacity, StyleSheet, Alert, View, Text } from 'react-native';
import { Container, TextInput, Header, Content, Textarea, Form, List, ListItem, Separator, Right, Left, Footer, FooterTab, Button, Icon, Body, Title } from 'native-base';


export default class TimeClockScreen extends React.Component {


  constructor() {
    super();
    this.state = { count: 0, toggle: true}
    //this.state = {Notes: this.props.navigation.state.params.Notes,};
}


  static navigationOptions = {
    title: 'Time Clock',
  };

    static navigationOptions = {
        header: null
    }
    

toggle = () => {
	this.setState({
		on: !this.state.on
	})
}


// Used for Clock In and Clock Out toggle.
_onPress() {
  const newState = !this.state.toggle;
  this.setState({toggle:newState})
}

clockingOut = () => {
    Alert.alert(
      "You are clocking out",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => this._onPress() },
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
    const ChangeText = toggle?"Clock In":"Clock Out";
    // Colors can be changed
    const changeBGColor = toggle?"#48d1cc":"#fa8072";
    const changeVisible = toggle?1:0;
    const changeInvisible = toggle?0:1;
    const changeOnClock = toggle?"Off the clock":"On the clock";
    const changetimerBox = toggle?"woopdewoop":"timerBox";


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
    blurOnSubmit = {true} rowSpan={5} bordered placeholder="Enter your notes here" />


      <TouchableOpacity onPress={()=>this._onPress()} disabled={changeInvisible} 
        activeOpacity={0.5} style={[styles.buttonClockInOut, {backgroundColor:changeBGColor, opacity:changeVisible}]}
      >

         <Text style={styles.text}> {ChangeText} 
         </Text>
       </TouchableOpacity>

      <TouchableOpacity onPress={()=>this.clockingOut()} disabled={changeVisible} 
        activeOpacity={0.5} style={[styles.buttonClockInOut, {backgroundColor:changeBGColor, opacity:changeInvisible}]}
      
      >

         <Text style={styles.text}> {ChangeText} 
         </Text>
       </TouchableOpacity>
       
       <List>
                        <ListItem>
                            <View>
                               
                                  <Text>test</Text>  
                               
                            </View>     
                        </ListItem>

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
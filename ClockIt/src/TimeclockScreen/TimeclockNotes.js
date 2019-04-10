import React, {Component}  from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Textarea, Form } from "native-base";

export default class TimeClockNotes extends React.Component {
  static navigationOptions = {
    title: 'Time Clock Notes',
  };


    constructor(props) {
    super(props);
    this.state = { text: "Enter your note"};
  };


  render() {

    const { navigate } = this.props.navigation;

  	return ( 
    <React.Fragment>
    	<TextInput style = {styles.note} multiline={true} onChangeText={(text) => this.setState({text})}
        onFocus= {() => this.setState({text : ''})} value={this.state.text}> 
    	</TextInput>

      <Container>
        <Header />
        <Content padder>
          <Form>
            <Textarea rowSpan={5} bordered placeholder="Textarea" />
          </Form>
        </Content>
      </Container>



    </React.Fragment>
 	); 

  }
}

const styles = StyleSheet.create({
     // Note textbox
    note: {
    textAlignVertical: 'center',
    position: 'absolute',
    bottom: '50%',
    right: '25%',
    left: '5%', 
    borderColor: 'gray',
    borderWidth: 1,
    height: '35%',
    width: '90%',
    textAlign: 'center'
  },
    // Add Note Button
  button: {
    textAlignVertical: 'center',
    position: 'absolute',
    bottom: '40%',
    right: '32%',
    left: '32%', 
    textAlign: 'center',
    backgroundColor: '#41f46e',
    padding: 10,
    borderRadius: 10,
    shadowRadius: 2,
    shadowOpacity: 0.3
  },
    // Align the text to the center
  text: {
    textAlign: 'center', 
    alignItems: 'center'
  },

  })
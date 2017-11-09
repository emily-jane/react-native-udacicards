import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { darkGreen, white } from '../utils/colours';

export default class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' }
  }

  createDeck() {
    console.log('button pressed!')
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder='Deck Title'
          selectionColor='gray'
          underlineColorAndroid='gray'
        />
        <TouchableOpacity onPress={this.createDeck} style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Create Deck</Text>
        </TouchableOpacity>
        <View style={{ height: 60 }} />
      </KeyboardAvoidingView>
    )
  }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 30
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 50,
    marginRight: 50,
    padding: 10,
    borderRadius: 6
  },
  submitBtn: {
    backgroundColor: darkGreen,
    padding: 10,
    height: 40,
    borderRadius: 6,
    alignSelf: 'center',
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  submitBtnText: {
    color: white,
    fontSize: 18,
    textAlign: 'center'
  }
})

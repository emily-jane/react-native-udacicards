import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { darkGreen, white, red } from '../utils/colours';
import { addDeckTitle } from '../actions';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      error: ''
    }
  }

  resetForm() {
    this.setState({
      text: ''
    })
  }

  toHome() {
    this.props.navigation.navigate('Decks');
  }

  createDeck() {
    if (this.state.text === '') {
      this.setState({error: `Title can't be blank`})
    } else if (this.deckExists(this.state.text) !== undefined) {
      this.setState({error: `Deck title already exists`})
    } else {
      this.props.addDeckTitle(this.state.text);
      this.resetForm();
      this.toHome();
    }
  }

  deckExists(title) {
    return this.props.decks.find(deck => deck.title.toLowerCase() === title.toLowerCase())
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
        {this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : null}
        <TouchableOpacity onPress={this.createDeck.bind(this)} style={styles.submitBtn}>
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
  errorText: {
    textAlign: 'center',
    color: red,
    marginTop: 5
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

function mapStateToProps (state) {
  return {
    decks: state
  }
};

export default connect(mapStateToProps, { addDeckTitle })(NewDeck);

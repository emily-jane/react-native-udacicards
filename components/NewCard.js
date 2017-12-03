import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import { addCardToDeck } from '../actions';
import { connect } from 'react-redux';
import { white, darkGreen } from '../utils/colours';

class NewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: ''
    }
  }


  resetForm() {
    this.setState({
      question: '',
      answer: ''
    })
  }

  addCard() {
    Keyboard.dismiss();
    this.resetForm();
    this.props.addCardToDeck(this.state.question, this.state.answer, this.props.navigation.state.params.title);
    this.props.navigation.navigate('DeckDetail', this.props.navigation.state.params);
  }

  render() {
    const { title } = this.props.navigation.state.params;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <Text style={styles.title}>Deck: {title}</Text>
        <Text style={[styles.title, {fontSize: 22}]}>What question would you like to add?</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({question: text})}
          value={this.state.question}
          placeholder='Question'
          selectionColor='gray'
          underlineColorAndroid='gray'
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({answer: text})}
          value={this.state.answer}
          placeholder='Answer'
          selectionColor='gray'
          underlineColorAndroid='gray'
        />
        <TouchableOpacity onPress={this.addCard.bind(this)} style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Add Question</Text>
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
    marginBottom: 10
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 5,
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

export default connect(mapStateToProps, { addCardToDeck })(NewCard);

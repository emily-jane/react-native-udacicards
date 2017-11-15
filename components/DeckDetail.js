import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { darkGreen, white } from '../utils/colours';

export default class DeckDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { deckTitle } = this.props;
    console.log(deckTitle);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>DECK TITLE</Text>
        <Text>XXX Cards</Text>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Do something</Text>
        </TouchableOpacity>
      </View>
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

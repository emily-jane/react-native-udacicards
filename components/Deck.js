import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { lightPurple, darkGreen } from '../utils/colours';

export default class Deck extends Component {
  constructor(props) {
    super(props)
  }

  pressDeck() {
    // console.log(this.props)
    this.props.navigation.navigate('DeckDetail', this.props);
  }

  render() {
    const questionCount = this.props.questions.length;

    return (
      <TouchableOpacity style={styles.deck} onPress={this.pressDeck.bind(this)}>
        <Text style={styles.deckTitle}>{this.props.title}</Text>
        <Text style={styles.deckCount}>{`${questionCount} card${questionCount === 1 ? '' : 's'}`}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  deck: {
    height: 120,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 8

  },
  deckTitle: {
    color: darkGreen,
    fontSize: 28
  },
  deckCount: {
    color: darkGreen,
    fontSize: 20
  }
})

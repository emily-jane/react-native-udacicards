import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Deck from './Deck';
import { darkGreen } from '../utils/colours';
import { connect } from 'react-redux';
import { getDecks } from '../actions';

const testData = [
  {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  {
    title: 'Redux',
    questions: [
      {
        question: 'What is Redux',
        answer: 'Global state management'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
    {
    title: 'Native',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  {
    title: 'Emily',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  {
    title: 'Carson',
    questions: [
      {
        question: 'What is Redux',
        answer: 'Global state management'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  }
]

class DeckList extends Component {
  renderItem = ({ item }) => {
    return <Deck {...item} />
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={testData}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: darkGreen
  },
});

function mapStateToProps (state) {
  return {
    decks: state.decks
  }
};

export default connect(mapStateToProps, { getDecks })(DeckList);

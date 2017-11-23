import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { darkGreen, white, darkOrange } from '../utils/colours';
import { connect } from 'react-redux';

class DeckDetail extends Component {
  addCard() {
    this.props.navigation.navigate('NewCard', this.props.deck)
  }

  startQuiz() {
    this.props.navigation.navigate('Quiz', this.props.deck)
  }

  render() {
    const { title, questions } = this.props.deck;
    const questionCount = questions.length;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.deckCount}>{`${questionCount} card${questionCount === 1 ? '' : 's'}`}</Text>
        <TouchableOpacity onPress={this.addCard.bind(this)} style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Add Question</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.startQuiz.bind(this)} style={[styles.submitBtn, {backgroundColor: darkOrange}]}>
          <Text style={styles.submitBtnText}>START QUIZ!</Text>
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
  deckCount: {
    textAlign: 'center',
    fontSize: 20,
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

function mapStateToProps (state, ownProps) {
  return {
    deck: state.find(deck => deck.title === ownProps.navigation.state.params.title)
  }
};

export default connect(mapStateToProps, {})(DeckDetail);

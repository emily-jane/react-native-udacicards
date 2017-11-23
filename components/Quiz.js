import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { brightGreen, red, white } from '../utils/colours';
import { connect } from 'react-redux';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsCompleted: 0,
      score: 0
    }
  }

  noQuestions() {
    console.log('no questions')
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          NO QUESTIONS! GO ADD SOME!
        </Text>
      </View>
    )
  }

  quizCompleted() {
    console.log('quiz completed')
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          QUIZ COMPLETED! WOAH! Score is {this.state.score} out of {this.props.deck.questions.length}
        </Text>
      </View>
    )
  }

  questionCorrect() {
    this.setState((prevState) => ({
      questionsCompleted: prevState.questionsCompleted + 1,
      score: prevState.score + 1
    }))
  }

  questionIncorrect() {
    this.setState((prevState) => ({
      questionsCompleted: prevState.questionsCompleted + 1
    }))
  }

  render() {
    const { title, questions } = this.props.deck;
    const { questionsCompleted } = this.state;
    const questionCount = questions.length;
    console.log(questionsCompleted);

    if (questionCount === 0) {
      return this.noQuestions();
    }

    if (questionsCompleted === questionCount) {
      return this.quizCompleted();
    }

    const { question, answer } = this.props.deck.questions[questionsCompleted];

    return (
      <View style={styles.container}>
        <Text style={styles.questionTally}>Question {questionsCompleted + 1} of {questionCount}</Text>
        <Text>Question: {question}</Text>
        <Text>Answer: {answer}</Text>

        <TouchableOpacity onPress={this.questionCorrect.bind(this)} style={[styles.submitBtn, {backgroundColor: brightGreen}]}>
          <Text style={styles.submitBtnText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.questionIncorrect.bind(this)} style={[styles.submitBtn, {backgroundColor: red}]}>
          <Text style={styles.submitBtnText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    )
  };
};

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
  questionTally: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30
  },
  submitBtn: {
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

export default connect(mapStateToProps, {})(Quiz);
